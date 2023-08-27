import { EventBus } from '../event-bus'

export type ButtonStyle = {
    color: colors
    backgroundColor: colors
}

export type ButtonProps = {
    x: number
    y: number
    width: number
    height: number

    text: string
    textX: number
    textY: number

    style: ButtonStyle
    clickStyle: ButtonStyle

    onClick?: () => void
}

const renderBackground = (x: number, y: number, width: number, height: number, backgroundColor: colors) => {
    term.setBackgroundColor(backgroundColor)
    for (let i = y; i < y + height; i++) {
        for (let j = x; j < x + width - 1; j++) {
            term.setCursorPos(j, i)
            term.write(' ')
        }
    }
}

const renderText = (x: number, y: number, text: string, color: colors, backgroundColor: colors) => {
    term.setTextColor(color)
    term.setBackgroundColor(backgroundColor)
    term.setCursorPos(x, y)
    term.write(text)
}

const isInButton = (
    clickX: number,
    clickY: number,

    buttonX: number,
    buttonY: number,

    width: number,
    height: number
): boolean => {
    const isInX = clickX >= buttonX && clickX < buttonX + width
    const isInY = clickY >= buttonY && clickY < buttonY + height
    return isInX && isInY
}

export const renderButton = (eventBus: EventBus, props: ButtonProps) => {
    const getRender = (color: colors, backgroundColor: colors) => () => {
        renderBackground(props.x, props.y, props.width, props.height, backgroundColor)

        renderText(props.textX, props.textY, props.text, color, backgroundColor)
    }

    const renderNormal = getRender(props.style.color, props.style.backgroundColor)
    const renderClick = getRender(props.clickStyle.color, props.clickStyle.backgroundColor)

    let isMouseDown = false

    eventBus.subscribe('mouse_click', (mouseButton: number, clickX: number, clickY: number) => {
        if (isInButton(clickX, clickY, props.x, props.y, props.width, props.height)) {
            isMouseDown = true
            renderClick()
            if (props.onClick !== undefined) {
                props.onClick()
            }
        }
    })

    eventBus.subscribe('mouse_up', () => {
        if (isMouseDown) {
            isMouseDown = false
            renderNormal()
        }
    })

    renderNormal()
}
