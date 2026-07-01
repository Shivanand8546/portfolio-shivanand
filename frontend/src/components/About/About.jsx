import styles from "./about.module.scss";

const services = [
    {
        icon: "ti-layout-dashboard",
        title: "Full Stack Web Development",
        desc: "Proficient in MERN Stack — MongoDB, Express.js, React.js, Node.js — building responsive and scalable web applications.",
    },
    {
        icon: "ti-brain",
        title: "Machine Learning & AI",
        desc: "Built a dental disease detection system using X-ray image classification with Flask and real-time ML model integration.",
    },
    {
        icon: "ti-brand-docker",
        title: "DevOps & Cloud",
        desc: "Hands-on with Docker, Jenkins, Linux, Git, and AWS. AWS Certified Cloud Practitioner with cloud deployment experience.",
    },
    {
        icon: "ti-code",
        title: "Backend & Database",
        desc: "Strong in Django, Node.js, SQLite, and MongoDB. Experienced in REST APIs, authentication, and CRUD operations.",
    },
];



const About = () => {
    return (
        <div className={styles.about}>
            <span className={styles.pill}>
                <span className={styles.pill_dot}></span>
                Computer Science Engineer & Developer
            </span>

            <h2 className={styles.heading}>
                About As{" "}
                <span className={styles.heading_gradient}>real-world solutions.</span>
            </h2>

            <div className={styles.cards_grid}>
                {services.map((item, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.icon_wrap}>
                            <i className={`ti ${item.icon}`} aria-hidden="true"></i>
                        </div>
                        <p className={styles.card_title}>{item.title}</p>
                        <p className={styles.card_desc}>{item.desc}</p>
                        <span className={styles.learn_more}>
                            Learn More <i className="ti ti-arrow-up-right"></i>
                        </span>
                    </div>
                ))}
            </div>

            <a href="#Project" className={styles.explore_btn}>
                Explore My Projects <i className="ti ti-arrow-up-right"></i>
            </a>
        </div>
    );
};

export default About;
