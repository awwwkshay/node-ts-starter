import axios from "axios"
import { createServerFn } from '@tanstack/react-start'
import { serverEnv } from "@/configs/env"

export const hello = createServerFn().handler(async () => {
    const response = await axios.get<string>(serverEnv.NITRO_API_BASE_URL)
    return response.data
})