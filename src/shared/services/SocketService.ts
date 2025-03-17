import { IMatch } from '@/entities/Match/model/interfaces/match'

type SocketCallback = {
    onMatches: (matches: IMatch[]) => void
    onError: () => void
}

type SocketConfig = {
    url: string
    reconnectDelay: number
    maxReconnectAttempts: number
    reconnectBackoffMultiplier: number
}

class SocketService {
    private static instance: SocketService
    private socket: WebSocket | null = null
    private callbacks: SocketCallback | null = null
    private reconnectAttempts = 0
    private reconnectTimeout: NodeJS.Timeout | null = null
    private isManualDisconnect = false

    private readonly config: SocketConfig = {
        url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://app.ftoyd.com/fronttemp-service/ws',
        reconnectDelay: 1000,
        maxReconnectAttempts: 5,
        reconnectBackoffMultiplier: 1.5
    }

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService()
        }
        return SocketService.instance
    }

    public connect(callbacks: SocketCallback): void {
        this.callbacks = callbacks
        this.isManualDisconnect = false

        if (this.isConnectedOrConnecting()) {
            return
        }

        this.establishConnection()
    }

    public disconnect(): void {
        this.isManualDisconnect = true
        this.clearReconnectTimeout()

        if (this.socket && this.isConnected()) {
            this.socket.close()
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
            this.attemptReconnect()
        }
    }

    private handleOpen(): void {
        this.reconnectAttempts = 0
    }

    private handleMessage(event: MessageEvent): void {
        try {
            const response = JSON.parse(event.data)
            if (response.type === 'update_matches' && response.data && this.callbacks) {
                this.callbacks.onMatches(response.data)
            }
        } catch (error) {
            if (this.callbacks) {
                this.callbacks.onError()
            }
        }
    }

    private handleError(): void {
        if (this.callbacks) {
            this.callbacks.onError()
        }
    }

    private handleClose(): void {
        this.attemptReconnect()
    }

    private attemptReconnect(): void {
        if (this.isManualDisconnect) return

        this.clearReconnectTimeout()

        if (this.reconnectAttempts < this.config.maxReconnectAttempts) {
            const delay = this.calculateReconnectDelay()

            this.reconnectTimeout = setTimeout(() => {
                this.reconnectAttempts++
                this.establishConnection()
            }, delay)
        } else if (this.callbacks) {
            this.callbacks.onError()
        }
    }

    private calculateReconnectDelay(): number {
        return (
            this.config.reconnectDelay *
            Math.pow(this.config.reconnectBackoffMultiplier, this.reconnectAttempts)
        )
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
