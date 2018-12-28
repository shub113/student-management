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
            semester: null,
        };
    }

    componentDidMount() {
        $.ajax({
            url: `http://localhost:8000/userList/`,
            type: 'POST',
            data: { userType: 2 },
            success: (response) => {
                this.setState({ studentList: response.data });
            },
            error: (request, status, error) => {
                console.log(error);
                alert("Error!!!")
            }
        })
    }

    change = (id) => {
        this.setState({ editMode: true })
        this.setState({ studentId: id })
    }

    submit = () => {
        const { marks, subjectName, studentId, semester } = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/add-marks/`,
                type: 'POST',
                data: { marks, subjectName, studentId, semester },
                success: (response) => {
                    this.setState({ editMode: false });
                    console.log(marks, subjectName, studentId, semester );
                    alert("Done");
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!");
                }
            })
        );
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
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
                                <input type="text" name="marks" placeholder="marks" value={this.state.marks} onChange={this.handleInputChange} />
                                <input type="text" name="subjectName" placeholder="subject" value={this.state.subjectName} onChange={this.handleInputChange} />
                                <input type="text" name="semester" placeholder="semester" value={this.state.semester} onChange={this.handleInputChange} />
                                <Button onClick={this.submit}>Done</Button>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="login-page">
                        <CardDeck>
                            {(this.state.studentList).map((ins) => {
                                return (
                                    <Card>
                                        <cardHeader>{ins.id}</cardHeader>
                                        <CardBody>
                                            <CardTitle>{ins.fullName}</CardTitle>
                                            <CardSubtitle>{ins.username}</CardSubtitle>
                                            <CardText>
                                                <p>Email : {ins.email}</p>
                                                <p>Contact : {ins.contact}</p>
                                            </CardText>
                                            <Button onClick={()=>this.change(ins.id)}>Add Marks</Button>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </CardDeck>
                    </div>
                }
            </div>
        );
    }
}
