export type EventSubscriber = (...params: any[]) => void

export type EventGenerator = () => LuaMultiReturn<[event: string, ...params: unknown[]]>

export class EventBus {
    private subscribers: Record<string, ReadonlyArray<EventSubscriber>> = {}

    subscribe(event: string, subscriber: EventSubscriber): this {
        if (this.subscribers[event] !== undefined) {
            this.subscribers[event] = [...this.subscribers[event], subscriber]
        } else {
            this.subscribers[event] = [subscriber]
        }
        return this
    }

    dispatch(event: string, ...params: any[]): this {
        const targetSubscribers = this.subscribers[event]
        if (targetSubscribers !== undefined) {
            targetSubscribers.forEach(subscriber => subscriber(...params))
        }
        return this
    }

    run(generator: EventGenerator): never {
        while (true) {
            const [event, ...params] = generator()
            this.dispatch(event, ...params)
        }
    }
}
