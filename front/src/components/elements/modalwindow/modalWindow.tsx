import React from 'react'
import s from './modalWindow.module.scss'
import cn from 'classnames'

type Props<T> = {
    visible: boolean,
    closeHeandler: () => void,
    childrensProps: T,
    children: React.FC<T>
}

export const ModalWindow = <T, >(props: React.PropsWithChildren<Props<T>>) => {
    return <>
        {props.visible ? <div className={cn(s.ModalWindow)}>
            <div className={s.closeButton} onClick={props.closeHeandler}>
                &#10006;
            </div>
            <div className={s.content}>
                <props.children {...props.childrensProps} />
            </div>
        </div> : null}
    </>
}

// props: React.PropsWithChildren<Props<T>>