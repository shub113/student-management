import * as React from 'react'
import '../css/main.css'

import $ from 'jquery'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router'

const typePathMapping = [
    { 0: 'admin ' },
    { 1: 'teacher' },
    { 2: 'student' },
    { 3: 'parent' }
]

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            logedIn: false,
            path: ""
        };
    }

    login = () => {
        const { username, password } = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/loginUser/`,
                type: 'POST',
                data: { uname: username, password },
                success: (response) => {
                    typePathMapping.map((ins) => {
                        const keys = Object.keys(ins)[0]
                        if (keys == response.userType) {
                            this.setState({ logedIn: true, path: ins[keys] })
                        }
                    });
                },
                error: (request, status, error) => {
                    console.log(error);
                }
            })
        );
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="login-page" >
                {this.state.logedIn ? <Redirect to={`/${this.state.path}`} /> : ""}
                <div className="form">
                    <form className="login-form">
                        <p className="login-form-head">Student Management</p>
                        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange} />
                        <Button onClick={this.login}>login</Button>
                    </form>
                </div>
            </div>
        );
    }
}
