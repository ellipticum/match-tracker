import { IPlayer } from '@/entities/Player/model/interfaces/player'

export interface ITeam {
    name: string
    place: number
    points: number
    total_kills: number
    players: IPlayer[]
}
