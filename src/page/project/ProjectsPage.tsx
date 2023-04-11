import React, {useEffect} from "react";
import ProjectList from "../../components/projectlist/ProjectList";
import {Alert, Space, Spin} from "antd";
import Title from "antd/es/typography/Title";
import Link from "antd/es/typography/Link";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../state";
import {ThunkDispatch} from "redux-thunk";
import {ProjectState} from "../../projects/state/ProjectTypes";
import {AnyAction} from "redux";
import {loadProjects} from "../../projects/state/ProjectActions";


function ProjectsPage() {
    const loading = useSelector((appState: AppState) => appState.projectState.loading);
    const projects = useSelector((appState: AppState) => appState.projectState.projects);
    const error = useSelector((appState: AppState) => appState.projectState.error);
    const currentPage = useSelector((appState: AppState) => appState.projectState.page);
    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    const handleMoreClick = () => {
        dispatch(loadProjects(currentPage + 1));
    }

    useEffect(() => {
        dispatch(loadProjects(1));
    }, [dispatch]);

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
