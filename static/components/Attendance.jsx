import * as React from 'react'
import { Table } from 'reactstrap';
import { CustomNavbar } from './CustumNavbar.jsx';

export class Attendance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            studentId: null,
            date: null,
            isPresent: null,
            // userType:null
        };
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div>
                    <div style={{padding:"5px"}}>
                        Date : <input type="date" name="bday" />
                        <input type="submit" />
                    </div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Marks</td>
                                <td><label><input type="checkbox" value="" />Present</label></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}