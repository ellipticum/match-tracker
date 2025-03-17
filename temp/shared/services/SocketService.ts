import { IMatch } from '../../entities/Match/model/interfaces/match'

interface SocketMessage {
    type: string
    data?: IMatch[]
}

type SocketCallback = {
    onMatches: (matches: IMatch[]) => void
    onError: (error?: Error) => void
}

type SocketConfig = {
    url: string
    reconnectDelay: number
    maxReconnectAttempts: number
    reconnectBackoffMultiplier: number
    maxReconnectDelay: number
}

class SocketService {
    private static instance: SocketService | null = null
    private socket: WebSocket | null = null
    private callbacks: SocketCallback | null = null
    private reconnectAttempts = 0
    private reconnectTimeout: NodeJS.Timeout | null = null
    private isManualDisconnect = false

    private readonly config: SocketConfig = {
        url: '',
        reconnectDelay: 1000,
        maxReconnectAttempts: 5,
        reconnectBackoffMultiplier: 1.5,
        maxReconnectDelay: 30000
    }

    private constructor() {
        this.config.url =
            process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://app.ftoyd.com/fronttemp-service/ws'
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService()
        }
        return SocketService.instance
    }

    public static resetInstance(): void {
        if (SocketService.instance) {
            SocketService.instance.disconnect()
            SocketService.instance = null
        }
    }

    public connect(callbacks: SocketCallback): void {
        this.callbacks = callbacks
        this.isManualDisconnect = false

        if (this.isConnectedOrConnecting()) {
            return
        }

        try {
            this.establishConnection()
        } catch (error) {
            console.error('Failed to establish connection', error)
            this.handleConnectionError(
                error instanceof Error ? error : new Error('Unknown connection error')
            )
        }
    }

    public disconnect(): void {
        this.isManualDisconnect = true
        this.clearReconnectTimeout()

        if (this.socket && this.isConnected()) {
            try {
                this.socket.close()
            } catch (error) {
                console.error('Error closing socket', error)
            }
        }

        this.socket = null
        this.reconnectAttempts = 0
    }

    public reconnect(): void {
        this.disconnect()
        this.isManualDisconnect = false
        this.reconnectAttempts = 0

        if (this.callbacks) {
            this.connect(this.callbacks)
        } else {
            console.warn('Cannot reconnect: no callbacks registered')
        }
    }

    private establishConnection(): void {
        try {
            this.socket = new WebSocket(this.config.url)

            this.socket.onopen = this.handleOpen.bind(this)
            this.socket.onmessage = this.handleMessage.bind(this)
            this.socket.onerror = this.handleError.bind(this)
            this.socket.onclose = this.handleClose.bind(this)
        } catch (error) {
            console.error('Error establishing connection', error)
            this.handleConnectionError(
                error instanceof Error ? error : new Error('Unknown connection error')
            )
        }
    }

    private handleOpen(): void {
        console.info('WebSocket connection established')
        this.reconnectAttempts = 0
    }

    private handleMessage(event: MessageEvent): void {
        try {
            const response = JSON.parse(event.data) as SocketMessage
            if (response.type === 'update_matches' && response.data && this.callbacks) {
                this.callbacks.onMatches(response.data)
            }
        } catch (error) {
            console.error('Error processing WebSocket message', error)
            this.handleConnectionError(
                error instanceof Error ? error : new Error('Error parsing message')
            )
        }
    }

    private handleError(event: Event): void {
        console.error('WebSocket error', event)
        this.handleConnectionError(new Error('WebSocket error occurred'))
    }

    private handleClose(event: CloseEvent): void {
        console.info(`WebSocket connection closed: ${event.code} ${event.reason}`)
        this.attemptReconnect()
    }

    private handleConnectionError(error: Error): void {
        if (this.callbacks) {
            this.callbacks.onError(error)
        }
        this.attemptReconnect()
    }

    private attemptReconnect(): void {
        if (this.isManualDisconnect) {
            console.info('Manual disconnect detected, not attempting reconnect')
            return
        }

        this.clearReconnectTimeout()

        if (this.reconnectAttempts < this.config.maxReconnectAttempts) {
            const delay = this.calculateReconnectDelay()

            console.info(
                `Attempting reconnect in ${delay}ms (attempt ${this.reconnectAttempts + 1} of ${this.config.maxReconnectAttempts})`
            )

            this.reconnectTimeout = setTimeout(() => {
                this.reconnectAttempts++
                this.establishConnection()
            }, delay)
        } else {
            console.warn('Maximum reconnect attempts reached')

            if (this.callbacks) {
                this.callbacks.onError(new Error('Maximum reconnect attempts reached'))
            }
        }
    }

    private calculateReconnectDelay(): number {
        const delay = Math.min(
            this.config.reconnectDelay *
                Math.pow(this.config.reconnectBackoffMultiplier, this.reconnectAttempts),
            this.config.maxReconnectDelay
        )
        return delay
    }

    private clearReconnectTimeout(): void {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout)
            this.reconnectTimeout = null
        }
    }

    private isConnected(): boolean {
        return !!this.socket && this.socket.readyState === WebSocket.OPEN
    }

    private isConnectedOrConnecting(): boolean {
        return (
            !!this.socket &&
            (this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING)
        )
    }
}

export default SocketService
