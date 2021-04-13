import React from 'react'
import s from './toolBar.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {TableActtion} from '../../../stateSlices/tableState'

export const ToolBar = () => {
    const loadTable = React.useRef<HTMLInputElement>(null)
    const loadScan = React.useRef<HTMLInputElement>(null)
    const {toolbar_disabled, tables} = useAppSelector(state => state.tableState)
    const dispatch = useAppDispatch()
    return <div className={s.ToolBar}>
        <SquareButton symble="+" tip="Добавить строку" disabled={toolbar_disabled}
            clickHeandler={() => dispatch(TableActtion.add_row())}
        />
        <div className={s.space} />

        <SquareButton symble="&#128396;" clickHeandler={() => null}
            tip="Редактировать строку" disabled={toolbar_disabled}
        />
        <div className={s.space} />

        <SquareButton symble="&#8635;" clickHeandler={() => dispatch(TableActtion.undo_changes())}
            tip="отменить изменения"
        />
        <div className={s.space} />

        <SquareButton symble="&#128190;"
            clickHeandler={() => null} tip="Сохранить"/>
        <div className={s.space} />

        <SquareButton symble="&#128465;" clickHeandler={() => null}
            tip="Удалить"  disabled={toolbar_disabled}/>
        <div className={s.space} />

        <SquareButton symble="&#402;" clickHeandler={() => {
            if (loadTable.current instanceof HTMLInputElement)
                loadTable.current.click()
        }} tip="загрузить csv"  disabled={toolbar_disabled} />
        <input type="file" style={{display: 'none'}} ref={loadTable}/>
        <div className={s.space} />

        <SquareButton
            symble="&#128736;" tip="настройки"
            clickHeandler={() => dispatch(TableActtion.show_window(
                {fild_name: 'visible_settings_show', visible: true},
            ))}
        />
        <div className={s.space}/>

        <SquareButton symble="&#10549;" clickHeandler={() => {
            if (loadScan.current instanceof HTMLInputElement)
                loadScan.current.click()
        }} tip="загрузить скан"  disabled={toolbar_disabled} />
        <input type="file" style={{display: 'none'}} ref={loadScan}/>
        <div className={s.space}/>

        <SquareButton symble="&#8801;" clickHeandler={() => null}
            tip="Создать карточку" disabled={toolbar_disabled}
        />
        <div className={s.space} />

        <SquareButton symble="T" clickHeandler={() => dispatch(TableActtion.show_window(
            {fild_name: 'visible_new_table_window', visible: true},
        ))} tip="Создать таблицу" disabled={toolbar_disabled} />
        <div className={s.space} />
        <SquareButton symble="&#128270;" clickHeandler={() => null}
            tip="Поиск" disabled={toolbar_disabled}
        />
        <div className={s.space} />
        <select value={tables.selected} className={s.select_table}
            onChange={e => dispatch(TableActtion.select_table(e.target.value))}>
            {tables.all.map(i => <option value={i}>{i}</option>)}
        </select>
    </div>
}
