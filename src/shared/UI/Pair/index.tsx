import React from 'react'
import styles from './styles.module.scss'
import AnimatedCounter from '@/shared/UI/AnimatedCounter'

interface Props {
    name: string
    value: string | number
}

const Pair = ({ name, value }: Props) => {
    return (
        <div className={styles.pair}>
            <span className={styles.name}>{name}:</span>
            <span className={styles.value}>
                {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
            </span>
        </div>
    )
}

export default Pair
