import styles from "./timeline.module.scss";

const certifications = [
    {
        title: "AWS Certified Solutions Architect - Associate",
        issuer: "Amazon Web Services",
        date: "May 2026",
        icon: "ti-brand-aws",
        color: "#f5a623",
        validTill: "May 2029",
        link: "https://aws.amazon.com/verification",
        validationId: "093148cb234842019dc05e163808f3f1",
    },
    {
        title: "AWS Certified AI Practitioner",
        issuer: "Amazon Web Services",
        date: "May 2026",
        icon: "ti-brain",
        color: "#f5a623",
        validTill: "May 2029",
        link: "https://aws.amazon.com/verification",
        validationId: "3389af2bea9c43e58e9e7106cb4af91b",
    },
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2024",
        icon: "ti-cloud",
        color: "#f5a623",
        validTill: null,
        link: "https://aws.amazon.com/verification",
        validationId: null,
    },
    {
        title: "CCNA: Introduction to Networks",
        issuer: "Cisco Networking Academy",
        date: "May 2026",
        icon: "ti-network",
        color: "#1d9e75",
        validTill: null,
        link: "https://www.credly.com/badges/45ae8727-1842-4838-80d4-cfa28e93c6cf",
        validationId: "0ffd97d9-8a83-4038-bd55-b3e9c41cb094",
    },
    {
        title: "CCNA: Switching, Routing & Wireless Essentials",
        issuer: "Cisco Networking Academy",
        date: "Jun 2026",
        icon: "ti-router",
        color: "#1d9e75",
        validTill: null,
        link: "https://www.credly.com/badges/6214f083-dcb3-4b38-8956-b6e21ba0d99d",
        validationId: "edb78603-7c96-4bff-8868-4e4b89792e47",
    },
    {
        title: "CCNA: Enterprise Networking, Security & Automation",
        issuer: "Cisco Networking Academy",
        date: "May 2026",
        icon: "ti-shield-lock",
        color: "#1d9e75",
        validTill: null,
        link: "https://www.credly.com/badges/b939fa9a-b6d4-4555-b248-95874ad7520f",
        validationId: "1058adb2-17e9-4c59-909c-f186ae84a184",
    },
    {
        title: "Networking Essentials",
        issuer: "Cisco Networking Academy · KIET University",
        date: "Apr 2026",
        icon: "ti-topology-star",
        color: "#1d9e75",
        validTill: null,
        link: "https://www.credly.com/badges/a92cf6f8-cde1-4b0d-aaa9-02c677e75730",
        validationId: "96fd7c0b-207d-4499-8f76-67df3d463fe7",
    },
    {
        title: "Data Analytics Essentials",
        issuer: "Cisco Networking Academy",
        date: "2024",
        icon: "ti-chart-bar",
        color: "#378add",
        validTill: null,
        link: "https://www.credly.com/badges/3fb25b2a-9a2f-46fa-a638-e79179aecc2a",
        validationId: null,
    },
    {
        title: "Cybersecurity Foundation",
        issuer: "Palo Alto Networks Academy",
        date: "2023",
        icon: "ti-lock",
        color: "#9b6ddf",
        validTill: null,
        link: "https://paloaltonetworksacademy.net/mod/customcert/verify_certificate.php",
        validationId: null,
    },
];

const Timeline = () => {
    return (
        <div className={styles.timeline}>
            <span className={styles.pill}>
                <span className={styles.pill_dot}></span>
                My Achievements
            </span>
            <h2 className={styles.heading}>Certifications</h2>
            <p className={styles.subheading}>Professional certifications I have earned</p>

            <div className={styles.cert_grid}>
                {certifications.map((cert, i) => (
                    <div className={styles.cert_card} key={i}>
                        <div
                            className={styles.cert_icon}
                            style={{ background: `${cert.color}22`, border: `1px solid ${cert.color}55` }}
                        >
                            <i className={`ti ${cert.icon}`} style={{ color: cert.color }} aria-hidden="true"></i>
                        </div>
                        <div className={styles.cert_info}>
                            <p className={styles.cert_title}>{cert.title}</p>
                            <p className={styles.cert_issuer}>{cert.issuer}</p>
                            <div className={styles.cert_dates}>
                                <span className={styles.cert_date}>{cert.date}</span>
                                {cert.validTill && (
                                    <span className={styles.cert_valid}>Valid till {cert.validTill}</span>
                                )}
                            </div>
                            {cert.validationId && (
                                <p className={styles.cert_id}>ID: {cert.validationId}</p>
                            )}
                        </div>
                        <div className={styles.cert_actions}>
                            <i className="ti ti-rosette-discount-check" style={{ color: cert.color }} aria-hidden="true"></i>
                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.verify_btn}
                                    style={{ color: cert.color, borderColor: `${cert.color}55` }}
                                >
                                    <i className="ti ti-external-link" aria-hidden="true"></i> Verify
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
