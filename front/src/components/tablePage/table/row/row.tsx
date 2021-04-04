import React from 'react'
import s from './row.module.scss'
import {HeaderCell, SearchCell} from '../../../elements/cell/cell'
import{TableUtils} from '../../../../lib/table_utils'
import {TableActtion} from '../../../../stateSlices/tableState'
import {useAppDispatch} from '../../../../app/hooks'


type Props = {
    type: 'header' | 'search' | 'other',
    row_number: number,
    text: string[],
    columns: {
        width: number,
        visible: boolean,
    }[],
    rows_height: number,
}

export const Row: React.FC<Props> = ({type, row_number, text, columns, rows_height}) => {
    const dispatch = useAppDispatch()
    return <div className={s.Row}>
        {type === 'header'
            ? TableUtils.column_width(columns).map((item, i) =>
                <HeaderCell
                    value={text[i]} width={item.width} key={`${row_number} ${i}`}
                    visible={item.visible} height={rows_height}
                />)
            : null}
        {type === 'search'
            ? TableUtils.column_width(columns).map((item, i) =>
                <SearchCell 
                    value={text[i]} width={item.width} key={`${row_number} ${i}`}
                    visible={item.visible} height={rows_height} 
                    heandler={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        dispatch(TableActtion.change_cell(e.target.value, row_number, i))}
                />)
            : null}
    </div>
}

