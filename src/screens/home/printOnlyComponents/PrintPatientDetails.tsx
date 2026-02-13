import { type LabPatientDetails } from '../types/patient';
import style from '../../../css/print/PrintPatientHomeDetail.module.css';

export default function PrintPatientDetails({ patient }: { patient: LabPatientDetails }) {
  return (
    <div className={style.container} >
      <h2 className={style.heading}>Patient Details</h2>

      <div className={style.columns}>
        {/* Left Column */}
        <div className={style.column}>
          <div className={style.row}>
            <span className={style.label}>Name</span>
            <span className={style.value}>{patient.name}</span>
          </div>

          <div className={style.row}>
            <span className={style.label}>Age</span>
            <span className={style.value}>{patient.age}</span>
          </div>

          <div className={style.row}>
            <span className={style.label}>Gender</span>
            <span className={style.value}>{patient.gender}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className={style.column}>
          <div className={style.row}>
            <span className={style.label}>Phone</span>
            <span className={style.value}>{patient.phone}</span>
          </div>

          <div className={style.row}>
            <span className={style.label}>Email</span>
            <span className={style.value}>{patient.email}</span>
          </div>

          <div className={style.row}>
            <span className={style.label}>Address</span>
            <span className={style.value}>{patient.address}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
