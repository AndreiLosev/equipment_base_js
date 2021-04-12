import React from 'react'
import s from './spiner.module.scss'
import spiner from './spiner.webp'

type Props = {
    visble: boolean,
}

export const Spiner: React.FC<Props> = ({visble}) => {
    return <>
        {visble ? <img src={spiner} alt="spiner" className={s.Spiner}/> : null}
    </>
}