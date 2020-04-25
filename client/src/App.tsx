import React, { Component } from 'react'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './views/Home/Home'
import Room from './views/Room/Room'

import { setIsTouchDevice } from './redux/actions/main'

interface Props { }

interface State { }

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        setIsTouchDevice()
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/room" exact>
                        <Room />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App