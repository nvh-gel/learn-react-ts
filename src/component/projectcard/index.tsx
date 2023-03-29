import {Project} from "../../model/Project";
import PropTypes from "prop-types";
import {Button} from "antd";
import {EditOutlined} from "@ant-design/icons";

function ProjectCard(props: any) {

    const {project} = props;

    const handleEditClick = (proj: Project) => {
        console.log(proj);
    }

    return (
        <div className="card">
            <img src={project.imageUrl} className="project-card" alt=""/>
            <section className="section dark">
                <h5 className="strong"><strong>{project.name}</strong></h5>
                <p>{formatDescription(project.description)}</p>
                <p>{project.budget.toLocaleString()}</p>
                <Button
                    type="primary"
                    icon={<EditOutlined/>}
                    size="large"
                    className="bordered"
                    onClick={() => handleEditClick(project)}
                >Edit</Button>
            </section>
        </div>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
}

function formatDescription(description: string) {
    return description.substring(0, 60) + '...';
}

export default ProjectCard;
