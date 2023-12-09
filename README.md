
- [ ] slider
- [ ] brush settings
- [ ] zoom speed
- [ ] black and white 
- [x] invert color
- [x] color picker
- [x] draggable
- [x] brush
- [x] pan
- [x] zoom
- [x] new with size

all menu items -> z-50
image and backdrop -> -z-50

german flag

```
0 0 0;0 0 0;0 0 0;0 0 0;0 0 0
255 0 0;255 0 0;255 0 0;255 0 0;255 0 0
255 204 0;255 204 0;255 204 0;255 204 0;255 204 0

```

```
255 0 0;255 0 0;255 0 0;255 0 0;255 0 0
255 0 0;255 0 0;255 0 0;255 0 0;255 0 0
255 0 0;255 0 0;255 0 0;255 0 0;255 0 0
```
255 0 0;255 0 0;255 0 0;255 0 0;255 0 0
255 0 0;255 0 0;255 0 0;255 0 0;255 0 0
255 0 0;255 0 0;255 0 0;255 0 0;

https://svelte.dev/repl/6fb90919e24942b2b47d9ad154386b0c?version=3.49.0


old load
```sveltehtml
<div class="absolute w-full h-10 p-4">
    <button class="bg-blue-400 p-2 rounded-xl" on:click={() =>
        navigator.clipboard.readText()
            .then(((t) => {
                image = t.trim().replace("\r", "").split("\n").map((row) =>
                    row.trim().replace(/;$/, "").split(";").map((pixel) =>
                    pixel.trim().split(" ").map((color) => parseInt(color, 10))
                    )
                );
            }))}>
        Import
    </button>
    <button class="bg-blue-400 p-2 rounded-xl" on:click={() => {
            navigator.clipboard.writeText(
                image.map((row) => row.map((pixel) => pixel.join(" ")).join(";")).join("\n")
            );
        }
    }>
        Export
    </button>
</div>
```

```sveltehtml
<div class="flex flex-col items-center">
    <button class="bg-blue-400 p-2 w-full rounded-xl my-1" on:click={() => size += 1}>+</button>
    <button class="bg-blue-400 p-2 w-full rounded-xl my-1" on:click={() => size -= 1}>-</button>
</div>
```


```sveltehtml
        <div class="relative left-0 top-1/2 h-max w-max p-8 text-xl bg-gray-300 mr-4 rounded flex flex-col">
            <div class="border-b-2 mb-2">Henrik, Kai</div>
        </div>
```
