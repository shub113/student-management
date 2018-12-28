import * as React from 'react'
import { Table } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';

export class ShowAttendance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            studentId: null,
            date: null,
            isPresent: null,
        };
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Marks</td>
                                <td>Present</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}