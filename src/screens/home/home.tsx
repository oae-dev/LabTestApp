import { useLocation, useOutletContext } from 'react-router-dom'
import ButtonWithTextAndImage from '../../common/buttonWithTextAndImage';
import { TiPrinter } from 'react-icons/ti';
import type { LabPatientDetails } from './types/patient';
import { LAB_TESTS, type PatientTestsMap } from './types/test';
import '../../css/print/print.css';
import PrintTestDetails from './printOnlyComponents/PrintTestDetails';
import LabSearchPicker from './components/LabSearchPicker';
import TestGrouping from './components/TestGrouping';
import PatientDetails from './components/PatientDetails';
import PrintPatientDetails from './printOnlyComponents/PrintPatientDetails';

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
      <div style={{ flex: 1, padding: '20px', color: '#64748b' }}>
        Select a patient from the header to begin.
      </div>
    );
  }

  const state =
    patientTests[patient.id] ?? {
      selectedCats: [],
      selectedTestIds: [],
      testValues: {},
    };

  const toggleTest = (testId: string) => {
    const nextTestIds = state.selectedTestIds.includes(testId)
      ? state.selectedTestIds.filter(id => id !== testId)
      : [...state.selectedTestIds, testId];

    const nextSelectedCats = LAB_TESTS
      .filter(cat => cat.tests.some(t => nextTestIds.includes(t.id)))
      .map(cat => cat.id);

    setPatientTests(prev => ({
      ...prev,
      [patient.id]: { ...state, selectedTestIds: nextTestIds, selectedCats: nextSelectedCats }
    }));
  };

  const handleInputChange = (testId: string, fieldKey: string, value: string) => {
    setPatientTests(prev => ({
      ...prev,
      [patient.id]: {
        ...state,
        testValues: { ...state.testValues, [`${testId}-${fieldKey}`]: value }
      }
    }));
  };


  return (
    <>
      {/* PRINT UI */}
      <div className="print-only">
        <PrintPatientDetails patient={patient} />
        <hr />
        <PrintTestDetails
          selectedTestIds={state.selectedTestIds}
          testValues={state.testValues}
        />
      </div>

      {/* SCREEN UI */}
      <div className="screen-only" style={{ display: 'flex', width: '100%', height: '100%' }}>

        {/* Sidebar for Test Selection */}
        <aside className='sidebar'>
          <LabSearchPicker
            selectedCats={state.selectedCats}
            selectedTestIds={state.selectedTestIds}
            onTestToggle={toggleTest}
          />
        </aside>

        {/* Main Content Area */}
        <main style={{ display: 'flex', width: '100%', flexDirection: 'column', overflowY: 'auto', padding: '10px 20px', position: 'relative' }}>


          <PatientDetails patient={patient} />
          <hr />
          <TestGrouping
            selectedTestIds={state.selectedTestIds}
            testValues={state.testValues}
            toggleTest={toggleTest}
            handleInputChange={handleInputChange}
            patientName={patient.name}
            patientGender={patient.gender}
            patientAge={patient.age}
          />
        </main>

        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '35px'
        }}>
          <ButtonWithTextAndImage
            text='Print'
            icon={<TiPrinter />}
            variant='primary'
            onClick={() => window.print()}
          />
        </div>
      </div>
    </>

  )
}
