import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx'

export class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route path="/admin" component={SignUp} />
                </Switch>
            </HashRouter>
        );
    }
}

ReactDom.render(<Index />, document.getElementById('root'))
