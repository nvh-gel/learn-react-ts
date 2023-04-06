import React from "react";
import {Row} from "antd";
import {Project} from "../../model/Project";
import ProjectCard from "../projectcard";

function ProjectList(props: any) {

    const {projects} = props;

    const projectList = projects.map((project: Project) => {
        return <ProjectCard key={project.id} project={project}/>
    });

    return (
        <Row>
            {projectList}
        </Row>
    );
}

export default ProjectList;
