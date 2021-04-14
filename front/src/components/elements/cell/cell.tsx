import React from 'react'
import s from './cell.module.scss'
import cn from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import Inputmask from "inputmask"


type HeaderCellProps = {
    value: string,
    width: number,
    visible: boolean,
}

type SearchCellProps = HeaderCellProps & {
    heandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    mask: string,
    active: boolean,
}

type OtherCellProps = SearchCellProps & {
}

export const HeaderCell: React.FC<HeaderCellProps> = ({value, width, visible}) => {
    return <> 
        {visible ? <div className={s.HeaderCell} style={{width: `${width}%`}}>
            {value}
        </div> : null}
    </>
}

export const SearchCell: React.FC<SearchCellProps> = ({value, width, visible, mask, active, heandler}) => {
    const ref_for_mask = React.useRef<HTMLTextAreaElement>(null)
    React.useEffect(() => {
        const input_mask = new Inputmask(mask)
        if (ref_for_mask.current instanceof HTMLTextAreaElement)
            input_mask.mask(ref_for_mask.current)
    }, [ref_for_mask, mask])
    return <>
        {visible ? <div className={cn(s.SearchCell)} style={{width: `${width}%`}}>
            <TextareaAutosize readOnly={!active}
                className={cn(s.Cell_value, {[s.readOnly]: !active})} ref={ref_for_mask}
                onChange={heandler} value={value} />
        </div> : null}
    </>
}

export const OtherCell: React.FC<OtherCellProps> = ({value, width, visible, mask, active, heandler}) => {
    const ref_for_mask = React.useRef<HTMLTextAreaElement>(null)
    React.useEffect(() => {
        const input_mask = new Inputmask(mask)
        if (ref_for_mask.current instanceof HTMLTextAreaElement)
            input_mask.mask(ref_for_mask.current)
    }, [ref_for_mask, mask])
    return <>
        {visible ? <div className={cn(s.SearchCell)} style={{width: `${width}%`}}>
            <TextareaAutosize readOnly={!active}
                className={cn(s.Cell_value, {[s.readOnly]: !active})} ref={ref_for_mask}
                onChange={heandler} value={value}
            />
        </div> : null}
    </>
}

