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

interface Props {
    initialHasErrors: boolean
    initialMatches: IMatch[]
}

const Matches = ({ initialMatches, initialHasErrors }: Props) => {
    const { matches, setMatches, hasErrors, setHasErrors } = useMatches()

    useEffect(() => {
        if (matches.length > 0) {
            return
        }

        setMatches(initialMatches)
        setHasErrors(initialHasErrors)
    }, [])

    const array = matches.length === 0 ? initialMatches : matches

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
                    {array.length > 0 ? (
                        array.map((item, index) => {
                            return <MatchItem key={index} data={item} />
                        })
                    ) : (
                        <div className={styles.notFound}>Ничего не найдено!</div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default Matches
