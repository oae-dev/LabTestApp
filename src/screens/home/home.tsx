import { useLocation, useOutletContext } from 'react-router-dom'
import PaisentDetails from './components/PaisentDetails';
import ButtonWithTextAndImage from '../../common/buttonWithTextAndImage';
import { TiPrinter } from 'react-icons/ti';
import type { LabPatientDetails } from './types/patient';
import TestDetials from './components/TestDetials';
import type { PatientTestsMap } from './types/test';

type OutletContextType = {
  patientTests: PatientTestsMap;
  setPatientTests: React.Dispatch<React.SetStateAction<PatientTestsMap>>;
};

export default function Home() {
  const location = useLocation();
  const patient: LabPatientDetails = location.state

  const { patientTests, setPatientTests } = useOutletContext<OutletContextType>();

  const patientTestState =
    patientTests[patient.id] ?? {
      selectedCats: [],
      selectedTestIds: [],
      testValues: {},
    };


  if (!patient) {
    return <div>No patient data available</div>;
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', overflowY: 'auto', padding: '20px', position: 'relative' }}>
      <PaisentDetails patient={patient} />
      <hr />

      <TestDetials
        patient={patient}
        state={patientTestState}
        onChange={(nextState) => {
          setPatientTests(prev => ({
            ...prev,
            [patient.id]: nextState,
          }));
        }}
      />

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '35px'
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
