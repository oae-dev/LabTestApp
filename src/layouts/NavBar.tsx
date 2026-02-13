import { STORAGE_KEY_USER, type StoredUser } from "../services/localStorage/UserInfo";
import styles from './Navbar.module.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import type { LabPatientDetails } from "../features/patients/patient.type";
import PatientDropDown from "../features/patients/components/PatientDropDown";
type Props = {
    patients: LabPatientDetails[];
    onPlusTapped?: () => void;
}

export default function NavBar({ patients, onPlusTapped }: Props) {
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
                <PatientDropDown patients={patients} onPlusTapped={onPlusTapped} />
            </div>
        </nav>
    );
}
