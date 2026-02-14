import { NavLink } from 'react-router-dom';
import styles from '../../../layouts/Navbar.module.css';
import { FaChevronDown, FaPlus, FaUserAlt } from "react-icons/fa";
import SearchInput from '../../../common/inputs/SearchInput';
import { useMemo, useState } from 'react';
import type { LabPatientDetails } from '../patient.type';
import ButtonWithTextAndImage from '../../../common/buttons/buttonWithTextAndImage';
import { MdDelete } from 'react-icons/md';

type Props = {
    patients: LabPatientDetails[];
    onAddPatient?: () => void;
    onDeletePatient?: (patientId: string) => void;
}

export default function PatientDropDown({ patients, onAddPatient, onDeletePatient }: Props) {
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

                {/* 2. Search Functionality */}
                <div className={styles.searchSection}>
                    <SearchInput
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>

                {/* 1. Add Button at the TOP */}
                <div className={styles.menuHeaderSection}>
                    <ButtonWithTextAndImage
                        text="Add Lab Result"
                        icon={<FaPlus color='blue' />}
                        variant="secondary"
                        onClick={onAddPatient}
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
                                    <div className={styles.patientRightSection}>
                                        <span className={styles.patientAge}>{patient.age}y</span>
                                        <div onClick={(e) => {
                                            e.preventDefault();
                                            onDeletePatient?.(patient.id);
                                        }} style={{ cursor: 'pointer', padding: '5px' }}>
                                            <MdDelete color='red' />
                                        </div>
                                    </div>

                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <div className={styles.emptyState}>No matches found</div>
                    )}
                </div>
            </div>
        </div >
    )
}
