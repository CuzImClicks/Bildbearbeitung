<script lang="ts">
    import {mirrorDiagonally, mirrorHorizontally, mirrorVertically} from "./backend";

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
                                image = t.trim().replace("\r", "").split("\n").map((row) =>
                                    row.trim().replace(/;$/, "").split(";").map((pixel) =>
                                        pixel.trim().split(" ").map((color) => parseInt(color, 10))
                                    )
                                );
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
            ]
        },
    ]
</script>

<svelte:head>
    <!-- You can change icon sets according to your taste. Change `class` value in `menuItems` above to represent your icons. -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>
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
                                        <i class={item.iconClass}></i>{item.display}
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
