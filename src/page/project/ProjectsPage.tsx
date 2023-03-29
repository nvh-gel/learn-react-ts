import React from "react";
import ProjectList from "../../component/projectlist/ProjectList";
import {MOCK_PROJECTS} from "../../data/Mock_Projects";

function ProjectsPage() {

    return (
        <div>
            <h1>Projects</h1>
            <ProjectList projects={MOCK_PROJECTS}/>
        </div>
    );
}

export default ProjectsPage;
