import React from 'react'
import s from './squareButton.module.scss'
import Tippy from '@tippyjs/react';

type Props = {
    symble: string | JSX.Element,
    clickHeandler: () => void,
    tip?: string,
}

export const SquareButton: React.FC<Props> = ({symble, tip, clickHeandler}) => {
    return <Tippy content={tip} className={tip ? s.Tippy: ''} > 
        <div className={s.SquareButton} onClick={clickHeandler} data-tooltip={tip}>
            {symble}
        </div>
    </Tippy>
}