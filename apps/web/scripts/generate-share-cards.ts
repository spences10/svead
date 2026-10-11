// Renders the link-preview card for every page to static/og/*.png.
// Run it again (`pnpm run share-cards`) when a page, its description
// or the look of the site changes.
import { Resvg } from '@resvg/resvg-js';
import {
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { site } from '../src/lib/config.ts';
import { groups, pages } from '../src/lib/docs/pages.ts';

const OUTPUT_DIR = new URL('../static/og/', import.meta.url);
const { width: WIDTH, height: HEIGHT } = site.share_card;

// The light theme and the glass, as in src/app.css
const PAPER = '#fffdf7';
const RULE = '#e2dac4';
const INK = '#1d1611';
const MUTED = '#5c5347';
const FOAM = '#fffaea';
const MEAD = '#f2a900';
const MEAD_DEEP = '#d98600';
const CODE = {
	punctuation: '#6b6252',
	tag: '#12643f',
};

/**
 * Unpacks a WOFF file to the TrueType inside it. resvg only reads
 * TrueType and OpenType, and fontsource ships neither. WOFF is the
 * same tables, each zlib compressed, behind a different header.
 */
function woff_to_ttf(woff: Buffer) {
	const table_count = woff.readUInt16BE(12);
	const tables = Array.from({ length: table_count }, (_, index) => {
		const entry = 44 + index * 20;
		const offset = woff.readUInt32BE(entry + 4);
		const compressed_length = woff.readUInt32BE(entry + 8);
		const length = woff.readUInt32BE(entry + 12);
		const data = woff.subarray(offset, offset + compressed_length);
		return {
			tag: woff.subarray(entry, entry + 4),
			checksum: woff.readUInt32BE(entry + 16),
			length,
			data: compressed_length < length ? inflateSync(data) : data,
		};
	});

	const entry_selector = Math.floor(Math.log2(table_count));
	const search_range = 2 ** entry_selector * 16;
	const header = Buffer.alloc(12 + table_count * 16);
	woff.copy(header, 0, 4, 8); // the font's flavour
	header.writeUInt16BE(table_count, 4);
	header.writeUInt16BE(search_range, 6);
	header.writeUInt16BE(entry_selector, 8);
	header.writeUInt16BE(table_count * 16 - search_range, 10);

	const bodies: Buffer[] = [];
	let offset = header.length;
	tables.forEach((table, index) => {
		const record = 12 + index * 16;
		table.tag.copy(header, record);
		header.writeUInt32BE(table.checksum, record + 4);
		header.writeUInt32BE(offset, record + 8);
		header.writeUInt32BE(table.length, record + 12);
		// Tables start on four byte boundaries
		const padded = Buffer.alloc(Math.ceil(table.length / 4) * 4);
		table.data.copy(padded);
		bodies.push(padded);
		offset += padded.length;
	});

	return Buffer.concat([header, ...bodies]);
}

// The site's own fonts, so cards render the same on any machine.
// resvg doesn't apply variable font weights, so these are the static
// cuts of the families the site loads as variable fonts
const require = createRequire(import.meta.url);
// resvg's native build loads fonts from disk, not from memory
const font_dir = mkdtempSync(join(tmpdir(), 'share-card-fonts-'));
const FONT_FILES = [
	'bitter/files/bitter-latin-800-normal.woff',
	'instrument-sans/files/instrument-sans-latin-400-normal.woff',
	'jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
	'jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff',
].map((file, index) => {
	const path = join(font_dir, `${index}.ttf`);
	writeFileSync(
		path,
		woff_to_ttf(readFileSync(require.resolve(`@fontsource/${file}`))),
	);
	return path;
});
const DISPLAY = 'Bitter';
const SANS = 'Instrument Sans';
const MONO = 'JetBrains Mono';
// The name the heavier static cut gives itself
const MONO_BOLD = 'JetBrains Mono ExtraBold';

const escape = (text: string) =>
	text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');

/** Greedy wrap. SVG has no text layout, so lines are split by length */
function wrap(text: string, max_chars: number) {
	const lines: string[] = [];
	for (const word of text.split(' ')) {
		const line = lines.at(-1);
		if (line !== undefined && `${line} ${word}`.length <= max_chars) {
			lines[lines.length - 1] = `${line} ${word}`;
		} else {
			lines.push(word);
		}
	}
	return lines;
}

/** Part of a title line: plain text, or a component name set as code */
type Segment = string | { code: string };

interface Card {
	file: string;
	/** Small line beside the wordmark */
	context: string;
	title: Segment[][];
	description: string;
}

const LEFT = 72;
const DOMAIN = new URL(site.url).host;
// The pint from the home page, foam for the head and mead for the body
const GLASS = { x: 836, y: 214, width: 250, height: 330 };
const FOAM_BOX = {
	x: GLASS.x - 22,
	y: 86,
	width: GLASS.width + 44,
	height: 150,
};

// The lumps along the top of the head: centre x (from the foam's left
// edge), radius and how far the centre sits below the foam's top
const PUFFS = [
	[26, 30, 34],
	[78, 42, 18],
	[136, 34, 26],
	[196, 48, 10],
	[254, 36, 26],
	[294, 28, 38],
];

/**
 * The head as one shape. Drawn twice, outlines then fills, so the
 * lumps merge into a single outlined cloud as they do on the site
 */
function cloud(fill: string, grow: number) {
	const { x, y, width, height } = FOAM_BOX;
	const rect = (
		rx: number,
		ry: number,
		w: number,
		h: number,
		r: number,
	) =>
		`<rect x="${rx - grow}" y="${ry - grow}" width="${w + grow * 2}" height="${h + grow * 2}" rx="${r + grow}" fill="${fill}"/>`;

	return [
		// A run of foam down the outside of the glass
		rect(x, y + height - 34, 30, 104, 15),
		rect(x, y + 34, width, height - 34, 34),
		...PUFFS.map(
			([cx, r, cy]) =>
				`<circle cx="${x + cx}" cy="${y + cy + 14}" r="${r + grow}" fill="${fill}"/>`,
		),
	].join('');
}

function pint() {
	const right = GLASS.x + GLASS.width;
	const bottom = GLASS.y + GLASS.height;
	const handle = `M${right} ${GLASS.y + 70} h34 a36 36 0 0 1 36 36 v92 a36 36 0 0 1 -36 36 h-34`;
	const label = (text: string, y: number) =>
		`<text x="${GLASS.x + 28}" y="${y}" font-family="${MONO}" font-size="30" xml:space="preserve"><tspan fill="${CODE.punctuation}">&lt;</tspan><tspan fill="${CODE.tag}">${text}</tspan><tspan fill="${CODE.punctuation}">&gt;</tspan></text>`;

	return `
  <path d="${handle}" fill="none" stroke="${INK}" stroke-width="34"/>
  <path d="${handle}" fill="none" stroke="${FOAM}" stroke-width="26"/>
  <path d="M${GLASS.x} ${GLASS.y} H${right} V${bottom - 46} a46 46 0 0 1 -46 46 H${GLASS.x + 46} a46 46 0 0 1 -46 -46 Z" fill="url(#mead)" stroke="${INK}" stroke-width="4"/>
  ${cloud(INK, 4)}
  ${cloud(FOAM, 0)}
  ${label('head', FOAM_BOX.y + 86)}
  ${label('body', GLASS.y + 190)}`;
}

const segment = (part: Segment) =>
	typeof part === 'string'
		? escape(part)
		: `<tspan font-family="${MONO_BOLD}" font-size="0.84em" font-weight="800" letter-spacing="-3" word-spacing="-22" fill="${CODE.tag}">${escape(part.code)}</tspan>`;

function render(card: Card) {
	const title_size = [100, 82, 74][card.title.length - 1] ?? 74;
	const title_y =
		(card.title.length > 2 ? 186 : 210) + title_size * 0.78;
	const description_y =
		title_y + (card.title.length - 1) * title_size * 1.02 + 70;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="mead" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${MEAD}"/><stop offset="1" stop-color="${MEAD_DEEP}"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${PAPER}"/>
  <rect y="${HEIGHT - 16}" width="100%" height="16" fill="${MEAD}"/>

  <text x="${LEFT}" y="112" font-family="${DISPLAY}" font-size="44" font-weight="800" fill="${INK}">${site.package}</text>
  <text x="${LEFT + 168}" y="110" font-family="${SANS}" font-size="26" fill="${MUTED}">${escape(card.context)}</text>

  <g font-family="${DISPLAY}" font-size="${title_size}" font-weight="800" fill="${INK}" letter-spacing="-1.5">
    ${card.title
			.map(
				(line, index) =>
					`<text x="${LEFT - 3}" y="${title_y + index * title_size * 1.02}">${line.map(segment).join('')}</text>`,
			)
			.join('')}
  </g>
  <g font-family="${SANS}" font-size="32" fill="${MUTED}">
    ${wrap(card.description, 42)
			.map(
				(line, index) =>
					`<text x="${LEFT}" y="${description_y + index * 44}">${escape(line)}</text>`,
			)
			.join('')}
  </g>
  <rect x="${LEFT}" y="${HEIGHT - 112}" width="640" height="2" fill="${RULE}"/>
  <text x="${LEFT}" y="${HEIGHT - 62}" font-family="${SANS}" font-size="26" fill="${MUTED}">${DOMAIN}</text>
${pint()}
</svg>`;
}

const cards: Card[] = [
	{
		file: 'home',
		context: 'Svelte + Head',
		title: [
			['Put a proper'],
			[{ code: '<Head />' }, ' on'],
			['every page.'],
		],
		// One line: the three line title leaves no room for a second
		description: 'Meta tags and JSON-LD for Svelte.',
	},
	...pages.map((page): Card => ({
		file: page.slug,
		context: groups.find(({ id }) => id === page.group)!.label,
		title: wrap(page.title, 17).map((line) => [line]),
		description: page.description,
	})),
];

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const card of cards) {
	const png = new Resvg(render(card), {
		fitTo: { mode: 'original' },
		font: { fontFiles: FONT_FILES, loadSystemFonts: false },
	})
		.render()
		.asPng();

	writeFileSync(new URL(`${card.file}.png`, OUTPUT_DIR), png);
}

rmSync(font_dir, { recursive: true });

console.log(`Generated ${cards.length} share cards in static/og`);
