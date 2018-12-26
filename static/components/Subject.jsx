import * as React from 'react'
import '../css/main.css'

import $ from 'jquery'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';

export class Subject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            teacherList: [],
            // userType: null,
            semester: null,
            subject: '',
            teacherId: null
        };
    }

    componentDidMount() {
        this.getList()
    }
    getList = () => {
        // const { userType } = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/userList/`,
                type: 'POST',
                data: { userType: 1 },
                success: (response) => {
                    this.setState({ teacherList: response.data})
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!")
                }
            })
        );
    }

    submit = () => {
        const { semester, subject, teacherId } = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/teacher-mapping/`,
                type: 'POST',
                data: { semester, subject, teacherId },
                success: (response) => {
                    console.log("Done");
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!");
                }
            })
        );
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleInputChang = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    teacherId = (id) => {
        this.setState({ teacherId: id })
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="login-page" >
                    <div className="form">
                        <form className="login-form">
                            <p className="login-form-head">Subject Teacher</p>
                            <ButtonDropdown style={{ padding: '15' }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret size="lg">
                                    Teacher
                                </DropdownToggle>
                                <DropdownMenu>
                                    {(this.state.teacherList).map((ins) => {
                                        return (
                                            <DropdownItem onClick={() => this.teacherId(ins.id)} className="userButton">{ins.fullName}</DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <input type="text" name="semester" placeholder="semester [0-8]" value={this.state.semester} onChange={this.handleInputChang} />
                            <input type="text" name="subject" placeholder="subject" value={this.state.subject} onChange={this.handleInputChang} />
                            <Button onClick={this.submit}>Done</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
