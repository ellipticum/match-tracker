'use client'

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    SetStateAction,
    Dispatch,
    useMemo,
    useCallback
} from 'react'
import { IMatch } from '@/entities/Match/model/interfaces/match'
import SocketService from '@/shared/services/SocketService'
import { MatchStatus } from '@/entities/Match/model/enums/matchStatus'

interface IMatchesContext {
    selectedMatchTitle: string | null
    setSelectedMatchTitle: Dispatch<SetStateAction<string | null>>
    matches: IMatch[]
    setMatches: Dispatch<SetStateAction<IMatch[]>>
    filteredMatches: IMatch[]
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    hasErrors: boolean
    setHasErrors: Dispatch<SetStateAction<boolean>>
    refreshMatches: () => void
    filterByStatus: (status: MatchStatus | null) => void
    currentStatus: MatchStatus | null
}

const MatchesContext = createContext<IMatchesContext | undefined>(undefined)

export const useMatches = () => {
    const context = useContext(MatchesContext)
    if (context === undefined) {
        throw new Error('useMatches must be used within a MatchesProvider')
    }
    return context
}

interface Props {
    children: ReactNode
}

const MatchesProvider = ({ children }: Props) => {
    const [matches, setMatches] = useState<IMatch[]>([])
    const [selectedMatchTitle, setSelectedMatchTitle] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasErrors, setHasErrors] = useState(false)
    const [currentStatus, setCurrentStatus] = useState<MatchStatus | null>(null)
    const [state, setState] = useState<number>(0)

    const filteredMatches = useMemo(() => {
        if (currentStatus === null) {
            return matches
        }

        return matches.filter((match) => match.status === currentStatus)
    }, [matches, currentStatus])

    const refreshMatches = useCallback(() => {
        setIsLoading(true)
        setHasErrors(false)

        try {
            SocketService.getInstance().reconnect()
        } catch (error) {
            console.error('Failed to reconnect socket', error)
            setHasErrors(true)
            setIsLoading(false)
        }
    }, [])

    const filterByStatus = useCallback((status: MatchStatus | null) => {
        setCurrentStatus(status)
    }, [])

    useEffect(() => {
        const socketService = SocketService.getInstance()

        const handleMatches = (newMatches: IMatch[]) => {
            setMatches(newMatches)
            setIsLoading(false)
            setHasErrors(false)
        }

        const handleError = (error?: Error) => {
            console.error('Socket connection error', error)
            setHasErrors(true)
            setIsLoading(false)
        }

        try {
            socketService.connect({
                onMatches: handleMatches,
                onError: handleError
            })
        } catch (error) {
            console.error('Failed to connect socket', error)
            setHasErrors(true)
            setIsLoading(false)
        }

        return () => {
            try {
                socketService.disconnect()
            } catch (error) {
                console.error('Failed to disconnect socket', error)
            }
        }
    }, [])

    const value = useMemo(() => {
        return {
            selectedMatchTitle,
            setSelectedMatchTitle,
            matches,
            setMatches,
            filteredMatches,
            isLoading,
            setIsLoading,
            hasErrors,
            setHasErrors,
            refreshMatches,
            filterByStatus,
            currentStatus
        }
    }, [
        selectedMatchTitle,
        setSelectedMatchTitle,
        matches,
        setMatches,
        filteredMatches,
        isLoading,
        setIsLoading,
        hasErrors,
        setHasErrors,
        refreshMatches,
        filterByStatus,
        currentStatus
    ])

    return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>
}

export default MatchesProvider
