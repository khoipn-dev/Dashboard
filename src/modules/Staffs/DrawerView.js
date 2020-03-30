import React from "react";
import {Drawer, FormGroup, Input, Form, ControlLabel, Button, HelpBlock} from "rsuite";
import { Form as RForm, Field } from 'react-final-form';
import { isRequired, isEmail } from "./../../validation";

export default function DrawerView({ showDrawer, onClose, onSave }) {

    return (
        <Drawer size="sm" placement="right" backdrop={true} show={showDrawer} onHide={onClose}>
            <Drawer.Header>Add new staff</Drawer.Header>
            <Drawer.Body>
                <RForm initialValues={{}} onSubmit={(value) => onSave(value)}>
                    {({handleSubmit, submitting}) =>  (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <Field name="email" placeholder="email" validate={isEmail}>
                                    {({meta, input}) => (
                                        <>
                                        <Input {...input} />
                                            { meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock> }
                                        </>
                                    )}
                                </Field>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>
                                <Field name="name" validate={isRequired}>
                                    {({meta, input}) => (
                                        <>
                                        <Input {...input} />
                                        { meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock> }
                                        </>
                                    )}
                                </Field>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>City</ControlLabel>
                                <Field name="city" validate={isRequired}>
                                    {({meta, input}) => (
                                        <>
                                        <Input {...input} />
                                        { meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock> }
                                        </>
                                    )}
                                </Field>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Company Name</ControlLabel>
                                <Field name="companyName" validate={isRequired}>
                                    {({meta, input}) => (
                                        <>
                                        <Input {...input} />
                                        { meta.error && meta.touched && <HelpBlock>{meta.error}</HelpBlock> }
                                        </>
                                    )}
                                </Field>
                            </FormGroup>
                            <Button disabled={submitting} loading={submitting} type="submit" appearance="primary">
                                Save
                            </Button>
                            <Button onClick={onClose} appearance="subtle">
                                Cancel
                            </Button>
                        </Form>
                    )
                    }
                </RForm>
            </Drawer.Body>
        </Drawer>
    );
}
