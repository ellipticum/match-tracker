'use client'

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'

interface IMatchesContext {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    hasErrors: boolean
    setHasErrors: Dispatch<SetStateAction<boolean>>
    matches: IMatch[]
    setMatches: Dispatch<SetStateAction<IMatch[]>>
}

const MatchesContext = createContext<IMatchesContext | null>(null)

export const useMatches = () => {
    const value = useContext(MatchesContext)

    if (!value) {
        throw new Error(`${MatchesContext.displayName} должен использоваться внутри провайдера`)
    }

    return value
}

interface Props extends ILayoutProps {}

const MatchesProvider = ({ children }: Props) => {
    const [matches, setMatches] = useState<IMatch[]>([])
    const [hasErrors, setHasErrors] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <MatchesContext.Provider
            value={{ hasErrors, setHasErrors, matches, setMatches, isLoading, setIsLoading }}
        >
            {children}
        </MatchesContext.Provider>
    )
}

export default MatchesProvider
