import React, { useEffect, useState, useRef } from 'react'

interface Props {
    value: number
    duration?: number
}

const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3)

const AnimatedCounter = ({ value, duration = 800 }: Props) => {
    const [displayValue, setDisplayValue] = useState<number>(value)
    const previousValue = useRef<number>(value)
    const animationFrameId = useRef<number | null>(null)

    useEffect(() => {
        if (previousValue.current === value) return

        let startTime: number | null = null
        const startValue = previousValue.current
        const change = value - startValue

        const animateValue = (timestamp: number) => {
            if (startTime === null) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const easedProgress = easeOut(progress)
            const currentValue = startValue + change * easedProgress

            setDisplayValue(Math.round(currentValue))

            if (progress < 1) {
                animationFrameId.current = requestAnimationFrame(animateValue)
            }
        }

        animationFrameId.current = requestAnimationFrame(animateValue)
        previousValue.current = value

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [value, duration])

    return <>{displayValue}</>
}

export default AnimatedCounter
