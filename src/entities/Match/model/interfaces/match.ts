import { ITeam } from '@/entities/Team/model/interfaces/team'
import { MatchStatus } from '@/entities/Match/model/enums/matchStatus'

export interface IMatch {
    title: string
    time: string
    homeScore: number
    awayScore: number
    status: MatchStatus
    homeTeam: ITeam
    awayTeam: ITeam
}
