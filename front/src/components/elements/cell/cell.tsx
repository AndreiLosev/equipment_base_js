import React from 'react'
import s from './cell.module.scss'
import cn from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'


type HeaderCellProps = {
    value: string,
    width: number,
    visible: boolean,
}

type SearchCellProps = HeaderCellProps & {
    heandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const HeaderCell: React.FC<HeaderCellProps> = ({value, width, visible}) => {
    return <> 
        {visible ? <div className={s.HeaderCell} style={{width: `${width}%`}}>
            {value}
        </div> : null}
    </>
}

export const SearchCell: React.FC<SearchCellProps> = ({value, width, visible, heandler}) => {
    return <>
        {visible ? <div className={cn(s.SearchCell)} style={{width: `${width}%`}}>
            <TextareaAutosize
                className={s.Cell_value}
                onChange={heandler} value={value} />
        </div> : null}
    </>
}
