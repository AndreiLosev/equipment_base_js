import React from 'react'
import s from './tablePage.module.scss'
import {ToolBar} from './toolBar/toolBar'
import {Table} from './table/table'


export const TablePage = () => {
    return <div className={s.TablePage}>
        <ToolBar />
        <Table />
    </div>
}
