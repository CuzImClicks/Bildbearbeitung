<script lang="ts">
    import {innerHeight, innerWidth} from "./store";

    export let left: number = 0;
    export let top: number = 0;
    export let translateX = false;
    export let translateY = false;
    export let horizontalScrolling = false;

    let slotHeight: number = 0;
    let slotWidth: number = 0;
    let outerHeight: number = 0;
    let outerWidth: number = 0;

    function onWheel(e: WheelEvent) {
        e.preventDefault()
        if (!e.ctrlKey) {
            if (e.shiftKey && horizontalScrolling) {
                left = Math.max(slotWidth / 2, Math.min(outerWidth - (slotWidth / 2), left + e.deltaY));
            } else {
                top = Math.max(slotHeight / 2, Math.min(outerHeight - (slotHeight / 2), top + e.deltaY));
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
