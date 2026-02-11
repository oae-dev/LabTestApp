import { useLocation, useOutletContext } from 'react-router-dom'
import PaisentDetails from './components/PaisentDetails';
import ButtonWithTextAndImage from '../../common/buttonWithTextAndImage';
import { TiPrinter } from 'react-icons/ti';
import type { LabPatientDetails } from './types/patient';
import TestDetials from './components/TestDetials';
import type { PatientTestsMap } from './types/test';
import '../../css/print/print.css';
import PrintTestDetails from './printOnlyComponents/PrintTestDetails';

type OutletContextType = {
  patientTests: PatientTestsMap;
  setPatientTests: React.Dispatch<React.SetStateAction<PatientTestsMap>>;
};

export default function Home() {
  const location = useLocation();

  const patient = location.state as LabPatientDetails | null;

  const { patientTests, setPatientTests } =
    useOutletContext<OutletContextType>();

  if (!patient) {
    return (
      <div style={{ padding: '20px', color: '#64748b' }}>
        Select a patient from the sidebar to begin.
      </div>
    );
  }

  const patientTestState =
    patientTests[patient.id] ?? {
      selectedCats: [],
      selectedTestIds: [],
      testValues: {},
    };

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', overflowY: 'auto', padding: '0px 20px', position: 'relative' }}>
      <PaisentDetails patient={patient} />
      <hr />

      {/* SCREEN UI */}
      <div className="screen-only">
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
      </div>

      {/* PRINT UI */}
      <div className="print-only">
        <PrintTestDetails
          selectedTestIds={patientTestState.selectedTestIds}
          testValues={patientTestState.testValues}
        />
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '35px'
      }}><ButtonWithTextAndImage
          text='Print'
          icon={<TiPrinter />}
          variant='primary'
          onClick={() => window.print()}
        />
      </div>
    </div>
  )
}
