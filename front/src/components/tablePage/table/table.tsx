import React from 'react'
import s from './table.module.scss'
import {Row} from './row/row'
import {useAppSelector} from '../../../app/hooks'

export const Table = () => {
    const {rows_height, text, columns} = useAppSelector(state => state.tableState)
    return <div className={s.Table}>
        <Row type="header" row_number={0} text={text[0]} columns={columns} rows_height={rows_height[0]}/>
        <Row type="search" row_number={1} text={text[1]} columns={columns} rows_height={rows_height[1]}/>
    </div>
}