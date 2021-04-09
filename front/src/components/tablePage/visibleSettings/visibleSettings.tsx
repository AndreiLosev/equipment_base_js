import React from 'react'
import s from './visibleSettings.module.scss'
import {useAppSelector, useAppDispatch} from '../../../app/hooks'
import {TableActtion} from '../../../stateSlices/tableState'


export const VisibleSettings = () => {
    const {columns, text:{header}} = useAppSelector(state => state.tableState)
    const dispatch = useAppDispatch()
    const heandler = (i: number) => dispatch(TableActtion.set_column_visible({
                column: i,
                visible: !columns[i].visible,
            }))
    return <div className={s.VisibleSettings}>
        <div className={s.title}>Видимость столбцов</div>
        <div className={s.content}>
            {header.map((item, i) => <div className={s.item} key={item} onClick={() => heandler(i)}>
                <div className={s.name}>{item}</div>
                <input type="checkbox" 
                    checked={columns[i].visible}
                    onChange={() => heandler(i)}
                />
            </div>)}
        </div>
    </div>
}