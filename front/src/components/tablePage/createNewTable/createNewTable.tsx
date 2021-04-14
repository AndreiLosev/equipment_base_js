import React from 'react'
import s from './createNewTable.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'
import {TableActtion} from '../../../stateSlices/tableState'
import {useAppDispatch} from '../../../app/hooks'

export const CreateNewTable: React.FC<{}> = () => {
    const [tableName, setTableName] = React.useState('')
    const dispatch = useAppDispatch()
    return <div className={s.CreateNewTable}>
        <div className={s.title}>Название новой таблицы</div>
        <div className={s.content}>
            <input type="text" className={s.tableName}
                placeholder="допустимые символы aA-zZ0-9_"
                value={tableName} 
                onChange={e => setTableName(oldSstring => {
                    let newSring = e.target.value
                    const reg = /^[A-Z0-9_]*$/i
                    return reg.test(newSring) ? newSring : oldSstring
                })}
            />
            <SquareButton symble="+" tip="Создать таблицу"
                clickHeandler={() => {
                    dispatch(TableActtion.create_table(tableName))
                    dispatch(TableActtion.show_window(
                        {fild_name: 'visible_new_table_window', visible: false},
                    ))
                }}
            />
        </div>
    </div>
}