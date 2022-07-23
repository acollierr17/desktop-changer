<script lang='ts'>
    import { invoke } from '@tauri-apps/api'
    import { writeBinaryFile } from '@tauri-apps/api/fs'
    import { join } from '@tauri-apps/api/path'

    import { getImageBase64, getRandomImageBuffer, newFileName } from './functions'
    import { PLACEHOLDER_URL } from './contants'
    import BackgroundImage from './BackgroundImage.svelte'
    import SetDirectory from './SetDirectory.svelte'
    import { bgPath } from './stores'
    import { downloadDir } from '@tauri-apps/api/path'

    let buffer: Uint8Array = new Uint8Array([])
    let src: string = PLACEHOLDER_URL

    let backgroundPath: string;

    bgPath.subscribe(path => {
        backgroundPath = path;
    });

    const getRandomImage = async () => {
        try {
            buffer = await getRandomImageBuffer()
            src = await getImageBase64(buffer)
        } catch (e) {
            console.error(e)
            alert('Error fetching data')
        }
    }

    const saveImage = async (): Promise<void> => {
        if (src === PLACEHOLDER_URL) {
            alert('Please select an image first')
            return
        }

        if (!backgroundPath) {
            const downloadFolder = await downloadDir();
            bgPath.set(downloadFolder)
        }

        try {
            const name = newFileName()
            const filePath = await join(backgroundPath, name)
            await writeBinaryFile(filePath, buffer)
            await invoke('set_wallpaper', { path: filePath })
            alert('Image saved to the set folder path!')
        } catch (e) {
            console.error(e)
            alert('Error occurred. Check the logs')
        }
    }
</script>

<BackgroundImage url={src} />
<br />
<button on:click={getRandomImage}>Click to fetch image</button>
<button on:click={saveImage}>Click to set desktop wallpaper</button>
<SetDirectory />