import * as React from 'react';
import { CustomNavbar } from './CustumNavbar.jsx';
import { Table } from 'reactstrap';
import $ from 'jquery'


export class ShowChilds extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            studentId: null,
            Studentname: null,
            childList: []
        };
    }

    componentDidMount() {
        const parentId = Number(localStorage.getItem('userId'))
        console.log(localStorage.getItem('userId'));

        $.ajax({
            url: `http://localhost:8000/childs/`,
            type: 'POST',
            data: { parentId },
            success: (response) => {
                this.setState({ childList: response.data });
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
                                <th>StudentId</th>
                                <th>Studentname</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.childList.map((ins) => {
                                return (
                                    <tr>
                                        <td>{ins.id}</td>
                                        <td>{ins.fullName}</td>
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
