import React from 'react'
import s from './squareButton.module.scss'

type Props = {
    symble: string | JSX.Element,
    clickHeandler: () => void,
}

export const SquareButton: React.FC<Props> = ({symble, clickHeandler}) => {
    return <div className={s.SquareButton} onClick={clickHeandler}>
        {symble}
    </div>
}