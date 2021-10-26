import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Results } from './Results.jsx'

export const Routes = () => {
    return (
        <div className="p-5">
            <Switch>
                <Route exact path="/">
                    <Redirect to="/search" />
                </Route>
                <Route exact path={['/search', '/images', '/videos', '/news', '/others']} >
                    <Results />
                </Route>
            </Switch>
        </div>
    )
}
