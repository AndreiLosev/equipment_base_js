import React from 'react'
import s from './table.module.scss'
import {Row} from './row/row'
import {useAppSelector} from '../../../app/hooks'

export const Table = () => {
    const {text, columns} = useAppSelector(state => state.tableState)
    const rows = Object.keys(text).filter(i => !(i === 'header' || i === 'search'))
    return <div className={s.Table}>
        <Row
            type="header" row={'header'} text={text['header']}
            columns={columns} backgroundColor={'#19aa8d'}
        />
        <Row
            type="search" row={'search'} text={text['search']}
            columns={columns.map(i => ({
                ...i,
                mask: !(i.mask === '' || i.mask === '[К|П|А]') ? `[<|=|>] ${i.mask}` : i.mask,
            }))}
            backgroundColor={'#fff'}
        />
        {rows.map(item => <Row key={item}
            type="other" row={item} text={text[item]}
            columns={columns} backgroundColor={'#cde'}
        />)}
    </div>
}