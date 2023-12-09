<script lang="ts">
    export let left: number = 0;
    export let top: number = 0;
    export let translateX = false;
    export let translateY = false;

    let moving = false;

    function onMouseDown() {
        moving = true;
    }

    function onMouseMove(e: MouseEvent) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function onMouseUp() {
        moving = false;
    }
</script>

<section class="select-none absolute" on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;
        transform: translate({translateX ? '-50%' : '0%'}, {translateY ? '-50%' : '0%'})" role="none">
    <slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
