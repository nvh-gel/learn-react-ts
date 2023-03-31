import {Project} from "../../model/Project";
import {Button, Form} from "antd";
import {EditOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";


interface ProjectCardProps {
    project: Project,
}

function ProjectCard(props: ProjectCardProps) {

    const {project} = props;

    const [editing, setEditing] = useState(false);

    const [isInvalid, setInvalid] = useState<boolean>(false);

    const handleEditClick = () => {
        setEditing(true);
    }

    const finishEditing = () => {
        setEditing(false);
    }

    const onSave = (proj: Project) => {
        Object.assign(project, proj);
        finishEditing();
    }

    function handleFieldsChange(changes: any[]) {
        const errCount = changes.reduce((errCount, change) => errCount + change.errors.length, 0);
        if (errCount > 0) {
            setInvalid(true);
        } else {
            setInvalid(false);
        }
    }

    const budgetRule = [{
        message: 'Budget must be larger than 0.',
        pattern: /^[1-9]\d*$/,
    }];

    const editForm = <div className="card project-card">
        <Form
            name="project"
            layout="vertical"
            wrapperCol={{span: 20}}
            onFinish={onSave}
            onFieldsChange={handleFieldsChange}
        >
            <FormItem label="Project Name" name="name" initialValue={project.name}>
                <Input placeholder="enter project name"/>
            </FormItem>
            <FormItem label="Project Description" name="description" initialValue={project.description}>
                <TextArea placeholder="enter project description"/>
            </FormItem>
            <FormItem label="Project Budget" name="budget" initialValue={project.budget} rules={budgetRule}>
                <Input type="number" placeholder="enter budget"/>
            </FormItem>
            <FormItem label="Is Active" name="isActive" valuePropName="checked" initialValue={project.isActive}>
                <Input type="checkbox"/>
            </FormItem>
            <FormItem name="submit">
                <Button type="primary" size="large" htmlType="submit" disabled={isInvalid}>Save</Button>
            </FormItem>
            <FormItem name="cancel">
                <Button type="primary" size="large" onClick={finishEditing}>Cancel</Button>
            </FormItem>
        </Form>
    </div>;

    const projectCard = <div className="card project-card">
        <img src={project.imageUrl} className="project-img" alt=""/>
        <section className="section dark">
            <h5 className="strong"><strong>{project.name}</strong></h5>
            <p>{formatDescription(project.description)}</p>
            <p>{project.budget.toLocaleString()}</p>
            <Button
                type="primary"
                icon={<EditOutlined/>}
                size="large"
                className="bordered"
                onClick={handleEditClick}
            >Edit</Button>
        </section>
    </div>;

    return editing ? editForm : projectCard;
}

function formatDescription(description: string) {
    return description.substring(0, 60) + '...';
}

export default ProjectCard;
