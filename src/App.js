import React from 'react'
import Landing from './components/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transaction from './components/Transaction';


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />}></Route>
                <Route path='/tracker' element = {<Transaction />}></Route>
            </Routes>
            
        </Router>
    )
}


export default App;