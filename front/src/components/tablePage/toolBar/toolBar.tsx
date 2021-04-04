import React from 'react'
import s from './toolBar.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'


export const ToolBar = () => {
    return <div className={s.ToolBar}>
        <SquareButton symble="+" clickHeandler={() => null} />
        <div className={s.space} />
        <SquareButton symble="A" clickHeandler={() => null} />
        <div className={s.space} />
        <SquareButton symble="a" clickHeandler={() => null} />
        <div className={s.space} />
        <SquareButton symble="A" clickHeandler={() => null} />
        <div className={s.space} />
        <SquareButton symble="a" clickHeandler={() => null} />
    </div>
}
