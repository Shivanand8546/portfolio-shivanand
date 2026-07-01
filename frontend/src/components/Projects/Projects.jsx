import styles from "./project.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const projectConfig = [
    {
        colorClass: "c1",
        iconBoxClass: "ib1",
        iconClass: "i1",
        icon: "ti-stethoscope",
        label: "Healthcare · ML",
        labelClass: "l1",
        year: "2025",
    },
    {
        colorClass: "c2",
        iconBoxClass: "ib2",
        iconClass: "i2",
        icon: "ti-wifi",
        label: "Backend · Automation",
        labelClass: "l2",
        year: "2025",
    },
    {
        colorClass: "c3",
        iconBoxClass: "ib3",
        iconClass: "i3",
        icon: "ti-calendar-event",
        label: "Web · CRUD",
        labelClass: "l3",
        year: "2022",
    },
];

const fallbackProjects = [
    {
        _id: "proj1",
        title: "Dental X-ray Disease Detection System",
        technologies: "React.js, Node.js, Express.js, MongoDB, Flask, Machine Learning, Docker",
        description: "Healthcare web app for dental disease detection using X-ray image classification with a real-time Flask ML model and Docker containerization.",
    },
    {
        _id: "proj2",
        title: "Internet Service Provider Automation System",
        technologies: "Node.js, MongoDB, Express.js",
        description: "Customer onboarding and billing automation modules improving ISP operational efficiency at scale.",
    },
    {
        _id: "proj3",
        title: "Event Management System",
        technologies: "Python, Django, HTML, CSS",
        description: "Web-based event platform with authentication, CRUD operations and role-based access control.",
    },
];

const Projects = () => {
    const { project } = useSelector((state) => state.project);
    const projectsToShow = project && project.length > 0 ? project : fallbackProjects;

    return (
        <div className={styles.projects}>
            <span className={styles.pill}>
                <span className={styles.pill_dot}></span>
                &apos;What I&apos;ve Built&apos;
            </span>
            <h2 className={styles.heading}>My Projects</h2>
            <p className={styles.subheading}>Real-world applications I&apos;ve designed and developed</p>

            <div className={styles.grid}>
                {projectsToShow.map((proj, index) => {
                    const config = projectConfig[index] || projectConfig[0];
                    const tags = proj.technologies
                        ? proj.technologies.split(",").map((t) => t.trim()).slice(0, 4)
                        : [];

                    return (
                        <div className={`${styles.card} ${styles[config.colorClass]}`} key={proj._id || index}>
                            <div className={styles.glass}>
                                <div className={styles.top_row}>
                                    <div className={`${styles.icon_box} ${styles[config.iconBoxClass]}`}>
                                        <i className={`ti ${config.icon} ${styles[config.iconClass]}`} aria-hidden="true"></i>
                                    </div>
                                    <span className={styles.yr_pill}>{config.year}</span>
                                </div>

                                <div className={styles.card_content}>
                                    <span className={`${styles.card_label} ${styles[config.labelClass]}`}>
                                        {config.label}
                                    </span>
                                    <p className={styles.card_title}>{proj.title}</p>
                                    <p className={styles.card_desc}>{proj.description}</p>
                                </div>

                                <div className={styles.divider}></div>

                                <div className={styles.bottom}>
                                    <div className={styles.tag_row}>
                                        {tags.map((tag, i) => (
                                            <span className={styles.tag} key={i}>{tag}</span>
                                        ))}
                                    </div>
                                    <Link to={`/view-project/${proj._id}`} className={styles.arrow}>
                                        <i className="ti ti-arrow-up-right" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;
