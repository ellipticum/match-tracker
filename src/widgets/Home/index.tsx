'use client'

import React from 'react'
import Wrapper from '../../shared/UI/Wrapper'
import Matches from '../../entities/Match/UI/Matches'
import { useMatches } from '../../app/providers/MatchesProvider'

const Home = () => {
    return (
        <Wrapper>
            <Matches />
        </Wrapper>
    )
}

export default Home
