import React from 'react'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import styles from './styles.module.scss'
import { Icons } from '@/shared/UI/Icons'
import TeamItem from '@/entities/Team/UI/TeamItem'
import StatusCard from '@/entities/Match/UI/StatusCard'
import { useMatches } from '@/app/providers/MatchesProvider'
import classNames from 'classnames'
import TeamCard from '@/entities/Team/UI/TeamCard'
import AnimatedCounter from '@/shared/UI/AnimatedCounter'

interface Props extends IMatch {}

const MatchItem = ({ title, homeTeam, status, awayTeam, homeScore, awayScore }: Props) => {
    const { selectedMatchTitle, setSelectedMatchTitle } = useMatches()

    return (
        <div className={styles.matchItem}>
            <div className={styles.matchWrapper}>
                <div className={styles.content}>
                    <TeamItem {...homeTeam} />
                    <div className={styles.info}>
                        <div className={styles.score}>
                            <span>
                                <AnimatedCounter value={homeScore} /> :{' '}
                                <AnimatedCounter value={awayScore} />
                            </span>
                        </div>
                        <StatusCard status={status} />
                    </div>
                    <TeamItem isReversed {...awayTeam} />
                </div>
                <button
                    className={classNames(styles.expandButton, {
                        [styles.rotated]: selectedMatchTitle === title
                    })}
                    onClick={() =>
                        setSelectedMatchTitle((prevState) => (prevState === title ? null : title))
                    }
                >
                    <Icons.Expand />
                </button>
            </div>
            <div
                className={classNames(styles.teamsWrapper, {
                    [styles.hidden]: title !== selectedMatchTitle
                })}
            >
                <TeamCard {...homeTeam} />
                <div className={styles.teamsDivider}>
                    <hr />
                    <span>vs</span>
                    <hr />
                </div>
                <TeamCard {...awayTeam} />
            </div>
        </div>
    )
}

export default MatchItem
