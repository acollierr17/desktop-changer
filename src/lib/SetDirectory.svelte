<script lang="ts">
    import { open } from '@tauri-apps/api/dialog'
    import { downloadDir } from '@tauri-apps/api/path'
    import { bgPath } from './stores'

    let backgroundPath: string;

    bgPath.subscribe(path => {
        backgroundPath = path;
    });

    const setFolder = async () => {
        const downloadFolder = await downloadDir();
        const folder = await open({
            title: 'Select a folder',
            directory: true,
            defaultPath: backgroundPath || downloadFolder,
        });

        if (folder) {
            alert('Folder selected! Check console')
            console.log('Folder selected', folder)
            bgPath.set(Array.isArray(folder) ? folder.join('') : folder)
        }
    }
</script>

<button on:click={setFolder}>Select Folder</button>
<br>
<p>The folder path:</p> <pre>{$bgPath}</pre>