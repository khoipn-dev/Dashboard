import React, { useState, useEffect } from "react";
import {Panel, Table, Button, ButtonToolbar, InputGroup, Input, Icon, IconButton} from "rsuite";
import { DOMHelper } from "rsuite";
import {useTranslation} from "react-i18next";
import { StaffService } from "../../services/StaffService";

import "./style.css";
import DrawerView from "./DrawerView";

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

export default function Staffs() {
    const [tableData, setTableData] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const { t } = useTranslation();

    useEffect( function () {
        async function fetchAPI() {
            let data = await StaffService.getAll();
            setTableData(data);
            setIsLoadingData(false);
        }
        fetchAPI();
    }, []);

    async function addNewStaff(staff) {
        try {
            let result = await StaffService.save(staff);
            setTableData([...tableData, result]);
            handleCloseDrawer();
        } catch (e) {
            console.log(e);
        }
    }

    function handleShowDrawer() {
        setShowDrawer(true);
    }

    function handleCloseDrawer() {
        setShowDrawer(false);
    }

    return (
        <div>
            <Panel header={<h4>{t("Staffs")}</h4>}>
                <div className="table-toolbar">
                    <div className="row">
                        <div className="col-3">
                            <ButtonToolbar>
                                <Button appearance="primary" placement="left" onClick={handleShowDrawer}>
                                    {t("Add staff")}
                                </Button>
                            </ButtonToolbar>
                        </div>
                        <div className="col-9">
                            <InputGroup className="pull-right" style={{width:300}} inside>
                                <Input placeholder="Search" />
                                <InputGroup.Addon>
                                    <Icon icon="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <Table
                    loading={isLoadingData}
                    data={tableData}
                    height={getHeight(window) - 216}
                    onRowClick={(rowData) => { console.log(rowData) }}
                >
                    <Column width={100}>
                        <HeaderCell align="center">{t("No.")}</HeaderCell>
                        <Cell align="center">
                            {(rowData, rowIndex) => {
                                return (
                                    <React.Fragment>{rowIndex + 1}</React.Fragment>
                                );
                            }}
                        </Cell>
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Email</HeaderCell>
                        <Cell dataKey="email" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>{t("Name")}</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>City</HeaderCell>
                        <Cell dataKey="city" />
                    </Column>
                    <Column width={300}>
                        <HeaderCell>Company Name</HeaderCell>
                        <Cell dataKey="companyName" />
                    </Column>
                    <Column width={100} fixed="right">
                        <HeaderCell align="center">Action</HeaderCell>
                        <Cell align="center">
                            {rowData => {
                                return (
                                    <React.Fragment>
                                        <IconButton size="xs" color="green" icon={<Icon icon="pencil"/>}/>
                                        &nbsp;
                                        <IconButton size="xs" color="red" icon={<Icon icon="trash"/>}/>
                                    </React.Fragment>
                                );
                            }}
                        </Cell>
                    </Column>
                </Table>
            </Panel>
            <DrawerView onSave={addNewStaff} showDrawer={showDrawer} onClose={handleCloseDrawer}/>
        </div>
    );
}