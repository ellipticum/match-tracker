'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import SocketService from '@/shared/services/SocketService'

interface MatchesContextType {
    selectedMatchTitle: string | null
    setSelectedMatchTitle: (selectedMatchTitle: string | null) => void
    matches: IMatch[]
    setMatches: (matches: IMatch[]) => void
    filteredMatches: IMatch[]
    setFilteredMatches: (matches: IMatch[]) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    hasErrors: boolean
    setHasErrors: (hasErrors: boolean) => void
    refreshMatches: () => void
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined)

export const useMatches = () => {
    const context = useContext(MatchesContext)

    if (context === undefined) {
        throw new Error()
    }

    return context
}

interface MatchesProviderProps {
    children: ReactNode
}

const MatchesProvider: React.FC<MatchesProviderProps> = ({ children }) => {
    const [matches, setMatches] = useState<IMatch[]>([])
    const [selectedMatchTitle, setSelectedMatchTitle] = useState<string | null>(null)
    const [filteredMatches, setFilteredMatches] = useState<IMatch[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasErrors, setHasErrors] = useState(false)

    useEffect(() => {
        const socketService = SocketService.getInstance()

        socketService.connect({
            onMatches: (newMatches) => {
                setMatches(newMatches)
                setIsLoading(false)
                setHasErrors(false)
            },
            onError: () => {
                setHasErrors(true)
                setIsLoading(false)
            }
        })

        return () => {
            socketService.disconnect()
        }
    }, [])

    const refreshMatches = () => {
        setIsLoading(true)
        const socketService = SocketService.getInstance()
        socketService.reconnect()
    }

    return (
        <MatchesContext.Provider
            value={{
                selectedMatchTitle,
                setSelectedMatchTitle,
                matches,
                setMatches,
                filteredMatches,
                setFilteredMatches,
                isLoading,
                setIsLoading,
                hasErrors,
                setHasErrors,
                refreshMatches
            }}
        >
            {children}
        </MatchesContext.Provider>
    )
}

export default MatchesProvider
