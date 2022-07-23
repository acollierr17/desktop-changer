<script lang="ts">
    import { PLACEHOLDER_URL } from './contants'

    export let url: string = PLACEHOLDER_URL
</script>

<img src={url} alt="Desktop Background" class="background">

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
