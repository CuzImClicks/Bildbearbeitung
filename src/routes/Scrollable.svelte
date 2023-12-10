<script lang="ts">
    import {innerHeight, innerWidth} from "./store";

    export let left: number = 0;
    export let top: number = 0;
    export let translateX = false;
    export let translateY = false;
    export let horizontalScrolling = false;
    export let padding: number = 0;

    let slotHeight: number = 0;
    let slotWidth: number = 0;
    let outerHeight: number = 0;
    let outerWidth: number = 0;

    function onWheel(e: WheelEvent) {
        e.preventDefault()
        if (!e.ctrlKey) {
            if (e.shiftKey && horizontalScrolling) {
                left = Math.max(0-(slotWidth / 2) + padding, Math.min(outerWidth + (slotWidth / 2) - padding, left + e.deltaY));
            } else {
                top = Math.max(0-(slotHeight / 2) + padding, Math.min(outerHeight + (slotHeight / 2) - padding, top + e.deltaY));
            }
        }
    }
</script>

<div class="select-none w-full h-full overflow-hidden" on:wheel={onWheel}
     bind:clientWidth={outerWidth} bind:clientHeight={outerHeight}>
    <section class="select-none absolute" style="left: {left}px; top: {top}px;
    transform: translate({translateX ? '-50%' : '0%'}, {translateY ? '-50%' : '0%'})" role="none"
    bind:clientWidth={slotWidth} bind:clientHeight={slotHeight}>
        <slot></slot>
    </section>
</div>
