import React from "react";
import {Button, ControlLabel, Form, FormGroup, HelpBlock, Input, Modal} from "rsuite";
import {Field, Form as RForm} from "react-final-form";
import { isRequired } from "./../../validation";

const { Header, Body } = Modal;

export default function DepartmentModal({type, show, onClose, initData, onSave}) {
    return (
        <Modal size="sm" show={show} onHide={onClose}>
            { (type === "add") && <Header>Add new department</Header>}
            { (type === "update") && <Header>Update department</Header>}
            <Body>
                <RForm initialValues={initData} onSubmit={(value) => onSave(value)}>
                    {({handleSubmit, submitting}) =>  (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <ControlLabel>Department Name</ControlLabel>
                                <Field name="name" validate={isRequired}>
                                    {({meta, input}) => (
                                        <>
                                            <Input {...input} />
                                            { meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock> }
                                        </>
                                    )}
                                </Field>
                            </FormGroup>

                            <Button disabled={submitting} loading={submitting} type="submit" appearance="primary">
                                {(type === "add") && "Add"}
                                {(type === "update") && "Save change"}
                            </Button>
                            <Button onClick={onClose} appearance="subtle">
                                Cancel
                            </Button>
                        </Form>
                    )
                    }
                </RForm>
            </Body>
        </Modal>
    );
}