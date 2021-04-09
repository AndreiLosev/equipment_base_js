import React from 'react'
import s from './toolBar.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'
import {useAppDispatch} from '../../../app/hooks'
import {TableActtion} from '../../../stateSlices/tableState'

export const ToolBar = () => {
    const fileInput = React.useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    return <div className={s.ToolBar}>
        <SquareButton symble="+" clickHeandler={() => null} tip="Добавить строку"/>
        <div className={s.space} />
        <SquareButton symble="&#128396;" clickHeandler={() => null} tip="Редактировать строку"/>
        <div className={s.space} />
        <SquareButton symble="&#128190;" clickHeandler={() => null} tip="Сохранить"/>
        <div className={s.space} />
        <SquareButton symble="&#128465;" clickHeandler={() => null} tip="Удалить"/>
        <div className={s.space} />
        <SquareButton symble="&#128270;" clickHeandler={() => null} tip="Поиск"/>
        <div className={s.space}/>
        <SquareButton symble="&#402;" clickHeandler={() => {
            if (fileInput.current instanceof HTMLInputElement)
                fileInput.current.click()
        }} tip="загрузить csv"/>
        <input type="file" style={{display: 'none'}} ref={fileInput}/>
        <div className={s.space} />
        <SquareButton
            symble="&#128736;" tip="настройки"
            clickHeandler={() => dispatch(TableActtion.show_visible_settings(true))}
        />
    </div>
}
