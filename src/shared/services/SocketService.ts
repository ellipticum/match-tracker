import { IMatch } from '@/entities/Match/model/interfaces/match'

type SocketCallback = {
    onMatches: (matches: IMatch[]) => void
    onError: () => void
}

class SocketService {
    private static instance: SocketService
    private socket: WebSocket | null = null
    private callbacks: SocketCallback | null = null

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService()
        }
        return SocketService.instance
    }

    public connect(callbacks: SocketCallback): void {
        this.callbacks = callbacks

        if (
            this.socket &&
            (this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING)
        ) {
            return
        }

        this.socket = new WebSocket('wss://app.ftoyd.com/fronttemp-service/ws')

        this.socket.onopen = () => {
            console.log('WebSocket connection established')
        }

        this.socket.onmessage = (event) => {
            try {
                const response = JSON.parse(event.data)
                if (response.type === 'update_matches' && response.data && this.callbacks) {
                    this.callbacks.onMatches(response.data)
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
                if (this.callbacks) {
                    this.callbacks.onError()
                }
            }
        }

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error)
            if (this.callbacks) {
                this.callbacks.onError()
            }
        }

        this.socket.onclose = () => {
            console.log('WebSocket connection closed')
        }
    }

    public disconnect(): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.close()
        }
        this.socket = null
    }

    public reconnect(): void {
        this.disconnect()
        if (this.callbacks) {
            this.connect(this.callbacks)
        }
    }
}

export default SocketService
