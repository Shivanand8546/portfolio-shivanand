import styles from "./contact.module.scss";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Contact = () => {
    const { user } = useSelector((state) => state.user);
    const [senderName, setSenderName] = useState("");
    const [email, setSenderEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!senderName || !email || !message) {
            toast.error("Please fill all fields!");
            return;
        }
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}message`,
                { senderName, email, subject: subject || "Portfolio Contact", message },
                { withCredentials: true }
            );
            toast.success(data.message || "Message sent!");
            setSenderName("");
            setSenderEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            toast.error("Failed to send message. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.contact}>
            <span className={styles.pill}>
                <span className={styles.pill_dot}></span>
                Get In Touch
            </span>
            <h2 className={styles.heading}>Contact Me</h2>
            <p className={styles.subheading}>
                Have a project in mind? Let&apos;s talk and build something great together.
            </p>

            <div className={styles.contact_grid}>
                {/* Info Column */}
                <div className={styles.info_col}>
                    <div className={styles.info_card}>
                        <div className={styles.info_icon}>
                            <i className="ti ti-mail" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className={styles.info_label}>Email</p>
                            <p className={styles.info_value}>{user?.email || "shivanand2124@gmail.com"}</p>
                        </div>
                    </div>
                    <div className={styles.info_card}>
                        <div className={styles.info_icon}>
                            <i className="ti ti-phone" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className={styles.info_label}>Phone</p>
                            <p className={styles.info_value}>+91 {user?.phone || "8795503507"}</p>
                        </div>
                    </div>
                    <div className={styles.info_card}>
                        <div className={styles.info_icon}>
                            <i className="ti ti-map-pin" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className={styles.info_label}>Location</p>
                            <p className={styles.info_value}>Uttar Pradesh, India</p>
                        </div>
                    </div>
                    <div className={styles.info_card}>
                        <div className={styles.info_icon}>
                            <i className="ti ti-share" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className={styles.info_label}>Social</p>
                            <div className={styles.social_row}>
                                {user?.githubURL && (
                                    <a href={user.githubURL} target="_blank" rel="noreferrer" className={styles.social_btn}>
                                        <i className="ti ti-brand-github" aria-hidden="true"></i>
                                    </a>
                                )}
                                {user?.linkedInURL && (
                                    <a href={user.linkedInURL} target="_blank" rel="noreferrer" className={styles.social_btn}>
                                        <i className="ti ti-brand-linkedin" aria-hidden="true"></i>
                                    </a>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <div className={styles.form_col}>
                    <p className={styles.form_title}>Send a Message</p>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Your Name</label>
                        <input
                            className={styles.form_input}
                            type="text"
                            placeholder="________"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Email Address</label>
                        <input
                            className={styles.form_input}
                            type="email"
                            placeholder="__________"
                            value={email}
                            onChange={(e) => setSenderEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Subject</label>
                        <input
                            className={styles.form_input}
                            type="text"
                            placeholder="Project Inquiry"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Message</label>
                        <textarea
                            className={styles.form_textarea}
                            placeholder="Tell me about your project..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button className={styles.send_btn} onClick={handleSend} disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                        <i className="ti ti-send" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
