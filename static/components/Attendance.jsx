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
            isPresentMarked: []
        };
    }

    componentDidMount() {
        $.ajax({
            url: `http://localhost:8000/userList/`,
            type: 'POST',
            data: { userType: 2 },
            success: (response) => {
                const isPresentMarked = this.state.isPresentMarked;
                response.data.forEach((data) => {
                    isPresentMarked.push({studentId: data.id, isPresent: 0})
                })
                this.setState({ studentList: response.data, isPresentMarked });
            },
            error: (request, status, error) => {
                console.log(error);
                alert("Error!!!")
            }
        })
    }

    submit = () => {
        const {isPresentMarked, date} = this.state;
        return (
            $.ajax({
                url: `http://localhost:8000/add-attendence/`,
                type: 'POST',
                data:{studentList :  JSON.stringify(isPresentMarked), date: new Date(date).toISOString() },
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

    handleChange = (e, id, index) => {
        const isMarked = this.state.isPresentMarked;
        if (e.target.checked) {
            isMarked[index] = { studentId:id, isPresent: 1  };
            this.setState({ isPresentMarked: isMarked })
            console.log(`isMarked`, isMarked);
        } else {
            isMarked[index] = { studentId:id, isPresent: 0  };
            this.setState({ isPresentMarked: isMarked })
            console.log(`filtered`, isMarked);
        }
    }

    dateChange = (e) => {
        this.setState({ date: e.target.value })
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div>
                    <div style={{ padding: "5px" }}>
                        Date : <input style={{ padding: '5px' }} type="date" onChange={this.dateChange} />
                        <Button style={{ padding: '5px' }} onClick={this.submit}> Submit </Button>
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
                                        <td><label><input type="checkbox" onChange={e => this.handleChange(e, ins.id, index)} />Present</label></td>
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
