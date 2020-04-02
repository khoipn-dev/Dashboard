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
            <Dropdown.Item eventKey="1">{t("Profile")}</Dropdown.Item>
            <Dropdown.Item eventKey="2">{t("Settings")}</Dropdown.Item>
            <Dropdown.Item eventKey="4">{t("Sign out")}</Dropdown.Item>
        </Dropdown.Menu>
    );
};

const MenuPopover = ({onSelect, ...rest}) => {
    return (
        <Popover {...rest} full>
            <Menu onSelect={onSelect}/>
        </Popover>
    );
};

const LanguagePopover = ({onSelect, ...rest}) => {
    let {i18n} = useTranslation();

    function handleChangeLanguage(lng) {
        i18n.changeLanguage(lng);
    }

    return (
        <Popover {...rest} full>
            <Dropdown.Menu onSelect={onSelect}>
                <Dropdown.Item
                    onClick={() => handleChangeLanguage('vi')}
                >
                    Vietnamese
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => handleChangeLanguage('en')}
                >
                    English
                </Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    );
};

export default function AvatarHeader() {
    let {t} = useTranslation();
    let languageRef = null;
    let menuRef = null;

    function handleSelectMenu() {
        if (menuRef) {
            menuRef.hide();
        }
    }

    function handleSelectLanguage() {
        if (languageRef) {
            languageRef.hide();
        }
    }

    return (
        <div className="avatar-header">
            <Whisper
                placement="bottomEnd"
                trigger="click"
                triggerRef={(ref) => {
                    languageRef = ref;
                }}
                speaker={<LanguagePopover onSelect={handleSelectLanguage}/>}
            >
                <span className="mr-4">{t("Language")}</span>
            </Whisper>
            <Whisper
                placement="bottomEnd"
                trigger="click"
                triggerRef={(ref) => {
                    menuRef = ref;
                }}
                speaker={<MenuPopover onSelect={handleSelectMenu}/>}
            >
                <Icon icon="user-circle-o" size="lg"/>
            </Whisper>
        </div>
    );
};