import { statusMap } from './statusMap'

export const options = [
    { name: 'Все матчи', value: null },
    ...Object.entries(statusMap).map((item) => ({
        name: item[1],
        value: item[0]
    }))
]
