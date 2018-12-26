import * as React from 'react';
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const navItem = [
    { label: 'User Mangement', path: '/user-managemt', showFor: [0] },
    { label: 'Subject Mangement', path: '/subject-managemt', showFor: [0] },
    { label: 'Marks Mangement', path: '/marks-managemt', showFor: [0,1] },
    { label: 'Attendance Mangement', path: '/attendance-managemt', showFor: [0,1] },
    { label: 'Show Attendance', path: '/attendance', showFor: [2, 3] },
    { label: 'Show Marks', path: '/marks', showFor: [2, 3] }
]

export class CustomNavbar extends React.Component {
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Student managemt system</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {navItem.map((ins) => {
                            if (ins.showFor.includes())
                                return null;
                            return (
                                <NavItem>
                                    <NavLink onClick=""><Link to={ins.path}>{ins.label}</Link></NavLink>
                                </NavItem>
                            );
                        })}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
