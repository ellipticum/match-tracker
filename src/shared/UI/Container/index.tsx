import React from 'react'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import styles from './styles.module.scss'

interface Props extends ILayoutProps {}

const Container = ({ children }: Props) => {
    return <div className={styles.container}>{children}</div>
}

export default Container
