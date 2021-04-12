import React from 'react'
import s from './createNewTable.module.scss'
import {SquareButton} from '../../elements/squareButton/squareButton'


type Props = {
    createNewTable: (tableName: string) => void
}

export const CreateNewTable: React.FC<Props> = ({createNewTable}) => {
    const [tableName, setTableName] = React.useState('')
    return <div className={s.CreateNewTable}>
        <input type="text" className={s.tableName} value={tableName}
            onChange={e => setTableName(e.target.value)}
        />
        <SquareButton symble="+" clickHeandler={() => createNewTable(tableName)} />
    </div>
}