import React from "react";
import {Project} from "../../model/Project";
import ProjectCard from "../projectcard";

function ProjectList(props: any) {

    const {projects} = props;

    return (
        <div className="row">
            {projects.map((project: Project) => {
                return (
                    <div key={project.id} className="cols-sm">
                        <ProjectCard project={project}/>
                    </div>
                );
            })}
        </div>
    );
}

export default ProjectList;
