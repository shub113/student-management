import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx'
import { Subject } from './Subject.jsx'
import { Marks } from './Marks.jsx';
import { Attendance } from './Attendance.jsx';
import { ShowAttendance } from './ShowAttendance.jsx';

export class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route path="/admin" component={SignUp} />
                    <Route path="/user-managemt" component={SignUp} />
                    <Route path="/subject-managemt" component={Subject} />
                    <Route path="/marks-managemt" component={Marks} />
                    <Route path="/teacher" component={Marks} />
                    <Route path="/attendence-managemt" component={Attendance} />
                    <Route path="/attendance" component={ShowAttendance} />

                </Switch>
            </HashRouter>
        );
    }
}

ReactDom.render(<Index />, document.getElementById('root'))
