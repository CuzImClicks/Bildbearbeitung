<!--
Erlaubt es die Position des Inhalts durch scrollen in horizontaler und vertikaler Richtung
zu verschieben und kann gleichzeitig verhindern, dass der Inhalt komplett verschwindet.
-->
<script lang="ts">

    export let left: number = 0; // Die ursprüngliche Distanz zum linken Fensterrand
    export let top: number = 0; // Die ursprüngliche Distanz zum oberen Fensterrand
    export let translateX = false; // Ob das Element um die Hälfte seiner Breite nach links verschoben werden soll (für tatsächliche Zentrierung)
    export let translateY = false; // Ob das Element um die Hälfte seiner Höhe nach oben verschoben werden soll (für tatsächliche Zentrierung)
    export let horizontalScrolling = false; // Ob horizontales Scrolling möglich sein sollte
    export let padding: number = 0; // Wie viel Abstand der Inhalt vom Fensterrand halten muss.

    let slotHeight: number = 0;
    let slotWidth: number = 0;
    let outerHeight: number = 0;
    let outerWidth: number = 0;

    /**
     * Wird bei jedem Mausradereignis innerhalb des Elementes aufgerufen
     * @param e
     */
    function onWheel(e: WheelEvent) {
        e.preventDefault() // verhindert Scrolling der Seite
        if (!e.ctrlKey) { // Falls die STRG-Taste nicht gedrückt wird (da sonst zoom verhindert wird)
            if (e.shiftKey && horizontalScrolling) { // Falls die Shift-Taste gedrückt wird und horizontales Scrolling aktiviert ist
                left = Math.max(0-(slotWidth / 2) + padding, Math.min(outerWidth + (slotWidth / 2) - padding, left + e.deltaY));
                // den Abstand des Inhaltes von dem linken Fensterrand anpassen und dabei nicht außerhalb der Fensterränder gehen
            } else {
                top = Math.max(0-(slotHeight / 2) + padding, Math.min(outerHeight + (slotHeight / 2) - padding, top + e.deltaY));
                // den Abstand des Inhaltes von dem oberen Fensterrand anpassen und dabei nicht außerhalb der Fensterränder gehen
            }
        }
    }
</script>

<div class="select-none w-full h-full overflow-hidden" on:wheel={onWheel}
     bind:clientWidth={outerWidth} bind:clientHeight={outerHeight}>
    <div class="select-none absolute" style="left: {left}px; top: {top}px;
    transform: translate({translateX ? '-50%' : '0%'}, {translateY ? '-50%' : '0%'})" role="none"
    bind:clientWidth={slotWidth} bind:clientHeight={slotHeight}>
        <slot></slot>
    </div>
</div>
