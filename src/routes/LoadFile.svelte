<!--
Ermöglicht es den Nutzer eine Datei auszuwählen und als Bild zu importieren.
-->
<script lang="ts">
    import { isValidImage, stringToArray } from "./backend";
    import { image } from "./store";

    export let visible = false;

    let files: FileList;
    $: if (files) {
        files[0].text().then((v) => {
            let img = stringToArray(v); // Konvertiert den String in ein Array
            if (!isValidImage(img)) { // Prüft, ob das Array ein gültiges Bild ist
                return;
            }
            $image = img; // Speichert das Bild in der Variable
            visible = false; // Schließt das Fenster
        });
    }
</script>

<div class="flex items-center bg-gray-300 rounded p-8 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur z-50">
    <div>
        <div class="">
            <input type="file" bind:files>
        </div>
    </div>
</div>
