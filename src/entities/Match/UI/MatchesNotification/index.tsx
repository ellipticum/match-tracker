import React from 'react'
import styles from './styles.module.scss'
import { Icons } from '@/shared/UI/Icons'
import classNames from 'classnames'

interface Props {
    isHidden: boolean
}

const MatchesNotification = ({ isHidden }: Props) => {
    return (
        <div
            className={classNames(styles.matchesNotification, {
                [styles.hidden]: isHidden
            })}
        >
            <Icons.Alert />
            <span>Ошибка: не удалось загрузить информацию</span>
        </div>
    )
}

export default MatchesNotification
