import * as React from 'react'
import { Card, CardDeck, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';

import $ from 'jquery'
import '../css/main.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

export class Marks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            editMode: false,
            studentId: null,
            marks: null,
            subjectName: '',
            // userType:null
        };
    }

    componentDidMount() {
        $.ajax({
            url: `http://localhost:8000/userList/`,
            type: 'POST',
            data: { userType: 2 },
            success: (response) => {
                this.state.studentList = response;
            },
            error: (request, status, error) => {
                console.log(error);
            }
        })
    }

    getList = () => {
        // const { userType } = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/userList/`,
                type: 'POST',
                data: { userType: 2 },
                success: (response) => {
                    this.setState({ studentList: response })
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!")
                }
            })
        );
    }

    change = () => {

        this.setState({ editMode: true })

    }

    studentId = (id) => {
        this.setState({ studentId: id })
    }

    submit = () => {
        const { semester, subject } = this.state;
        this.setState({ editMode: false })
        return (
            $.ajax({
                url: `http://localhost:8000/add-marks/`,
                type: 'POST',
                data: { semester, subject, studentId },
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

    handleInputChang = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        return (
            <div>
                <CustomNavbar />
                {this.state.editMode ?
                    <div className="login-page" >
                        <div className="form">
                            <form className="login-form">
                                <p className="login-form-head">Add Marks</p>
                                <ButtonDropdown style={{ padding: '15' }} isOpen={this.state.dropdownOpen} toggle={this.toggle} onClick={this.getList}>
                                    <DropdownToggle caret size="lg">
                                        Student
                                </DropdownToggle>
                                    <DropdownMenu>
                                        {(this.state.studentList).map((ins) => {
                                            return (
                                                <DropdownItem onClick={() => this.studentId(ins.id)} className="userButton">{ins.fullName}}</DropdownItem>
                                            );
                                        })}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <input type="text" name="marks" placeholder="marks" value={this.state.marks} onChange={this.handleInputChang} />
                                <input type="text" name="subjectName" placeholder="subject" value={this.state.subjectName} onChange={this.handleInputChang} />
                                <Button onClick={this.submit}>Done</Button>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="login-page">
                        <CardDeck>
                            {(this.state.studentList).map((ins) => {
                                <Card>
                                    <cardHeader>ins.id</cardHeader>
                                    <CardBody>
                                        <CardTitle>{ins.fullName}</CardTitle>
                                        <CardSubtitle>{ins.username}</CardSubtitle>
                                        <CardText>
                                            <p>Email : {ins.email}</p>
                                            <p>Contact : {ins.contact}</p>
                                        </CardText>
                                        <Button onClick={this.change}>Add Marks</Button>
                                    </CardBody>
                                </Card>
                            })}
                        </CardDeck>
                    </div>
                }
            </div>
        );
    }
}
