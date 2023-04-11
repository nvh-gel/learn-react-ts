import React, {useEffect, useState} from "react";
import ProjectList from "../../components/projectlist/ProjectList";
import {Project} from "../../model/Project";
import {projectAPI} from "../../api/ProjectAPI";
import {Alert, Space, Spin} from "antd";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";


function ProjectsPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    }

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError('');
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data])
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [currentPage]);

    return (
        <Space direction="vertical">
            <Title level={2}>Projects Page</Title>
            {error && (
                <Alert message={error} type="error"/>
            )}
            <ProjectList projects={projects}/>
            {loading && (
                <Space className="align-middle">
                    <Spin size="large"/>
                </Space>
            )}
            {!error && !loading && (
                <Space className="align-middle">
                    <Link onClick={handleMoreClick}>More...</Link>
                </Space>
            )}
        </Space>
    );
}

export default ProjectsPage;
