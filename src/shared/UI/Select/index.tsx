import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { Icons } from '../Icons'

interface IOption {
    name: string
    value: any
}

interface Props {
    value: any
    options: IOption[]
    onSelect: (value: any) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

const Select = ({
    value,
    options,
    onSelect,
    placeholder = 'Выберите...',
    disabled = false,
    className = ''
}: Props) => {
    const [isHidden, setIsHidden] = useState(true)
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((option) => option.value === value) ||
        options.find((option) => option.value === null) || { name: placeholder, value: null }

    const handleOptionClick = (option: IOption) => {
        onSelect(option.value)
        setIsHidden(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsHidden(true)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return

        if (event.key === 'Enter' || event.key === ' ') {
            setIsHidden((prev) => !prev)
            event.preventDefault()
        } else if (event.key === 'Escape') {
            setIsHidden(true)
        } else if (event.key === 'ArrowDown' && !isHidden) {
            const currentIndex = options.findIndex((option) => option.value === value)
            const nextIndex = (currentIndex + 1) % options.length
            onSelect(options[nextIndex].value)
        } else if (event.key === 'ArrowUp' && !isHidden) {
            const currentIndex = options.findIndex((option) => option.value === value)
            const prevIndex = (currentIndex - 1 + options.length) % options.length
            onSelect(options[prevIndex].value)
        }
    }

    return (
        <div
            ref={selectRef}
            className={classNames(styles.select, className, { [styles.disabled]: disabled })}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={onKeyDown}
        >
            <div
                className={classNames(styles.option, styles.default)}
                onClick={() => !disabled && setIsHidden((prev) => !prev)}
            >
                <span>{selectedOption.name}</span>
                <button
                    className={classNames(styles.expandButton, { [styles.rotated]: !isHidden })}
                >
                    <Icons.ExpandTriangle />
                </button>
            </div>

            {!isHidden && !disabled && (
                <div className={styles.options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={classNames(styles.option, {
                                [styles.selected]: option.value === value
                            })}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Select
