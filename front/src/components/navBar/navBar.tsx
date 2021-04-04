import React from 'react'
import cn from 'classnames'
import s from './navBar.module.scss'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {NavActtion} from '../../stateSlices/navigations'



export const NavBar: React.FC = () => {
    const nav = useAppSelector(state => state.navigation)
    const dispatch = useAppDispatch()
    const data = {
        table: "Таблица",
        doc: "Документ",
        card: "Карточка",
        log: "logs",
    }
    const keys = Object.keys(data) as (keyof typeof data)[]
    return <nav className={s.NavBar}>
        {keys.map(key => <div key={key}
            className={cn(s.tabItem, {[s.tabItem_active]: nav[key]})}
            onClick={() => dispatch(NavActtion.goTo(key))}>
                {data[key]}
        </div>)}
    </nav>
}