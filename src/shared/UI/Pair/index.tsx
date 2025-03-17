import React from 'react'
import styles from './styles.module.scss'

interface Props {
    name: string
    value: string | number
}

const Pair = ({ name, value }: Props) => {
    return (
        <div className={styles.pair}>
            <span className={styles.name}>{name}:</span>
            <span className={styles.value}>{value}</span>
        </div>
    )
}

export default Pair
