import React from 'react';
import './App.css';
import {NavBar} from './components/navBar/navBar'
import {useAppSelector} from './app/hooks'

const App = () => {
	const nav = useAppSelector(state => state.navigation)
	return (
		<div className="App">
			<NavBar />
			{nav.table ? <div>Table</div> : null}
			{nav.doc ? <div>Document</div> : null}
			{nav.card ? <div>Card</div> : null}
			{nav.log ? <div>loging</div> : null}
		</div>
	)
}

export default App;
