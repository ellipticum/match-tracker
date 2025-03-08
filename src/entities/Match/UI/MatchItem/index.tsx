import React from 'react'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import styles from './styles.module.scss'
import { Icons } from '@/shared/UI/Icons'
import TeamItem from '@/entities/Team/UI/TeamItem'
import StatusCard from '@/entities/Match/UI/StatusCard'

interface Props {
    data: IMatch
}

const MatchItem = ({ data }: Props) => {
    const { homeTeam, status, awayTeam, homeScore, awayScore } = data

    return (
        <div className={styles.matchItem}>
            <TeamItem data={homeTeam} />
            <div className={styles.wrapper}>
                <div className={styles.score}>
                    <span>
                        {homeScore} : {awayScore}
                    </span>
                </div>
                <StatusCard status={status} />
            </div>
            <TeamItem isReversed data={awayTeam} />
        </div>
    )
}

export default MatchItem
