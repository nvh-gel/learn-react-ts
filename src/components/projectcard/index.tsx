import {Project} from "../../model/Project";
import {Button, Card, Checkbox, Col, Divider, Form, Image, InputNumber, Space, Typography} from "antd";
import React, {useState} from "react";
import Input from "antd/es/input/Input";
import {projectAPI} from "../../api/ProjectAPI";
import {EditOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";

const {Text, Link} = Typography;

interface ProjectCardProps {
    project: Project,
}

function ProjectCard(props: ProjectCardProps) {

    const {project} = props;
    const [editing, setEditing] = useState(false);
    const [isInvalid, setInvalid] = useState<boolean>(false);

    const handleEditClick = (e: any) => {
        e.preventDefault();
        setEditing(true);
    }

    const finishEditing = () => {
        setEditing(false);
    }

    const onSave = (proj: Project) => {
        Object.assign(project, proj);
        projectAPI
            .put(project)
            .catch((e: TypeError) => {
                console.log(e);
                throw new Error('Error occurred.');
            });
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

    const editForm = (
        <Col span={6}>
            <Card>
                <Form name="editProject" layout="vertical" onFinish={onSave} onFieldsChange={handleFieldsChange}>
                    <Form.Item label="Project Name" name="name" initialValue={project.name}>
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item label="Description" name="description" initialValue={project.description}>
                        <TextArea/>
                    </Form.Item>
                    <Form.Item label="Budget" name="budget" initialValue={project.budget} rules={budgetRule}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item label="Is Active" name="isActive" valuePropName="checked" initialValue={project.isActive}>
                        <Checkbox/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isInvalid}>Save</Button>
                    <Divider type="vertical"/>
                    <Button type="primary" onClick={finishEditing}>Cancel</Button>
                </Form>
            </Card>
        </Col>
    );

    const projectCard = (
        <Col span={6}>
            <Link href={"#/projects/" + project.id}>
                <Card
                    cover={<Image src={project.imageUrl} alt="" style={{padding: '4px'}} preview={false}/>}
                >
                    <Space direction="vertical">
                        <Meta title={project.name}/>
                        <Text>{formatDescription(project.description)}</Text>
                        <Button
                            type="primary"
                            icon={<EditOutlined/>}
                            size="large"
                            className="bordered"
                            onClick={handleEditClick}
                        >Edit</Button>
                    </Space>
                </Card>
            </Link>
        </Col>
    );

    return editing ? editForm : projectCard;
}

function formatDescription(description: string) {
    return description.substring(0, 60) + '...';
}

export default ProjectCard;
