import React from 'react'
import s from './tablePage.module.scss'
import {ToolBar} from './toolBar/toolBar'
import {Table} from './table/table'
import {ModalWindow} from '../elements/modalwindow/modalWindow'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {TableActtion} from '../../stateSlices/tableState'
import {VisibleSettings} from './visibleSettings/visibleSettings'

export const TablePage = () => {
    const {visible_settings_show} = useAppSelector(state => state.tableState)
    const dispatch = useAppDispatch()
    return <div className={s.TablePage}>
        <ModalWindow visible={visible_settings_show}
            closeHeandler={() => dispatch(TableActtion.show_visible_settings(false))}
            children={VisibleSettings} childrensProps={{}}
        />
        <ToolBar />
        <Table />
    </div>
}
