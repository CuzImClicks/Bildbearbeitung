<!--
Die Navigationsleiste am oberen Bildschirmrand.
-->

<script lang="ts">
    import {
        blackAndWhite,
        darken, download, exportImage,
        invertColors,
        isValidImage,
        mirrorDiagonally,
        mirrorHorizontally,
        mirrorVertically,
        rotate,
        stringToArray
    } from "./backend";
    import type {Brush} from "./brushes";
    import {brushes} from "./brushes";
    import {blue, brushType, darkenPercentage, green, image, red} from "./store";
    import NewImageMenu from "./NewImageMenu.svelte";
    import LoadFile from "./LoadFile.svelte";

    /**
     * Definiert eine Kategorie im Menü.
     * Hat eine Liste von Untermenüpunkten.
     */
    type MenuCategory = {
        name: string,
        display: string,
        action: () => void,
        visible: boolean,
        children: Array<MenuItem>
    }

    /**
     * Definiert einen Menüpunkt.
     */
    type MenuItem = {
        name: string,
        onClick: () => void,
        display: string,
    }

    // ob die Menüs angezeigt werden sollen

    let fileMenuVisible = false;
    let editMenuVisible = false;
    let brushesMenuVisible = false;
    let newImageMenuVisible = false;
    let loadImageMenuVisible = false;

    /**
     * Die Liste der Menükategorien mit ihren Untermenüpunkten.
     */
    let menuCategories: Array<MenuCategory> = [
        {
            name: "file",
            display: "File",
            action: () => {
            },
            visible: fileMenuVisible,
            children: [
                {
                    name: "new",
                    onClick: () => {
                        newImageMenuVisible = true;
                    },
                    display: "New",
                },
                {
                    name: "load from clipboard",
                    onClick: () => {
                        navigator.clipboard.readText() // liest den Inhalt der Zwischenablage
                            .then(((t) => {
                                let temp = stringToArray(t);  // wandelt den Inhalt in ein Bild um
                                if (!isValidImage(temp)) { // überprüft, ob das Bild ein Rechteck ist
                                    return;
                                }
                                $image = temp;
                            }))
                    },
                    display: "Load from clipboard",
                },
                {
                    name: "load from file",
                    onClick: () => {
                        loadImageMenuVisible = true;
                    },
                    display: "Load from file",
                },
                {
                    name: "export to clipboard",
                    onClick: () => {
                        navigator.clipboard.writeText(
                            $image.map((row) => row.map((pixel) => pixel.join(" ")).join(";")).join("\n") // exportiert das Bild als Text
                        );
                    },
                    display: "Export to clipboard",
                },
                {
                    name: "export to png",
                    onClick: () => {
                        let content = exportImage(10, $image);
                        download("image.png", content);
                    },
                    display: "Export to png",
                }
            ]
        },
        {
            name: "edit",
            display: "Edit",
            action: () => {
            },
            visible: editMenuVisible,
            children: [ // Gibt jeder Funktion einen Namen, der im Menü angezeigt wird
                {
                    name: "flip horizontally",
                    onClick: () => {
                        $image= mirrorHorizontally($image)
                    },
                    display: "Flip Horizontally",
                },
                {
                    name: "flip vertically",
                    onClick: () => {
                        $image= mirrorVertically($image)
                    },
                    display: "Flip Vertically",
                },
                {
                    name: "flip diagonally",
                    onClick: () => {
                        $image= mirrorDiagonally($image)
                    },
                    display: "Flip Diagonally",
                },
                {
                    name: "rotate",
                    onClick: () => {
                        $image= rotate($image)
                    },
                    display: "Rotate clockwise",
                },
                {
                    name: "black and white",
                    onClick: () => {
                        $image= blackAndWhite($image)
                    },
                    display: "Black and white",
                },
                {
                    name: "invert colors",
                    onClick: () => {
                        $image= invertColors($image)
                    },
                    display: "Invert colors",
                },
                {
                    name: "darken",
                    onClick: () => {
                        $image= darken($darkenPercentage, $image)
                    },
                    display: "Darken",
                },
                {
                    name: "lighten",
                    onClick: () => {
                        $image= darken(-$darkenPercentage, $image) // aufhellen ist nur verdunkeln mit negativem Wert :)
                    },
                    display: "Lighten",
                },
            ]
        },
        {
            name: "brush",
            display: "Brush",
            action: () => {},
            visible: brushesMenuVisible,
            children: brushes.map((brush: Brush) => ({
                name: brush.name,
                onClick: () => {
                    $brushType = brush.brushType; // Alternative zum Brush Fenster
                },
                display: brush.name,
            }))
        },
    ];
</script>

<nav class="select-none">
    <div class="w-full h-max border-b-2" style="border-color: rgb({$red},{$green},{$blue})">
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
                        <ul class="flex items-stretch flex-col absolute h-max bg-gray-200 z-50">
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
<!-- Die Fenster sollen nur sichtbar sein wenn sie aufgerufen werden. -->
{#if newImageMenuVisible}
    <NewImageMenu bind:visible={newImageMenuVisible} />
{/if}
{#if loadImageMenuVisible}
    <LoadFile bind:visible={loadImageMenuVisible} />
{/if}
