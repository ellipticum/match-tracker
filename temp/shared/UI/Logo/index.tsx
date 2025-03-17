import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'

const Logo = () => {
    return (
        <Image
            className={styles.logo}
            src='/images/vector/logo.svg'
            alt='_'
            width={256}
            height={32}
        />
    )
}

export default Logo
