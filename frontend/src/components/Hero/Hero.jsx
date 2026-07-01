import { motion } from "framer-motion";
import styles from "./hero.module.scss";
import { useSelector } from "react-redux";

const Hero = () => {
    const { user } = useSelector((state) => state.user);

    const textVariants = {
        initial: { y: 30, opacity: 0 },
        animate: {
            y: 0, opacity: 1,
            transition: { duration: 0.8, staggerChildren: 0.12 },
        },
    };

    const scrollVariants = {
        animate: {
            y: [0, 8, 0],
            transition: { duration: 1.8, repeat: Infinity },
        },
    };

    return (
        <div className={styles.hero}>
            <img
                className={styles.hero__bg}
                src={user?.avatar?.url || "/ME2.jpg"}
                alt="Shivanand Shukla"
            />
            <div className={styles.hero__overlay__left}></div>
            <div className={styles.hero__overlay__bottom}></div>

            <motion.div
                className={styles.hero__content}
                variants={textVariants}
                initial="initial"
                animate="animate"
            >
                <motion.span variants={textVariants} className={styles.badge}>
                    <span className={styles.badge__dot}></span>
                    Open to Work &amp; Collaboration
                </motion.span>

                <motion.p variants={textVariants} className={styles.greeting}>
                    Hey, I&apos;m
                </motion.p>

                <motion.h1 variants={textVariants} className={styles.name}>
                    {user?.fullName?.split(" ")[0] || "Shivanand"}{" "}
                    <span>{user?.fullName?.split(" ")[1] || "Shukla"}</span>
                </motion.h1>

                <motion.p variants={textVariants} className={styles.role}>
                    Full Stack Developer 
                </motion.p>

                <motion.div variants={textVariants} className={styles.divider}></motion.div>

                <motion.p variants={textVariants} className={styles.desc}>
                    Building real-world applications using MERN Stack, Python &amp; Machine Learning. AWS Certified &amp; passionate about clean code.
                </motion.p>

                <motion.div variants={textVariants} className={styles.stats__row}>
                    <div className={styles.stat}>
                        <span className={styles.stat__num}>3+</span>
                        <span className={styles.stat__label}>Projects</span>
                    </div>
                    <div className={styles.stat__sep}></div>
                    <div className={styles.stat}>
                        <span className={styles.stat__num}>4</span>
                        <span className={styles.stat__label}>Certifications</span>
                    </div>
                </motion.div>

                <motion.div variants={textVariants} className={styles.buttons}>
                    <a href="#Contact" className={styles.btn__primary}>
                        <i className="ti ti-mail" aria-hidden="true"></i> Contact Me
                    </a>
                    <a
                        href={user?.resume || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btn__secondary}
                    >
                        <i className="ti ti-download" aria-hidden="true"></i> Download CV
                    </a>
                </motion.div>

                <motion.div variants={textVariants} className={styles.social__links}>
                    {user?.githubURL && (
                        <a href={user.githubURL} target="_blank" rel="noreferrer" className={styles.soc__btn}>
                            <i className="ti ti-brand-github" aria-hidden="true"></i>
                        </a>
                    )}
                    {user?.linkedInURL && (
                        <a href={user.linkedInURL} target="_blank" rel="noreferrer" className={styles.soc__btn}>
                            <i className="ti ti-brand-linkedin" aria-hidden="true"></i>
                        </a>
                    )}
                    <a href="https://leetcode.com/" target="_blank" rel="noreferrer" className={styles.soc__btn}>
                        <i className="ti ti-brand-leetcode" aria-hidden="true"></i>
                    </a>
                </motion.div>

                <motion.div className={styles.scroll__div} animate="animate" variants={scrollVariants}>
                    <img src="/scroll.png" alt="scroll down" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;
