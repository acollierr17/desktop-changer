import { fetch, ResponseType } from '@tauri-apps/api/http'

import { version } from '../../package.json'
import { UNSPLASH_URL } from './contants'

const unsplash = UNSPLASH_URL
const headers = {
    'X-Requested-With': 'Desktop Changer',
    'User-Agent': `acollierr17/desktop-changer (v${version}, https:github.com/acollierr17/desktop-changer`,
}

const toBase64 = (arr: Uint8Array): string => {
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
}

export const getRandomImageBuffer = (): Promise<Uint8Array> => {
    return fetch(unsplash, {
        method: 'GET',
        timeout: 30,
        headers,
        responseType: ResponseType.Binary,
    }).then((res) => res.data as Uint8Array)
}

export const getImageBase64 = async (buffer: Uint8Array): Promise<string> => {
    return `data:image/jpg;base64,${toBase64(buffer)}`
}

export const newFileName = (): string => {
    const date = new Date()
    return `Background Image ${date.getFullYear()}-${
        date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
    }-${date.getDate()} at ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.jpg`
}
