import { NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css';
import { FaChevronDown, FaPlus, FaSearch, FaUserAlt } from "react-icons/fa";
import type { LabPatientDetails } from '../screens/home/types/patient';
import { useMemo, useState } from 'react';
import ButtonWithTextAndImage from '../common/buttonWithTextAndImage';

type Props = {
    patients: LabPatientDetails[];
    onPlusTapped?: () => void;
}

export default function PatientDropDown({ patients, onPlusTapped }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter patients based on search input
    const filteredPatients = useMemo(() => {
        return patients.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [patients, searchQuery]);

    return (
        <div className={styles.patientDropDownContainer}>
            {/* The Trigger Button */}
            <button className={styles.patientBtn}>
                <span className={styles.btnContent}>
                    <FaUserAlt className={styles.userIcon} />
                    <span>Patients</span>
                </span>
                <FaChevronDown className={styles.arrowIcon} />
            </button>

            {/* The Hover Menu */}
            <div className={styles.dropdownMenu}>
                {/* 1. Add Button at the TOP */}
                <div className={styles.menuHeaderSection}>
                    <ButtonWithTextAndImage
                            text="Add Lab Result"
                            icon={<FaPlus color='blue' />}
                            variant="primary"
                            onClick={onPlusTapped}
                          />
                </div>

                {/* 2. Search Functionality */}
                <div className={styles.searchBox}>
                    <FaSearch className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                        onClick={(e) => e.stopPropagation()} // Prevent closing if clicked
                    />
                </div>
                
                {/* 3. Filtered Patient List */}
                <div className={styles.patientList}>
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                            <NavLink
                                key={patient.id}
                                to={`/home/${patient.id}`}
                                state={patient}
                                className={({ isActive }) =>
                                    `${styles.patientLink} ${isActive ? styles.activeLink : ""}`
                                }
                            >
                                <div className={styles.patientItem}>
                                    <span className={styles.patientName}>{patient.name}</span>
                                    <span className={styles.patientAge}>{patient.age}y</span>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <div className={styles.emptyState}>No matches found</div>
                    )}
                </div>
            </div>
        </div>
    )
}
