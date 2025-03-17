import React from 'react'
import styles from './styles.module.scss'
import { IButtonProps } from '../../interfaces/buttonProps'
import classNames from 'classnames'
import { Icons } from '../Icons'

interface Props extends IButtonProps {}

const Button = ({ className, children, ...props }: Props) => {
    return (
        <button className={classNames(styles.button, className)} {...props}>
            <span>{children}</span>
            <Icons.Refresh />
        </button>
    )
}

export default Button
