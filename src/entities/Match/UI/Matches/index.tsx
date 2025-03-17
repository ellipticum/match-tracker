'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './styles.module.scss'
import MatchItem from '@/entities/Match/UI/MatchItem'
import Image from 'next/image'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import MatchesRefreshButton from '@/features/MatchesRefreshButton/UI'
import { useMatches } from '@/app/providers/MatchesProvider'
import { set } from 'immutable'
import MatchesNotification from '@/entities/Match/UI/MatchesNotification'
import Logo from '@/shared/UI/Logo'
import Container from '@/shared/UI/Container'
import EmptyLoader from 'next/dist/build/webpack/loaders/empty-loader'
import Loader from '@/shared/UI/Loader'

interface Props {}

const Matches = () => {
    const { matches, hasErrors, isLoading } = useMatches()

    return (
        <Container>
            <div className={styles.matches}>
                <div className={styles.matchesHeader}>
                    <Logo />
                    <div className={styles.interactive}>
                        <MatchesNotification isHidden={!hasErrors} />
                        <MatchesRefreshButton />
                    </div>
                </div>
                <div className={styles.list}>
                    {matches.length > 0 ? (
                        matches.map((item, index) => {
                            return <MatchItem key={index} {...item} />
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
