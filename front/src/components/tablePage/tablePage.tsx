import React from 'react'
import s from './tablePage.module.scss'
import {ToolBar} from './toolBar/toolBar'
import {Table} from './table/table'
import {ModalWindow} from '../elements/modalwindow/modalWindow'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {TableActtion, VISIBLE_KEY} from '../../stateSlices/tableState'
import {VisibleSettings} from './visibleSettings/visibleSettings'
import {CreateNewTable} from './createNewTable/createNewTable'

export const TablePage = () => {
    const {visible_settings_show, visible_new_table_window} = useAppSelector(state => state.tableState)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        const visible = localStorage.getItem(VISIBLE_KEY)
        if (visible) {
            (JSON.parse(visible) as boolean[]).forEach((item, i) => {
                dispatch(TableActtion.set_column_visible({column: i, visible: item}))
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div className={s.TablePage}>
        <ModalWindow visible={visible_settings_show}
            closeHeandler={() => dispatch(TableActtion.show_window(
                {fild_name: 'visible_settings_show', visible: false}
            ))}
            children={VisibleSettings} childrensProps={{}}
        />
        <ModalWindow visible={visible_new_table_window}
            closeHeandler={() => dispatch(TableActtion.show_window(
                {fild_name: 'visible_new_table_window', visible: false}
            ))}
            children={CreateNewTable} childrensProps={{}}
        />
        <ToolBar />
        <Table />
    </div>
}
