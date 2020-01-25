import React from 'react';
import styles from './App.module.scss';
import Home from './page/home'
import Logo from './image/Logo.svg'
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NoMatch from "./page/noMatch";

function App() {
    return (
        <div>
            <header className={styles.header}>
                <img src={Logo} className={styles.logo}/>
            </header>

            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
