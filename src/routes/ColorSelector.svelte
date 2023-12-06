<script lang="ts">
    import ColorSelectorPixel from "./ColorSelectorPixel.svelte";

    let colors = [
        [0,0,0],
        [255,255,255],
        [255,0,0],
        [255,127,0],
        [255,255,0],
        [127,255,0],
        [0,255,0],
        [0,255,127],
        [0,255,255],
        [0,127,255],
        [0,0,255],
        [127,0,255],
        [255,0,255],
        [255,0,127],
    ];

</script>

<div class="absolute left-0 top-1/2 -translate-y-1/2">
{#each colors as color}
    <ColorSelectorPixel bind:r={color[0]} bind:g={color[1]} bind:b={color[2]} size={15} />
{/each}

</div>
