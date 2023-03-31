import React, {Fragment, useEffect, useState} from "react";
import ProjectList from "../../components/projectlist/ProjectList";
import {Project} from "../../model/Project";
import {projectAPI} from "../../api/ProjectAPI";


function ProjectsPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(1,10);
                setError('');
                setProjects(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    return (
        <Fragment>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <h1>Projects</h1>
            <ProjectList projects={projects}/>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </Fragment>
    );
}

export default ProjectsPage;
