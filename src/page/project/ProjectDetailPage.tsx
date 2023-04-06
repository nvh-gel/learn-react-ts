import React, {useEffect, useState} from "react";
import {projectAPI} from "../../api/ProjectAPI";
import {useParams} from "react-router-dom";
import {Project} from "../../model/Project";
import ProjectDetail from "../../components/projectdetail";
import {Alert, Space, Spin, Typography} from "antd";

const {Title} = Typography;

function ProjectDetailPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [project, setProject] = useState<Project>();
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        setLoading(true);
        projectAPI.find(id)
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <Title level={2}>Project Detail</Title>
            {loading && (
                <Space className="align-middle">
                    <Spin size="large"/>
                </Space>
            )}
            {error && (
                <Space className="align-middle">
                    <Alert message={error} type="error"/>
                </Space>
            )}
            {project && <ProjectDetail project={project}/>}
        </Space>
    );
}

export default ProjectDetailPage;
