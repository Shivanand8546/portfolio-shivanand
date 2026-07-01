import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './project.module.scss';
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProject } from '../../redux/slices/singleProjectSlice';

Modal.setAppElement('#root');

const techIcons = {
    react: "ti-brand-react",
    node: "ti-brand-nodejs",
    express: "ti-server-2",
    mongodb: "ti-database",
    flask: "ti-flask",
    django: "ti-brand-python",
    python: "ti-brand-python",
    docker: "ti-brand-docker",
    "machine learning": "ti-brain",
    ml: "ti-brain",
    html: "ti-brand-html5",
    css: "ti-brand-css3",
    javascript: "ti-brand-javascript",
    sqlite: "ti-database",
    git: "ti-brand-git",
};

const getTechIcon = (tech) => {
    const t = tech.toLowerCase().trim();
    for (const key in techIcons) {
        if (t.includes(key)) return techIcons[key];
    }
    return "ti-tools";
};

const ViewProject = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage('');
    };

    const dispatch = useDispatch();
    const { id } = useParams();
    const projectLoading = useSelector(state => state.singleProject.loading);

    useEffect(() => {
        dispatch(getSingleProject(id));
        window.scrollTo(0, 0);
    }, [id]);

    const { singleProject } = useSelector(state => state.singleProject);

    const technologies_list = singleProject?.technologies?.split(",").map(t => t.trim()).filter(Boolean);
    const description_points = singleProject?.description
        ?.split(".")
        .map(s => s.trim())
        .filter(s => s.length > 5);

    if (projectLoading) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#9b6ddf" }}>
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className={styles.project}>
                <div className={styles.hero_section}>
                    <div>
                        <span className={styles.tag_pill}>
                            <i className="ti ti-folder" aria-hidden="true"></i> Featured project
                        </span>
                        <h1 className={styles.title}>{singleProject.title}</h1>

                        {technologies_list && technologies_list.length > 0 && (
                            <>
                                <p className={styles.tech_label}>Technologies used</p>
                                <div className={styles.tech_row}>
                                    {technologies_list.map((tech, i) => (
                                        <span className={styles.tech_chip} key={i}>
                                            <i className={`ti ${getTechIcon(tech)}`} aria-hidden="true"></i>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        <div className={styles.links_row}>
                            {singleProject.gitRepoLink && (
                                <a href={singleProject.gitRepoLink} target="_blank" rel="noopener noreferrer" className={styles.link_btn}>
                                    <i className="ti ti-brand-github" aria-hidden="true"></i> View on GitHub
                                </a>
                            )}
                            {singleProject.deployed === "Yes" && singleProject.projectLink && (
                                <a href={singleProject.projectLink} target="_blank" rel="noopener noreferrer" className={styles.link_btn}>
                                    <i className="ti ti-external-link" aria-hidden="true"></i> Live site
                                </a>
                            )}
                            <a href="/#Project" className={`${styles.link_btn} ${styles.secondary}`}>
                                <i className="ti ti-arrow-left" aria-hidden="true"></i> Back to projects
                            </a>
                        </div>
                    </div>

                    <div className={styles.banner_wrap}>
                        <img src={singleProject?.projectBanner?.url} alt={singleProject.title} />
                    </div>
                </div>

                <div className={styles.about_section}>
                    <h2 className={styles.section_heading}>About this project</h2>
                    <div className={styles.feature_list}>
                        {description_points && description_points.map((point, i) => (
                            <div className={styles.feature_item} key={i}>
                                <div className={styles.feature_icon}>
                                    <i className="ti ti-point" aria-hidden="true"></i>
                                </div>
                                <p className={styles.feature_text}>{point}.</p>
                            </div>
                        ))}
                    </div>
                </div>

                {singleProject.projectSnapshots && singleProject.projectSnapshots.length > 0 && (
                    <div className={styles.snapshots_section}>
                        <h2 className={styles.section_heading}>Snapshots</h2>
                        <div className={styles.snapshots_grid}>
                            {singleProject.projectSnapshots.map((snap, i) => (
                                <div
                                    key={i}
                                    className={styles.snapshot_item}
                                    onClick={() => openModal(snap.url)}
                                >
                                    <img src={snap.url} alt={`snapshot${i + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className={styles.modal}
                overlayClassName={styles.modal_overlay}
            >
                <button onClick={closeModal} className={styles.close_button}>
                    <i className="ti ti-x" aria-hidden="true"></i>
                </button>
                <img src={selectedImage} alt="Selected" className={styles.modal_image} />
            </Modal>
        </>
    );
};

export default ViewProject;
