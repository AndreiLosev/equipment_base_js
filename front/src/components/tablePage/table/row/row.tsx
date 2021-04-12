import React from 'react'
import s from './row.module.scss'
import {HeaderCell, SearchCell, OtherCell} from '../../../elements/cell/cell'
import{TableUtils} from '../../../../lib/table_utils'
import {TableActtion} from '../../../../stateSlices/tableState'
import {useAppDispatch, useAppSelector} from '../../../../app/hooks'
import cn from 'classnames'


type Props = {
    type: 'header' | 'search' | 'other',
    row: string,
    text: string[],
    columns: {
        width: number,
        visible: boolean,
        mask: string,
    }[],
    backgroundColor: string;
}

export const Row: React.FC<Props> = ({type, row, text, columns, backgroundColor}) => {
    const {selected_row, edit_row} = useAppSelector(state => state.tableState)
    const dispatch = useAppDispatch()
    let bacgColor = (() => {
        if (selected_row === row) return '#fed'
        else if (edit_row === row) return  '#fff'
        else return backgroundColor 
    })()
    return <div className={cn(s.Row)} style={{backgroundColor: bacgColor}}
        onClick={() => {
            if (edit_row === '')
                if (row !== 'header' && row !== 'search')
                    dispatch(TableActtion.slect_row(row))
        }}>
        {type === 'header'
            ? TableUtils.column_width(columns).map((item, i) =>
                <HeaderCell
                    value={text[i]} width={item.width} key={i}
                    visible={item.visible}
                />)
            : null}
        {type === 'search'
            ? TableUtils.column_width(columns).map((item, i) =>
                <SearchCell 
                    value={text[i]} width={item.width} key={i}
                    visible={item.visible} mask={item.mask}
                    heandler={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        dispatch(TableActtion.set_value({row, column: i, value: e.target.value}))
                    }}
                />)
            : null}
        {type === 'other'
            ? TableUtils.column_width(columns).map((item, i) =>
                <OtherCell 
                    value={text[i]} width={item.width} key={i}
                    visible={item.visible} mask={item.mask} active={edit_row === row}
                    heandler={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        dispatch(TableActtion.set_value({row, column: i, value: e.target.value}))
                    }}
                />)
            : null}
    </div>
}

