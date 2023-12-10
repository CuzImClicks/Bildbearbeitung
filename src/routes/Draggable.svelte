<script lang="ts">
    import {innerHeight, innerWidth, outerWidth, outerHeight} from "./store.js";
    import {onMount} from "svelte";

    export let left: number = 0;
    export let top: number = 0;

    let moving = false;
    let slotWidth: number = 0;
    let slotHeight: number = 0;

    function onMouseDown() {
        moving = true;
    }

    function onMouseMove(e: MouseEvent) {
        if (moving) {
            left = Math.max(0, Math.min($innerWidth - (slotWidth ), left + e.movementX));
            top = Math.max(0, Math.min($innerHeight - (slotHeight), top + e.movementY));
        }
    }

    function onMouseUp() {
        moving = false;
    }
</script>

<div class="select-none absolute" on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" role="none"
     bind:clientWidth={slotWidth} bind:clientHeight={slotHeight}>
    <slot></slot>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
