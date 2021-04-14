import React from 'react'
import s from './tost.module.scss'
import cn from 'classnames'


type Props = {
    type: 'success'| 'error',
    message: {mes: string, when: Date},
}

export const Tost: React.FC<Props> = ({type, message}) => {
    const [show, setShow] = React.useState<boolean>(false)
    const [invisible, setInvisible] = React.useState<boolean>(false)
    React.useEffect(() => {
        setShow(true)
        setTimeout(() => {
            setInvisible(true)
        }, 50)
        setTimeout(() => {
            setShow(false)
            setInvisible(false)
        }, 3000)
    }, [message.when])
    return <>
        {show ? <div className={cn(s.Tost, s[type], {[s.deactivate]: invisible})}>
            <div>{message.when.toLocaleString()}</div>
            <div>{message.mes}</div>
        </div>
        : null}
    </>
}