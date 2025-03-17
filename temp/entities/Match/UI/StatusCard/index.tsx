import React from 'react'
import styles from './styles.module.scss'
import { ILayoutProps } from '../../../../shared/interfaces/layoutProps'
import classNames from 'classnames'
import { MatchStatus } from '../../model/enums/matchStatus'
import { statusMap } from '../../model/data/statusMap'

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
