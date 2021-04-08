import React from 'react'
import s from './toolBar.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'


export const ToolBar = () => {
    return <div className={s.ToolBar}>
        <SquareButton symble="+" clickHeandler={() => null} tip="Добавить строку"/>
        <div className={s.space} />
        <SquareButton symble="A" clickHeandler={() => null} tip="Редактировать строку"/>
        <div className={s.space} />
        <SquareButton symble="a" clickHeandler={() => null} tip="Сохранить"/>
        <div className={s.space} />
        <SquareButton symble="A" clickHeandler={() => null} tip="Поиск"/>
        <div className={s.space} />
        <SquareButton symble="a" clickHeandler={() => null} />
    </div>
}
