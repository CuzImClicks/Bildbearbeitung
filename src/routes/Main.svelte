<!--
Die Hauptkomponente die alle anderen Komponenten enthält und ihre Struktur zueinander angibt.
-->
<script lang="ts">
    import ColorSelector from "./ColorSelector.svelte";
    import Image from "./Image.svelte";
    import Navbar from "./Navbar.svelte";
    import {dragging, image, innerHeight, innerWidth, outerHeight, outerWidth} from "./store";
    import BrushSettings from "./BrushSettings.svelte";

    $: $outerWidth = 0
    $: $innerWidth = 0
    $: $outerHeight = 0
    $: $innerHeight = 0
</script>

<!-- Passt die globalen Variablen für die Fenster und Bildschirmgröße an -->
<svelte:window bind:innerWidth={$innerWidth} bind:outerWidth={$outerWidth} bind:innerHeight={$innerHeight} bind:outerHeight={$outerHeight} />

<!-- Farbwähler und Pinseleinstellungen -->
<div class="z-50 absolute">
    <ColorSelector />
    <BrushSettings />
</div>
<div class="h-screen w-full overflow-hidden" on:mouseup={() => $dragging = false} role="none">
    <div class="z-50">
        <!-- Navigationsleiste -->
        <Navbar/>
    </div>
    {#if $image != null && $image !== undefined}
        <!-- Falls die globale Variable image nicht leer ist wird ein Bild angezeigt -->
        <Image/>
    {/if}
</div>
