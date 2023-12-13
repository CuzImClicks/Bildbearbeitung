<!--
Wie das Element Pixel nur werden beim Klicken die globalen Variablen für die Farben auf die Werte des Pixels gesetzt.
-->
<script lang="ts">

    import {blue, green, red} from "./store";

    export let r: number;
    export let g: number;
    export let b: number;
    export let size: number;
</script>

<div class="border-none caret-transparent p-0 m-0 cursor-crosshair" style="height: {size}px; width: {size}px; background-color: rgb({r}, {g}, {b});"
     on:click="{() => {$red=r; $green=g; $blue=b}}"
     role="none">
</div>
