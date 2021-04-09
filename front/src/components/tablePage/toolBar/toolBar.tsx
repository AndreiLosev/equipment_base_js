import React from 'react'
import s from './toolBar.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'
import {useAppDispatch} from '../../../app/hooks'
import {TableActtion} from '../../../stateSlices/tableState'

export const ToolBar = () => {
    const loadTable = React.useRef<HTMLInputElement>(null)
    const loadScan = React.useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    return <div className={s.ToolBar}>
        <SquareButton symble="+" tip="Добавить строку"
            clickHeandler={() => dispatch(TableActtion.add_row())}
        />
        <div className={s.space} />
        <SquareButton symble="&#128396;" clickHeandler={() => null} tip="Редактировать строку"/>
        <div className={s.space} />
        <SquareButton symble="&#128190;" clickHeandler={() => null} tip="Сохранить"/>
        <div className={s.space} />
        <SquareButton symble="&#128465;" clickHeandler={() => null} tip="Удалить"/>
        <div className={s.space} />
        <SquareButton symble="&#402;" clickHeandler={() => {
            if (loadTable.current instanceof HTMLInputElement)
                loadTable.current.click()
        }} tip="загрузить csv"/>
        <input type="file" style={{display: 'none'}} ref={loadTable}/>
        <div className={s.space} />
        <SquareButton
            symble="&#128736;" tip="настройки"
            clickHeandler={() => dispatch(TableActtion.show_visible_settings(true))}
        />
                <div className={s.space}/>
        <SquareButton symble="&#10549;" clickHeandler={() => {
            if (loadScan.current instanceof HTMLInputElement)
                loadScan.current.click()
        }} tip="загрузить скан"/>
        <input type="file" style={{display: 'none'}} ref={loadScan}/>
        <div className={s.space}/>
        <SquareButton symble="&#8801;" clickHeandler={() => null} tip="Создать карточку"/>
    </div>
}
