<script lang="ts">
	import {
		read_stored_mode,
		set_mode,
		theme,
		type ThemeMode,
	} from '#lib/state/theme.svelte.js';
	import { Monitor, Moon, Sun, type IconNode } from 'lucide';
	import { MorphIcon } from 'morphicons/svelte';
	import { onMount } from 'svelte';

	const modes: Record<
		ThemeMode,
		{ icon: IconNode; label: string; next: ThemeMode }
	> = {
		light: { icon: Sun, label: 'Light', next: 'dark' },
		dark: { icon: Moon, label: 'Dark', next: 'system' },
		system: { icon: Monitor, label: 'System', next: 'light' },
	};

	const mode = $derived(modes[theme.mode]);

	// The stored choice isn't known on the server, so the icon starts
	// as the monitor and morphs to it once it's read
	onMount(read_stored_mode);
</script>

<button
	type="button"
	class="btn btn-square btn-ghost"
	aria-label="Theme: {mode.label}. Switch to {modes[mode.next].label}"
	title="Theme: {mode.label}"
	onclick={() => set_mode(mode.next)}
>
	<!-- Follows the mode wherever it's set from, the palette included -->
	<MorphIcon icon={mode.icon} size={20} reducedMotion="user" />
</button>
