import { ITeam } from '../../../Team/model/interfaces/team'
import { MatchStatus } from '../enums/matchStatus'

export interface IMatch {
    title: string
    time: string
    homeScore: number
    awayScore: number
    status: MatchStatus
    homeTeam: ITeam
    awayTeam: ITeam
}
