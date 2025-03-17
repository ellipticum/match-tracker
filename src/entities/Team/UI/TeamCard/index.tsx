import React from 'react'
import styles from './styles.module.scss'
import { ITeam } from '@/entities/Team/model/interfaces/team'
import { IPlayer } from '@/entities/Player/model/interfaces/player'
import PlayerCard from '@/entities/Player/UI/PlayerCard'
import Pair from '@/shared/UI/Pair'

interface Props extends ITeam {}

const TeamCard = ({ name, place, points, total_kills, players }: Props) => {
    const info = [
        {
            name: 'Points',
            value: points
        },
        {
            name: 'Место',
            value: place
        },
        {
            name: 'Всего убийств',
            value: total_kills
        }
    ]

    return (
        <div className={styles.teamCard}>
            <div className={styles.players}>
                {players.map((player) => {
                    return <PlayerCard {...player} />
                })}
            </div>
            <div className={styles.info}>
                {info.map((item) => {
                    return (
                        <div className={styles.infoItem}>
                            <Pair {...item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamCard
