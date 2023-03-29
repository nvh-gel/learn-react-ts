import React from "react";
import {Button, Form} from "antd";
import Input from "antd/es/input/Input";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";

function ProjectForm() {

    return (
        <div className="card section dark">
            <Form
                name="project"
                layout="vertical"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
            >
                <FormItem label="Project Name" name="name">
                    <Input placeholder="enter project name"/>
                </FormItem>
                <FormItem label="Project Description" name="description">
                    <TextArea placeholder="enter project description"/>
                </FormItem>
                <FormItem label="Project Budget" name="budget">
                    <Input type="number" placeholder="enter budget"/>
                </FormItem>
                <FormItem label="Is Active" name="active">
                    <Input type="checkbox"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="small">Save</Button>
                    <Button type="primary" size="small">Cancel</Button>
                </FormItem>
            </Form>
        </div>
    );
}

export default ProjectForm;
