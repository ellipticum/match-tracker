import React from 'react'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import styles from './styles.module.scss'
import { Icons } from '@/shared/UI/Icons'
import TeamItem from '@/entities/Team/UI/TeamItem'
import StatusCard from '@/entities/Match/UI/StatusCard'
import { useMatches } from '@/app/providers/MatchesProvider'
import classNames from 'classnames'

interface Props {
    data: IMatch
}

const MatchItem = ({ data }: Props) => {
    const { title, homeTeam, status, awayTeam, homeScore, awayScore } = data

    const { selectedMatchTitle, setSelectedMatchTitle } = useMatches()

    return (
        <div className={styles.matchItem}>
            <div className={styles.wrapper}>
                <TeamItem data={homeTeam} />
                <div className={styles.content}>
                    <div className={styles.score}>
                        <span>
                            {homeScore} : {awayScore}
                        </span>
                    </div>
                    <StatusCard status={status} />
                </div>
                <TeamItem isReversed data={awayTeam} />
            </div>
            <button
                className={classNames(styles.expandButton, {
                    [styles.rotated]: selectedMatchTitle === title
                })}
                onClick={() => setSelectedMatchTitle(title)}
            >
                <Icons.Expand />
            </button>
        </div>
    )
}

export default MatchItem
