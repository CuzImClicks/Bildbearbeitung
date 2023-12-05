<script lang="ts">
    export let r: number;
    export let g: number;
    export let b: number;
    export let size: number;
</script>

<div style="height: {size*10}px; width: {size*10}px; background-color: rgb({r}, {g}, {b});">
</div>
