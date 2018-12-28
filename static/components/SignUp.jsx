import * as React from 'react';
import '../css/main.css'

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';
import $ from 'jquery'

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            dropdownOpenParent: false,
            username: 'Shubh',
            password: '',
            address: '',
            fullName: '',
            contact: '',
            email: '',
            userType: null,
            parentId: 0,
            parentList:[],
        };
    }

    signup = () => {
        const { username, password, address, fullName, contact, email, userType, parentId } = this.state;        
        return (
            $.ajax({
                url: `http://localhost:8000/signup/`,
                type: 'POST',
                data: { username, password, address, fullName, contact, email, userType, parentId },
                success: (response) => {
                    alert("Done")
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!")
                }
            })
        );
    }

    getList = () => {
        return (
            $.ajax({
                url: `http://localhost:8000/userList/`,
                type: 'POST',
                data: { userType: 3 },
                success: (response) => {
                    this.setState({ parentList: response.data})
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!")
                }
            })
        );
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleParent = () => {
        this.setState({
            dropdownOpenParent: !this.state.dropdownOpenParent
        });
    }

    handleDropdownChange = (userType) => {
        this.setState({ userType });
    }

    handleInputChang = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="login-page">
                    <div className="form">
                        <form className="register-form">
                            <ButtonDropdown style={{ padding: '5' }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret size="lg">
                                    user
                                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem onClick={() => this.handleDropdownChange(1)} className="userButton">Teacher</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.handleDropdownChange(2)} className="userButton">Student</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.handleDropdownChange(3)} className="userButton">Parent</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChang} />
                            <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleInputChang} />
                            <input type="text" placeholder="fullname" name="fullName" value={this.state.fullName} onChange={this.handleInputChang} />
                            <input type="text" placeholder="contact" name="contact" value={this.state.contact} onChange={this.handleInputChang} />
                            <input type="text" placeholder="email address" name="email" value={this.state.email} onChange={this.handleInputChang} />
                            <input type="text" placeholder="address" name="address" value={this.state.address} onChange={this.handleInputChang} />
                            {this.state.userType == 2 ?
                                <ButtonDropdown style={{ padding: '5' }} isOpen={this.state.dropdownOpenParent} toggle={this.toggleParent} onClick={this.getList} >
                                    <DropdownToggle caret size="lg">
                                        Parent
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {(this.state.parentList).map((ins) => {                                            
                                            return (
                                                <DropdownItem onClick={() => this.setState({parentId:ins.id})} className="userButton">{ins.fullName}</DropdownItem>
                                            );
                                        })}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                : ""}
                            <Button onClick={this.signup}>create</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}