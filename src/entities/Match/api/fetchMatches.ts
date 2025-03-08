import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchMatches = async (withSleep: boolean = false) => {
    try {
        const { data } = await axiosInstance.get('/fronttemp')

        if (withSleep && Math.random() > 0.5) {
            throw new Error('Zzzzz (The server is sleeping)')
        }

        return data
    } catch (error) {
        console.error(error)
    }
}
