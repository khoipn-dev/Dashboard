import React, {useState, useEffect} from "react";
import {Button, ButtonToolbar, Icon, IconButton, Panel, Table, Notification} from "rsuite";
import {DepartmentService} from "./../../services/DepartmentService";
import { findIndexInArrayByKey } from "./../../helper";

import "./style.css";
import DepartmentModal from "./DepartmentModal";

const {Column, Cell, HeaderCell} = Table;
export default function Departments() {
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [initData, setInitData] = useState({});

    useEffect(function () {
        async function fetchData() {
            let data = await DepartmentService.getAll();
            setTableData(data);
            setIsLoading(false)
        }

        fetchData();
    }, []);

    async function addNewDepartment(department) {
        try {
            let result = await DepartmentService.save(department);
            setTableData([...tableData, result]);
            handleCloseModalAdd();
            Notification.success({
                title: "Success",
                description: "Add new department success",
                duration: 3000
            })
        } catch (e) {
            Notification.error({
                title: "Error",
                description: "Have error. Please try again",
                duration: 3000
            })
        }
    }

    function onClickUpdateDepartment(data) {
        setInitData(data);
        handleShowModalUpdate();
    }

    async function updateDepartment(department) {
        try {
            await DepartmentService.update(department);
            let index = findIndexInArrayByKey(tableData, 'id', department.id);

            setTableData([
                ...tableData.slice(0, index),
                department,
                ...tableData.slice(index + 1)
            ]);

            handleCloseModalUpdate();
            Notification.success({
                title: "Success",
                description: "Update department success",
                duration: 3000
            })
        } catch (e) {
            Notification.error({
                title: "Error",
                description: "Have error. Please try again",
                duration: 3000
            })
        }
    }

    async function deleteDepartment(department) {
        try {
            await DepartmentService.deleteById(department.id);
            let index = findIndexInArrayByKey(tableData, 'id', department.id);
            let temp = tableData;
            temp.splice(index, 1);
            setTableData([...temp]);
            Notification.success({
                title: "Success",
                description: "Delete success",
                duration: 3000
            })
        } catch (e) {
            Notification.error({
                title: "Error",
                description: "Have error. Please try again",
                duration: 3000
            })
        }
    }

    function handleShowModalAdd() {
        setShowModalAdd(true);
    }

    function handleCloseModalAdd() {
        setShowModalAdd(false);
    }

    function handleShowModalUpdate() {
        setShowModalUpdate(true);
    }

    function handleCloseModalUpdate() {
        setShowModalUpdate(false);
    }

    return (
        <div>
            <Panel header={<h4>Departments</h4>}>
                <div className="table-toolbar">
                    <ButtonToolbar>
                        <Button appearance="primary" placement="left" onClick={handleShowModalAdd}>
                            Add new department
                        </Button>
                    </ButtonToolbar>
                </div>
                <Table
                    height={window.outerHeight - 300}
                    loading={isLoading}
                    data={tableData}
                >
                    <Column width={100}>
                        <HeaderCell align="center">No.</HeaderCell>
                        <Cell align="center">
                            {(rowData, rowIndex) => {
                                return (
                                    <React.Fragment>{rowIndex + 1}</React.Fragment>
                                );
                            }}
                        </Cell>
                    </Column>
                    <Column width={600} fixed>
                        <HeaderCell align="center">Department Name</HeaderCell>
                        <Cell align="center" dataKey="name"/>
                    </Column>
                    <Column width={100} fixed="right">
                        <HeaderCell align="center">Action</HeaderCell>
                        <Cell align="center">
                            {(rowData, rowIndex) => {
                                return (
                                    <React.Fragment>
                                        <IconButton onClick={() => onClickUpdateDepartment(rowData)} size="xs" color="green" icon={<Icon icon="pencil"/>}/>
                                        &nbsp;
                                        <IconButton onClick={() => deleteDepartment(rowData)} size="xs" color="red" icon={<Icon icon="trash"/>}/>
                                    </React.Fragment>
                                );
                            }}
                        </Cell>
                    </Column>

                </Table>
            </Panel>
            <DepartmentModal
                type="add"
                show={showModalAdd}
                onClose={handleCloseModalAdd}
                onSave={addNewDepartment}
            />
            <DepartmentModal
                type="update"
                initData={initData}
                show={showModalUpdate}
                onClose={handleCloseModalUpdate}
                onSave={updateDepartment}
            />
        </div>
    );
}