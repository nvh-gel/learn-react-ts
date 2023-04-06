import React from "react";
import {Project} from "../../model/Project";
import {Alert, Col, Image, Row, Space, Typography} from "antd";
import Title from "antd/es/typography/Title";

const {Text} = Typography;

interface ProjectDetailProp {
    project: Project;
}

function ProjectDetail({project}: ProjectDetailProp) {

    return (
        <Row>
            <Col span={8}>
                <Image src={project.imageUrl} alt=""/>
            </Col>
            <Col span={16}>
                <Space direction="vertical" style={{padding: 10}}>
                    <Title level={3}>{project.name}</Title>
                    <Text>{project.description}</Text>
                    <Text>Budget: {project.budget}</Text>
                    <Text>Signed: {project.contractSignedOn.toString()}</Text>
                    <Alert
                        type={project.isActive ? 'success': 'info'}
                        message={project.isActive ? 'active' : 'inactive'}
                        showIcon
                    />
                </Space>
            </Col>
        </Row>

    );
}

export default ProjectDetail;
