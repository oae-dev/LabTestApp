import ButtonWithTextAndImage from '../../common/buttonWithTextAndImage'
import { FaPlus } from 'react-icons/fa'
import type { LabPacientDetails } from './types/pacient'
import { NavLink } from 'react-router'

type LabSideBarProps = {
    pacients: LabPacientDetails[]
    onPlusTapped?: () => void
}

export default function LabSideBar({pacients, onPlusTapped }: LabSideBarProps) {
  return (
    <>
    {pacients.map((pacient) => (
  <NavLink
    key={pacient.id}
    to={`/home/${pacient.id}`}
    state={pacient}
    className={({ isActive }) =>
      `patient-link ${isActive ? "active" : ""}`
    }
  >
    <div className="patient-item">
      <span className="patient-name">{pacient.name}</span>
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
