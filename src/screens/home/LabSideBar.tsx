import ButtonWithTextAndImage from '../../common/buttonWithTextAndImage'
import { FaPlus } from 'react-icons/fa'
import type { LabpatientDetails } from './types/patient'
import { NavLink } from 'react-router'

type LabSideBarProps = {
    patients: LabpatientDetails[]
    onPlusTapped?: () => void
}

export default function LabSideBar({patients, onPlusTapped }: LabSideBarProps) {
  return (
    <>
    {patients.map((patient) => (
  <NavLink
    key={patient.id}
    to={`/home/${patient.id}`}
    state={patient}
    className={({ isActive }) =>
      `patient-link ${isActive ? "active" : ""}`
    }
  >
    <div className="patient-item">
      <span className="patient-name">{patient.name}</span>
    </div>
  </NavLink>
))}

    <ButtonWithTextAndImage
  text="Add Lab Result"
  icon={<FaPlus color='blue'/>}
  variant="primary"
  onClick={onPlusTapped}
/>
    
    </>
    
  )
}
