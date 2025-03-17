import React from 'react'
import Image from 'next/image'
import { IPlayer } from '../../model/interfaces/player'
import styles from './styles.module.scss'
import Pair from '../../../../shared/UI/Pair'

interface Props extends IPlayer {}

const PlayerCard = ({ username, kills }: Props) => {
    return (
        <div className={styles.playerCard}>
            <div className={styles.info}>
                <Image
                    className={styles.image}
                    src='/images/raster/player.png'
                    alt='_'
                    height={36}
                    width={36}
                />
                <span className={styles.name}>{username}</span>
            </div>
            <Pair name='Убийств' value={kills} />
        </div>
    )
}

export default PlayerCard
