import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import Matches from '../../entities/Match/UI/Matches'
import { fetchMatches } from '@/entities/Match/api/fetchMatches'

const Home = async () => {
    const response = await fetchMatches()

    const matches = response ? response.data.matches : []
    const hasErrors = !response

    return (
        <Wrapper>
            <Matches initialMatches={matches} initialHasErrors={hasErrors} />
        </Wrapper>
    )
}

export default Home
