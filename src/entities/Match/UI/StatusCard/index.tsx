import React from 'react'
import styles from './styles.module.scss'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import classNames from 'classnames'
import { MatchStatus } from '@/entities/Match/model/enums/matchStatus'
import { statusMap } from '@/entities/Match/model/data/statusMap'

interface Props {
    status: MatchStatus
}

const StatusCard = ({ status }: Props) => {
    return (
        <div className={classNames(styles.statusCard, styles[status.toLowerCase()])}>
            {statusMap[status]}
        </div>
    )
}

export default StatusCard
