import styles from "./skills.module.scss";
import { useSelector } from "react-redux";

const hardcodedCategories = [
    {
        label: "Languages",
        skills: [
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", level: 85 },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 80 },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 90 },
        ],
    },
    {
        label: "Frontend",
        skills: [
            { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 85 },
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 90 },
            { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 85 },
        ],
    },
    {
        label: "Backend & Database",
        skills: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 82 },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: 80 },
            { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", level: 75 },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", level: 70 },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 82 },
            { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", level: 75 },
        ],
    },
    {
        label: "DevOps & Tools",
        skills: [
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 75 },
            { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", level: 65 },
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 88 },
            { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 78 },
            { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", level: 70 },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: 95 },
        ],
    },
];

const Skills = () => {
    const { skill } = useSelector((state) => state.skills);

    // Hardcoded skill names (lowercase) — duplicate avoid karne ke liye
    const hardcodedNames = hardcodedCategories
        .flatMap(c => c.skills.map(s => s.name.toLowerCase()));

    // Backend skills group by category — sirf jo hardcoded mein nahi hain
    const backendGrouped = {};
    (skill || [])
        .filter(s => !hardcodedNames.includes(s.title?.toLowerCase()))
        .forEach(s => {
            const cat = s.category || "Other";
            if (!backendGrouped[cat]) backendGrouped[cat] = [];
            backendGrouped[cat].push(s);
        });

    // Extra categories jo hardcoded mein nahi hain
    const extraCats = Object.keys(backendGrouped).filter(
        cat => !hardcodedCategories.find(c => c.label === cat)
    );

    return (
        <div className={styles.skills}>
            <span className={styles.pill}>
                <span className={styles.pill_dot}></span>
                My Toolkit
            </span>
            <h2 className={styles.heading}>Skills & Technologies</h2>
            <p className={styles.subheading}>Technologies I use to build real-world applications</p>

            {/* Hardcoded categories + backend extra skills same category mein */}
            {hardcodedCategories.map((category, ci) => (
                <div key={ci}>
                    <p className={styles.category_label}>{category.label}</p>
                    <div className={styles.skills_grid}>

                        {/* Hardcoded skills */}
                        {category.skills.map((s, si) => (
                            <div className={styles.skill_card} key={`h-${si}`}>
                                <img src={s.icon} alt={s.name} />
                                <span className={styles.skill_name}>{s.name}</span>
                                <div className={styles.skill_level}>
                                    <div className={styles.skill_level_fill} style={{ width: `${s.level}%` }}></div>
                                </div>
                            </div>
                        ))}

                        {/* Backend se same category ki extra skills */}
                        {(backendGrouped[category.label] || []).map((s, bi) => (
                            <div className={styles.skill_card} key={`b-${bi}`}>
                                {s.svg?.url && <img src={s.svg.url} alt={s.title} />}
                                <span className={styles.skill_name}>{s.title}</span>
                                {s.proficiency && (
                                    <div className={styles.skill_level}>
                                        <div className={styles.skill_level_fill} style={{ width: `${s.proficiency}%` }}></div>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            ))}

            {/* Naye categories jo dashboard se add kiye — e.g. "Frameworks", "Other" */}
            {extraCats.map((cat, i) => (
                <div key={`extra-${i}`}>
                    <p className={styles.category_label}>{cat}</p>
                    <div className={styles.skills_grid}>
                        {backendGrouped[cat].map((s, si) => (
                            <div className={styles.skill_card} key={`e-${si}`}>
                                {s.svg?.url && <img src={s.svg.url} alt={s.title} />}
                                <span className={styles.skill_name}>{s.title}</span>
                                {s.proficiency && (
                                    <div className={styles.skill_level}>
                                        <div className={styles.skill_level_fill} style={{ width: `${s.proficiency}%` }}></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Skills;
