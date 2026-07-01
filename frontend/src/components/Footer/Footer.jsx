import styles from "./footer.module.scss";
import { useSelector } from "react-redux";

const Footer = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <footer className={styles.footer}>
            <div className={styles.footer_top}>
                {/* Brand */}
                <div className={styles.brand_col}>
                    <p className={styles.brand_name}>
                        {user?.fullName?.split(" ")[0] || "Shivanand"}{" "}
                        <span>{user?.fullName?.split(" ")[1] || "Shukla"}</span>
                    </p>
                    <p className={styles.brand_desc}>
                        Full Stack Developer building real-world applications
                        with MERN Stack.
                    </p>
                    <div className={styles.social_row}>
                        {user?.githubURL && (
                            <a href={user.githubURL} target="_blank" rel="noreferrer" className={styles.soc}>
                                <i className="ti ti-brand-github" aria-hidden="true"></i>
                            </a>
                        )}
                        {user?.linkedInURL && (
                            <a href={user.linkedInURL} target="_blank" rel="noreferrer" className={styles.soc}>
                                <i className="ti ti-brand-linkedin" aria-hidden="true"></i>
                            </a>
                        )}
                        <a href="https://leetcode.com/" target="_blank" rel="noreferrer" className={styles.soc}>
                            <i className="ti ti-brand-leetcode" aria-hidden="true"></i>
                        </a>
                        {user?.email && (
                            <a href={`mailto:${user.email}`} className={styles.soc}>
                                <i className="ti ti-mail" aria-hidden="true"></i>
                            </a>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className={styles.link_col}>
                    <p className={styles.col_title}>Quick Links</p>
                    <div className={styles.col_links}>
                        {["Home", "About", "Certifications", "Project", "Skill", "Contact"].map((item) => (
                            <a href={`#${item}`} className={styles.col_link} key={item}>
                                <i className="ti ti-chevron-right" aria-hidden="true"></i>
                                {item === "Project" ? "Projects" : item === "Skill" ? "Skills" : item === "Certifications" ? "Certifications" : item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className={styles.link_col}>
                    <p className={styles.col_title}>Contact</p>
                    <div className={styles.col_links}>
                        <a href={`mailto:${user?.email || "shivanand2124@gmail.com"}`} className={styles.col_link}>
                            <i className="ti ti-mail" aria-hidden="true"></i>
                            {user?.email || "shivanand2124@gmail.com"}
                        </a>
                        <a href={`tel:+91${user?.phone || "8795503507"}`} className={styles.col_link}>
                            <i className="ti ti-phone" aria-hidden="true"></i>
                            +91 {user?.phone || "8795503507"}
                        </a>
                        <span className={styles.col_link}>
                            <i className="ti ti-map-pin" aria-hidden="true"></i>
                            Uttar Pradesh, India
                        </span>
                        <span className={styles.col_link}>
                            <i className="ti ti-award" aria-hidden="true"></i>
                            AWS Certified
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.footer_bottom}>
                <p className={styles.copy}>
                    © 2026 <span>{user?.fullName || "Shivanand Shukla"}</span>. All rights reserved.
                </p>
                <p className={styles.made_with}>
                    Made with <i className="ti ti-heart" aria-hidden="true"></i> in India
                </p>
            </div>
        </footer>
    );
};

export default Footer;
