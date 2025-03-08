import { IPlayer } from '@/entities/Match/model/interfaces/player'

export interface ITeam {
    name: string
    place: number
    points: number
    total_kills: number
    players: IPlayer[]
}
