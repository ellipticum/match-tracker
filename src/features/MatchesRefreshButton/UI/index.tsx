import React from 'react'
import Button from '@/shared/UI/Button'
import { useMatches } from '@/app/providers/MatchesProvider'

const MatchesRefreshButton = () => {
    const { refreshMatches, isLoading } = useMatches()

    const onClick = () => {
        refreshMatches()
    }

    return (
        <Button disabled={isLoading} onClick={onClick}>
            Обновить
        </Button>
    )
}

export default MatchesRefreshButton
