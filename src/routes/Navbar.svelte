<script lang="ts">
    import {mirrorDiagonally, mirrorHorizontally, mirrorVertically, rotate} from "./backend";

    export let image: Array<Array<Array<number>>>;
    type MenuCategory = {
        name: string,
        display: string,
        action: () => void,
        visible: boolean,
        children: Array<MenuItem>
    }

    type MenuItem = {
        name: string,
        onClick: () => void,
        display: string,
    }

    let fileMenuVisible = false;
    let editMenuVisible = false;

    let menuCategories: Array<MenuCategory> = [
        {
            name: "file",
            display: "File",
            action: () => {
                console.log("file");
            },
            visible: fileMenuVisible,
            children: [
                {
                    name: "new",
                    onClick: () => {
                        image = Array.from({length: 16}, () => Array.from({length: 16}, () => [255, 255, 255]));
                    },
                    display: "New",
                },
                {
                    name: "load from clipboard",
                    onClick: () => {
                        navigator.clipboard.readText()
                            .then(((t) => {
                                let temp = t.trim().replace("\r", "").split("\n").map((row) =>
                                    row.trim().replace(/;$/, "").split(";").map((pixel) =>
                                        pixel.trim().split(" ").map((color) => parseInt(color, 10))
                                    )
                                );
                                let len = temp[0].length;
                                let prev = true;
                                if (!temp.flatMap((it) => it.length == len).reduce((prev, cur) => prev && cur, prev)) {
                                    return;
                                }
                                image = temp;
                            }))
                    },
                    display: "Load from clipboard",
                },
                {
                    name: "Export to clipboard",
                    onClick: () => {
                        navigator.clipboard.writeText(
                            image.map((row) => row.map((pixel) => pixel.join(" ")).join(";")).join("\n")
                        );
                    },
                    display: "Export to clipboard",
                }
            ]
        },
        {
            name: "edit",
            display: "Edit",
            action: () => {
                console.log("file");
            },
            visible: editMenuVisible,
            children: [
                {
                    name: "flip horizontally",
                    onClick: () => {
                        image = mirrorHorizontally(image)
                    },
                    display: "Flip Horizontally",
                },
                {
                    name: "flip vertically",
                    onClick: () => {
                        image = mirrorVertically(image)
                    },
                    display: "Flip Vertically",
                },
                {
                    name: "flip diagonally",
                    onClick: () => {
                        image = mirrorDiagonally(image)
                    },
                    display: "Flip Diagonally",
                },
                {
                    name: "rotate",
                    onClick: () => {
                        image = rotate(image)
                    },
                    display: "Rotate clockwise",
                },
            ]
        },
    ]
</script>

<nav>
    <div class="w-full h-max border-b-[2px]">
        <ul class="flex flex-row">
            {#each menuCategories as category}
                <li class="list-none w-max">
                    <button class="w-max text-xl p-2 hover:bg-gray-400" on:click={() => {
                        for (let cat of menuCategories) {
                            if (cat.name !== category.name) cat.visible = false;
                        }
                        category.visible = !category.visible
                    }}>{category.display}</button>
                    {#if category.visible}
                        <ul class="flex items-stretch flex-col absolute h-max bg-gray-200">
                            {#each category.children as item}
                                <li class="w-full hover:bg-gray-400">
                                    <button class="w-full text-left text-xl p-2" on:click={item.onClick} on:click={() => category.visible = false}>
                                        {item.display}
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    {/if}

                </li>
            {/each}
        </ul>
    </div>
</nav>
