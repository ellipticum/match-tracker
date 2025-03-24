'use client'

import React, { memo, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import MatchItem from '@/entities/Match/UI/MatchItem'
import Logo from '@/shared/UI/Logo'
import Container from '@/shared/UI/Container'
import Loader from '@/shared/UI/Loader'
import Select from '@/shared/UI/Select'
import { MatchStatus } from '@/entities/Match/model/enums/matchStatus'
import MatchesNotification from '@/entities/Match/UI/MatchesNotification'
import MatchesRefreshButton from '@/features/MatchesRefreshButton/UI'
import { useMatches } from '@/app/providers/MatchesProvider'
import { options } from '@/entities/Match/model/data/options'

const Matches = () => {
    const { currentStatus, hasErrors, isLoading, filteredMatches, filterByStatus } = useMatches()

    useEffect(() => {
        console.log('render (Matches)')
    })

    const onSelect = (status: MatchStatus | null) => {
        filterByStatus(status)
    }

    return (
        <Container>
            <div className={styles.matches}>
                <div className={styles.matchesHeader}>
                    <div className={styles.part}>
                        <Logo />
                        <Select value={currentStatus} options={options} onSelect={onSelect} />
                    </div>
                    <div className={styles.interactive}>
                        <MatchesNotification isHidden={!hasErrors} />
                        <MatchesRefreshButton />
                    </div>
                </div>
                <div className={styles.list}>
                    {filteredMatches.length > 0 ? (
                        filteredMatches.map((item, index) => {
                            return <MatchItem key={item.time} {...item} />
                        })
                    ) : isLoading ? (
                        <div className={styles.loaderWrapper}>
                            <Loader />
                        </div>
                    ) : (
                        <div className={styles.notFound}>Ничего не найдено!</div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default Matches
