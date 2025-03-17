import { MatchStatus } from '@/entities/Match/model/enums/matchStatus'

export const statusMap: Record<MatchStatus, string> = {
    [MatchStatus.Ongoing]: 'Live',
    [MatchStatus.Finished]: 'Finished',
    [MatchStatus.Scheduled]: 'Scheduled'
}
