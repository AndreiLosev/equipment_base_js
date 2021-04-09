import React from 'react';
import './App.css';
import {NavBar} from './components/navBar/navBar'
import {useAppSelector} from './app/hooks'
import {TablePage} from './components/tablePage/tablePage'

const App = () => {
	const {navigation} = useAppSelector(state => state)
	return (
		<div className="App">
			<NavBar />
			{navigation.table ? <TablePage /> : null}
			{navigation.doc ? <div>Document</div> : null}
			{navigation.card ? <div>Card</div> : null}
			{navigation.log ? <div>loging</div> : null}
		</div>
	)
}

export default App;
