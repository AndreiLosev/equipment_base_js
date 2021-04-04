import React from 'react'
import s from './row.module.scss'
import {HeaderCell, SearchCell} from '../../../elements/cell/cell'
import{TableUtils} from '../../../../lib/table_utils'


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
    return <div className={s.Row}>
        {type === 'header'
            ? TableUtils.column_width(columns).map((item, i) =>
                <HeaderCell value={text[i]} width={item.width} visible={item.visible} height={rows_height}/>)
            : null}
        {type === 'search'
            ? TableUtils.column_width(columns).map((item, i) =>
                <SearchCell value={text[i]} width={item.width} visible={item.visible} height={rows_height}/>)
            : null}
    </div>
}

