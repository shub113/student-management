import * as React from 'react'
import { Table } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';
import $ from 'jquery'

export class ShowMarks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            marks: null,
            subjectName: null,
            semester: null,
            marksList: []
        };
    }

    componentDidMount() {
        const userId = Number(localStorage.getItem('userId'))
        console.log(localStorage.getItem('userId'));

        $.ajax({
            url: `http://localhost:8000/marks-list/`,
            type: 'POST',
            data: { userId },
            success: (response) => {
                this.setState({ marksList: response.data });
            },
            error: (request, status, error) => {
                console.log(error);
                alert("Error!!!")
            }
        })
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Semester</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.marksList.map((ins) => {
                                return (
                                    <tr>
                                        <td>{ins.subjectName}</td>
                                        <td>{ins.semester}</td>
                                        <td>{ins.marks}</td>
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