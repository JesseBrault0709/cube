import type { EventBus } from '../event-bus'

export class TimerManager {
    private callbacks: Record<number, (() => void) | undefined> = {}

    constructor(private timerGenerator: (length: number) => number, eventBus: EventBus) {
        eventBus.subscribe('timer', (id: number) => {
            if (this.callbacks[id] !== undefined) {
                this.callbacks[id]!()
                this.callbacks[id] = undefined
            }
        })
    }

    start(length: number, callback: () => void) {
        const id = this.timerGenerator(length)
        this.callbacks[id] = callback
    }
}
