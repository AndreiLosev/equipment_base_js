import React from 'react'
import s from './squareButton.module.scss'
import Tippy from '@tippyjs/react'
import cn from 'classnames'

type Props = {
    symble: string | JSX.Element,
    clickHeandler: () => void,
    tip?: string,
    disabled?: boolean
}

export const SquareButton: React.FC<Props> = ({symble, tip, disabled, clickHeandler}) => {
    return <Tippy content={tip} className={tip ? s.Tippy: ''} > 
        <div className={cn(s.SquareButton, {[s.b_active]: !disabled}, {[s.b_disabled]: disabled})} 
            onClick={disabled ? () => null : clickHeandler}>
            {symble}
        </div>
    </Tippy>
}