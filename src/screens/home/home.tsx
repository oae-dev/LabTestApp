import { useLocation } from 'react-router-dom'
import PaisentDetails from './components/PaisentDetails';
import ButtonWithTextAndImage from '../../common/buttonWithTextAndImage';
import { TiPrinter } from 'react-icons/ti';
import type { LabPatientDetails } from './types/patient';
import TestDetials from './components/TestDetials';

export default function Home() {
  const location = useLocation();
  const patient: LabPatientDetails = location.state

  if (!patient) {
    return <div>No patient data available</div>;
  }

  return (
   <div style={{ display: 'flex', width:'100%', flexDirection:'column', overflowY:'auto', padding:'20px', position:'relative' }}>
      <PaisentDetails patient={patient} />
      <hr />

        <TestDetials key={patient.id} patient={patient} />
        
      <div style={{
        position:'absolute',
        bottom: '20px',
        right:'20px'
      }}><ButtonWithTextAndImage
          text='Print'
          icon={<TiPrinter />}
          variant='primary'
          onClick={() => alert('View Lab Results clicked')}
        />
      </div>
    </div>
  )
}
