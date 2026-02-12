import { STORAGE_KEY_USER, type StoredUser } from "./localStorage/UserInfo";
import styles from './css/Navbar.module.css';
import { FaChevronDown, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaUserAlt } from "react-icons/fa";

export default function NavBar() {
    const storedUser = localStorage.getItem(STORAGE_KEY_USER);
    if (!storedUser) return;
    const user: StoredUser = JSON.parse(storedUser);
    const labInfo = user.labInfo || {
        labName: '',
        email: '',
        phone: '',
        address: '',
        logo: '',
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Left Section: Branding */}
                <div className={styles.brand}>
                    {labInfo.logo ? (
                        <img src={labInfo.logo} alt="Lab Logo" className={styles.logo} />
                    ) : (
                        <div className={styles.logoPlaceholder}>L</div>
                    )}
                    <div className={styles.nameSection}>
                        <h1 className={styles.labName}>{labInfo.labName || 'Laboratory Name'}</h1>
                        <span className={styles.status}>Diagnostic Center</span>
                    </div>
                </div>

                {/* Right Section: Contact Info */}
                <div className={styles.infoGroup}>
                    <div className={styles.infoItem}>
                        <FaPhoneAlt className={styles.icon} />
                        <div className={styles.details}>
                            <label>Call Us</label>
                            <span>{labInfo.phone || '—'}</span>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <FaEnvelope className={styles.icon} />
                        <div className={styles.details}>
                            <label>Email Address</label>
                            <span>{labInfo.email || '—'}</span>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <FaMapMarkerAlt className={styles.icon} />
                        <div className={styles.details}>
                            <label>Location</label>
                            <span className={styles.addressText}>{labInfo.address || '—'}</span>
                        </div>
                    </div>
                </div>

                {/* Patient Dropdown */}
                <div className={styles.patientDropDown}>
                    <button className={styles.patientBtn}>
                        <span className={styles.btnContent}>
                            <FaUserAlt className={styles.userIcon} />
                            <span>Patients</span>
                        </span>
                        <FaChevronDown className={styles.arrowIcon} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
