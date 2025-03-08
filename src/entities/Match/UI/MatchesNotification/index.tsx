import React from 'react'
import styles from './styles.module.scss'
import { Icons } from '@/shared/UI/Icons'
import classNames from 'classnames'
import { motion } from 'framer-motion'

interface Props {
    isHidden: boolean
}

const MatchesNotification = ({ isHidden }: Props) => {
    const animationVariants = {
        hidden: {
            y: -100,
            opacity: 0,
            scale: 0.8
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                mass: 0.8,
                bounce: 0.4
            }
        },
        exit: {
            y: -50,
            opacity: 0,
            scale: 0.85,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 25,
                duration: 0.2
            }
        }
    }

    return (
        <motion.div
            className={styles.matchesNotification}
            variants={animationVariants}
            initial='hidden'
            animate={isHidden ? 'hidden' : 'visible'}
            exit='exit'
        >
            <Icons.Alert />
            <span>Ошибка: не удалось загрузить информацию</span>
        </motion.div>
    )
}

export default MatchesNotification
