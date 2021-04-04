import React from 'react'
import s from './cell.module.scss'


type HeaderCellProps = {
    value: string,
    width: number,
    visible: boolean,
    height: number,
}

type SearchCellProps = HeaderCellProps & {
    heandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const HeaderCell: React.FC<HeaderCellProps> = ({value, width, visible}) => {
    return <> 
        {visible ? <div className={s.HeaderCell} style={{width: `${width}%`}}>
            {value}
        </div> : null}
    </>
}

export const SearchCell: React.FC<SearchCellProps> = ({value, width, visible, height, heandler}) => {
    return <>
        {visible ? <div className={s.SearchCell} style={{width: `${width}%`}}>
            <textarea
                className={s.Cell_value} style={{height: height * 17}}
                onChange={heandler} value={value}/>
        </div> : null}
    </>
}
