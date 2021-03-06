import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx'
import { Subject } from './Subject.jsx'
import { Marks } from './Marks.jsx';
import { Attendance } from './Attendance.jsx';
import { ShowMarks } from './ShowMarks.jsx';
import { ShowChilds } from './ShowChilds.jsx';
import { Redirect } from 'react-router';

const ProtectedRoute = ({path, component}) => {
    const userType = localStorage.getItem('userType');
    if(userType){
        return <Route exact={false} path={path} component={component} />
    }else{
        return <Redirect to="/" />
    }
}
export class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <ProtectedRoute path="/admin" component={SignUp} />
                    <ProtectedRoute path="/user-managemt" component={SignUp} />
                    <ProtectedRoute path="/subject-managemt" component={Subject} />
                    <ProtectedRoute path="/marks-managemt" component={Marks} />
                    <ProtectedRoute path="/teacher" component={Marks} />
                    <ProtectedRoute path="/attendance-managemt" component={Attendance} />
                    <ProtectedRoute path="/marks" component={ShowMarks} />
                    <ProtectedRoute path="/student" component={ShowMarks} />
                    <ProtectedRoute path="/parent" component={ShowChilds} />
                    <ProtectedRoute path="/childs" component={ShowChilds} />
                </Switch>
            </HashRouter>
        );
    }
}

ReactDom.render(<Index />, document.getElementById('root'))
