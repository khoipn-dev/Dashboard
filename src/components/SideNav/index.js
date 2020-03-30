import React, { useState } from "react";
import { Sidebar, Sidenav, Dropdown, Icon, Nav, DOMHelper } from "rsuite";
import {NavLink, Link} from "react-router-dom";
import NavToggle from "./NavToggle";

import './style.css';

const navs = [
    {
        key: '1',
        icon: <Icon icon="dashboard"/>,
        text: 'Dashboard',
        link: '/dashboard'
    },
    {
        key: '2',
        icon: <Icon icon="people-group"/>,
        text: 'Staff Management',
        children: [
            {
                key: '2-1',
                text: 'Staffs',
                link: '/staffs'
            },
            {
                key: '2-2',
                text: 'Departments',
                link: '/departments'
            }
        ]
    },
    {
        key: '3',
        text: 'Errors',
        icon: <Icon icon="exclamation-triangle"/>,
        children: [
            {
                key: '3-1',
                text: '404',
                link: '/error/404'
            },
            {
                key: '3-1',
                text: '500',
                link: '/error/500'
            }
        ]
    },
    {
        key: '4',
        text: 'Advanced',
        icon: <Icon icon="magic"/>,
        children: [
            {
                key: '4-1',
                text: 'Settings',
                link: '/settings'
            }
        ]
    }
];

const { on, getHeight } = DOMHelper;

function renderNavs() {
    return navs.map(item => {
        if (item.children) {
            return (
                <Dropdown key={item.key} title={item.text} eventKey={item.key} icon={item.icon} placement="rightStart" trigger="hover">
                    {item.children.map(child => {
                        return (
                            <Dropdown.Item
                                componentClass={NavLink}
                                activeClassName="nav-item-active"
                                to={child.link}
                                key={child.key}
                                eventKey={child.key}>
                                {child.text}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown>
            );
        }
        return (
            <Nav.Item
                componentClass={NavLink}
                activeClassName="nav-item-active"
                to={item.link}
                key={item.key}
                eventKey={item.key}
                icon={item.icon}>
                {item.text}
            </Nav.Item>
        );

    });
}

export default function SideNav({expand, handleToggle}) {
    const [windowHeight, setWindowHeight] = useState(getHeight(window));

    on(window, 'resize', updateWindowHeight);
    
    function updateWindowHeight() {
        setWindowHeight(getHeight(window));
    }

    let navBodyStyle = null;

    if (expand) {
        navBodyStyle = {
            height: windowHeight - 112,
            overflow: 'auto'
        }
    }

    return (
        <Sidebar
            className="sidenav"
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav.Header>
                <div className="header-brand">
                    <Link to="/">
                        <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                        <span style={{ marginLeft: 12 }}> R-SUITE ANALYTICS</span>
                    </Link>
                </div>
            </Sidenav.Header>
            <Sidenav expanded={expand}  appearance="subtle">
                <Sidenav.Body style={navBodyStyle}>
                    <Nav>
                        { renderNavs() }
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={handleToggle} />
        </Sidebar>
    );
}