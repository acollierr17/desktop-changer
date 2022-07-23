<script lang="ts">
    import { invoke } from '@tauri-apps/api'
    import { onMount } from 'svelte'

    let url: string;

    onMount(async () => {
        try {
            // eventually invoke this command to display the wallpaper
            // url = await invoke<string>('get_wallpaper')
        } catch (e) {
            console.error(e)
            alert('Failed to get wallpaper')
        }
    })
</script>

<img src={url} alt="Current desktop background" class="background">

<style>
    img {
        max-width: 100%;
        max-height: 100%;
    }

    .background {
        height: 50%;
        width: 50%
    }
</style>