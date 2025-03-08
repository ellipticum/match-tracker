import React from 'react'
import { ITeam } from '@/entities/Team/model/interfaces/team'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { Icons } from '@/shared/UI/Icons'

interface Props {
    data: ITeam
    isReversed?: boolean
}

const TeamItem = ({ data, isReversed = false }: Props) => {
    return (
        <div className={classNames(styles.teamItem, { [styles.reversed]: isReversed })}>
            <Icons.Team />
            <span>{data.name}</span>
        </div>
    )
}

export default TeamItem
