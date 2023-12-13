<!--
Ermöglicht es den Inhalt durch Ziehen zu verschieben.
Respektiert die Grenzen des Fensters.
-->
<script lang="ts">
    import {innerHeight, innerWidth} from "./store.js";

    export let left: number = 0; // Abstand vom linken Rand
    export let top: number = 0; // Abstand vom oberen Rand

    let moving = false; // Wird gerade gezogen?
    let slotWidth: number = 0; // Breite des Inhalts
    let slotHeight: number = 0; // Höhe des Inhalts

    function onMouseDown() {
        moving = true; // Ziehen beginnt
    }

    function onMouseMove(e: MouseEvent) {
        if (moving) { // Falls gezogen wird
            left = Math.max(0, Math.min($innerWidth - slotWidth, left + e.movementX));
            // Verschiebe den Inhalt um die x-Bewegung des Mauszeigers und beachte die Grenzen des Fensters
            top = Math.max(0, Math.min($innerHeight - slotHeight, top + e.movementY));
            // Verschiebe den Inhalt um die y-Bewegung des Mauszeigers und beachte die Grenzen des Fensters
        }
    }

    function onMouseUp() {
        moving = false; // Ziehen endet
    }
</script>

<div class="select-none absolute" on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" role="none"
     bind:clientWidth={slotWidth} bind:clientHeight={slotHeight}>
    <slot></slot>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
