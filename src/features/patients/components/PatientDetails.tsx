import { FaUser, FaPhoneAlt, FaClock, FaVenusMars } from 'react-icons/fa';
import style from './PatientDetail.module.css';
import type { LabPatientDetails } from '../patient.type';

export default function PatientDetails({ patient }: { patient: LabPatientDetails }) {
  return (
    <div className={style.compactContainer}>
      <div className={style.infoItem}>
        <FaUser className={style.icon} />
        <span className={style.label}>Name:</span>
        <span className={style.value}>{patient.name}</span>
      </div>

      <div className={style.divider} />

      <div className={style.infoItem}>
        <FaClock className={style.icon} />
        <span className={style.label}>Age:</span>
        <span className={style.value}>{patient.age}y</span>
      </div>

      <div className={style.divider} />

      <div className={style.infoItem}>
        <FaVenusMars className={style.icon} />
        <span className={style.label}>Gender:</span>
        <span className={style.value}>{patient.gender}</span>
      </div>

      <div className={style.divider} />

      <div className={style.infoItem}>
        <FaPhoneAlt className={style.icon} />
        <span className={style.label}>Phone:</span>
        <span className={style.value}>{patient.phone}</span>
      </div>
    </div>
  );
}