import React from "react";
import {Dropdown, Icon, Popover, Whisper} from "rsuite";
import {useTranslation} from "react-i18next";

import "./style.css";

const Menu = ({onSelect}) => {
    let {t} = useTranslation();
    return (
        <Dropdown.Menu onSelect={onSelect}>
            <Dropdown.Item panel style={{padding: 10, width: 160}}>
                <p>{t("Signed in as")}</p>
                <strong>Foobar</strong>
            </Dropdown.Item>
            <Dropdown.Item divider/>
            <Dropdown.Item>{t("Profile")}</Dropdown.Item>
            <Dropdown.Item>{t("Settings")}</Dropdown.Item>
            <Dropdown.Item>{t("Sign out")}</Dropdown.Item>
        </Dropdown.Menu>
    );
}

const MenuPopover = ({onSelect, ...rest}) => {
    return (
        <Popover {...rest} full>
            <Menu onSelect={onSelect}/>
        </Popover>
    );
}

export default function AvatarHeader() {

    function handleSelectMenu() {
        console.log("Clicked");
    }

    return (
        <div className="avatar-header">
            <Whisper
                placement="bottomEnd"
                trigger="click"
                speaker={<MenuPopover onSelect={handleSelectMenu}/>}
            >
                <Icon icon="user-circle-o" size="lg"/>
            </Whisper>
        </div>
    );
}