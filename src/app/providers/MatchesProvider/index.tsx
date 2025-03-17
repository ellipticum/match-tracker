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

    const filteredMatches = useMemo(() => {
        if (currentStatus === null) {
            return matches
        }

        return matches.filter((match) => match.status === currentStatus)
    }, [matches, currentStatus])

    const refreshMatches = useCallback(() => {
        setIsLoading(true)
        setHasErrors(false)

        SocketService.getInstance().reconnect()
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

        const handleError = () => {
            setHasErrors(true)
            setIsLoading(false)
        }

        socketService.connect({
            onMatches: handleMatches,
            onError: handleError
        })

        return () => {
            socketService.disconnect()
        }
    }, [])

    return (
        <MatchesContext.Provider
            value={{
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
            }}
        >
            {children}
        </MatchesContext.Provider>
    )
}

export default MatchesProvider
