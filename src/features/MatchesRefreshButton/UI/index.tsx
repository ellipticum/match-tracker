import React from 'react'
import Button from '@/shared/UI/Button'
import { fetchMatches } from '@/entities/Match/api/fetchMatches'
import { useMatches } from '@/app/providers/MatchesProvider'

const MatchesRefreshButton = () => {
    const { setMatches, isLoading, setIsLoading, setHasErrors } = useMatches()

    const onClick = async () => {
        setIsLoading(true)

        const response = await fetchMatches(true)

        setIsLoading(false)

        if (!response) {
            setHasErrors(true)

            return
        } else {
            setHasErrors(false)
        }

        const { matches } = response.data

        setMatches(matches)
    }

    return (
        <Button disabled={isLoading} onClick={onClick}>
            Обновить
        </Button>
    )
}

export default MatchesRefreshButton
