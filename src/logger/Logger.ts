export type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'trace'

const levelNumbers: Record<LogLevel, number> = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
    trace: 5
}

export class Logger {
    private currentLevel: LogLevel

    constructor(private readonly writer: (msg: any) => void, initialLevel: LogLevel) {
        this.currentLevel = initialLevel
    }

    setLevel(newLevel: LogLevel): void {
        this.currentLevel = newLevel
    }

    private log(msg: any, level: LogLevel): void {
        if (levelNumbers[level] <= levelNumbers[this.currentLevel]) {
            this.writer(msg)
        }
    }

    fatal(msg: any): void {
        this.log(msg, 'fatal')
    }

    error(msg: any): void {
        this.log(msg, 'error')
    }

    warning(msg: any): void {
        this.log(msg, 'warning')
    }

    info(msg: any): void {
        this.log(msg, 'info')
    }

    debug(msg: any): void {
        this.log(msg, 'debug')
    }

    trace(msg: any): void {
        this.log(msg, 'trace')
    }
}
