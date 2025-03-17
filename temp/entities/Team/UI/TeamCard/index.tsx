import React from 'react'
import styles from './styles.module.scss'
import { ITeam } from '../../model/interfaces/team'
import { IPlayer } from '../../../Player/model/interfaces/player'
import PlayerCard from '../../../Player/UI/PlayerCard'
import Pair from '../../../../shared/UI/Pair'

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
                {info.map((item, index) => {
                    return (
                        <div key={index} className={styles.infoItem}>
                            <Pair {...item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamCard
