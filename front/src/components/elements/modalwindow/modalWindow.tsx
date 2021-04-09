import React from 'react'
import s from './modalWindow.module.scss'
import cn from 'classnames'

type Props<T> = {
    visible: boolean,
    closeHeandler: () => void,
    childrensProps: T,
    children: (props: {props: T}) => JSX.Element
}

export const ModalWindow = <T,>(props: React.PropsWithChildren<Props<T>>) => {
    return <>
        {props.visible ? <div className={cn(s.ModalWindow)}>
            <div className={s.closeButton} onClick={props.closeHeandler}>
                &#65794;
            </div>
            <div className={s.content}>
                <props.children props={props.childrensProps} />
            </div>
        </div> : null}
    </>
}