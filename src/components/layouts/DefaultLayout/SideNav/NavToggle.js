import React from "react";
import {Dropdown, Nav, Navbar, Icon} from "rsuite";

const styles = {
    icon: {
        width: 56,
        height: 56,
        lineHeight: '56px',
        textAlign: 'center'
    },
    navItem: {
        width: 56,
        textAlign: 'center'
    }
};

export default function NavToggle({expand, onChange}) {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Dropdown
                        placement={expand ? 'topStart' : 'rightEnd'}
                        trigger="hover"
                        renderTitle={ children => {
                            return (<Icon style={styles.icon} icon="cog" />);
                        }}
                    >
                        <Dropdown.Item>Help</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                </Nav>
                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={styles.navItem}>
                        <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
}