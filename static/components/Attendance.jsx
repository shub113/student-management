import * as React from 'react'
import { Table, Button } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';
import $ from 'jquery'

export class Attendance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            studentId: null,
            date: null,
            isPresent: 0,
            isPresentMarked: []
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

    submit = () => {
        const { studentId, date, isPresent } = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/`,
                type: 'POST',
                data: { studentId, date, isPresent },
                success: (response) => {
                },
                error: (request, status, error) => {
                    console.log(error);
                    alert("Error!!!")
                }
            })
        );
    }

    handleChange = (e, id, index) => {
        console.log(this.state.date);
        const isMarked = this.state.isPresentMarked;
        if (e.target.checked) {
            isMarked.push({id, index}) // [{ id: 0, index: 2 }]
            this.setState({ isPresent: 1, isPresentMarked: isMarked })
            console.log(`isMarked`, isMarked);
        } else {
            const filtered = isMarked.filter(value => value.index !== index)
            this.setState({ isPresent: 0, isPresentMarked:filtered })
            console.log(`filtered`, filtered);
        }
    }

    dateChange = (e) => {
        console.log(`e.target.value`, e.target.value);
        this.setState({data:$('#datePicker').val()})
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div>
                    <div style={{ padding: "5px" }}>
                        Date : <input style={{ padding: '5px' }} type="date" id="datePicker" onChange={this.dateChange} />
                        <Button style={{ padding: '5px' }}> Submit </Button>
                    </div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>Student Name</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.studentList).map((ins, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{ins.id}</th>
                                        <td>{ins.fullName}</td>
                                        <td><label><input type="checkbox" onChange={e => this.handleChange(e, ins.id,index)} />Present</label></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
