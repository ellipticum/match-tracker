import React from 'react'
import styles from './styles.module.scss'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import MatchesProvider from '@/app/providers/MatchesProvider'

interface Props extends ILayoutProps {}

const Wrapper = ({ children }: Props) => {
    return (
        <MatchesProvider>
            <div className={styles.wrapper}>{children}</div>
        </MatchesProvider>
    )
}

export default Wrapper
