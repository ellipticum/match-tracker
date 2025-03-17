import styles from './styles.module.scss'

interface Props {
    size?: number
}

const Loader = ({ size }: Props) => {
    const props: { [key: string]: any } = {
        className: styles.loader
    }

    if (size) {
        props.style = { width: size, height: size, borderWidth: Math.round(size / 10) }
    }

    return <div {...props} />
}

export default Loader
