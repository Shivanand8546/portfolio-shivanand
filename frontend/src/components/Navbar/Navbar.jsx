import { useState, useEffect } from "react";
import styles from "./navbar.module.scss";
import { useSelector } from "react-redux";

const navLinks = [
    { label: "Home", href: "#Home" },
    { label: "About", href: "#About" },
    { label: "Certifications", href: "#Certifications" },
    { label: "Projects", href: "#Project" },
    { label: "Skills", href: "#Skill" },
    { label: "Contact", href: "#Contact" },
];

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("Home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (label) => {
        setActive(label);
        setMenuOpen(false);
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            {/* Logo */}
            <a href="#Home" className={styles.logo} onClick={() => handleNavClick("Home")}>
                <div className={styles.logo_box}>SS</div>
                <span className={styles.logo_text}>
                    {user?.fullName?.split(" ")[0] || "Shivanand"}{" "}
                    <span>{user?.fullName?.split(" ")[1] || "Shukla"}</span>
                </span>
            </a>

            {/* Desktop Links */}
            <div className={styles.nav_links}>
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className={`${styles.nav_link} ${active === link.label ? styles.active : ""}`}
                        onClick={() => handleNavClick(link.label)}
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {/* Right Side */}
            <div className={styles.nav_right}>
                {user?.resume && (
                    <a
                        href={user.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.resume_btn}
                    >
                        <i className="ti ti-download" aria-hidden="true"></i> Resume
                    </a>
                )}
                <button
                    className={styles.menu_btn}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <i className={`ti ${menuOpen ? "ti-x" : "ti-menu-2"}`} aria-hidden="true"></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className={styles.mobile_menu}>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`${styles.mobile_link} ${active === link.label ? styles.active : ""}`}
                            onClick={() => handleNavClick(link.label)}
                        >
                            {link.label}
                        </a>
                    ))}
                    {user?.resume && (
                        <a
                            href={user.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resume_btn}
                            style={{ marginTop: "0.5rem", justifyContent: "center" }}
                        >
                            <i className="ti ti-download" aria-hidden="true"></i> Resume
                        </a>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
