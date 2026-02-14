import { useLocation, useOutletContext } from 'react-router-dom'
import ButtonWithTextAndImage from '../common/buttons/buttonWithTextAndImage';
import { TiPrinter } from 'react-icons/ti';
import '../css/print.css';
import TestReport from '../features/reports/components/TestReport';
import type { PatientTestsMap, TestValue } from '../features/tests/tests.type';
import type { LabPatientDetails } from '../features/patients/patient.type';
import { LAB_TESTS } from '../features/tests/tests.utils';
import PrintPatientDetails from '../features/patients/components/PrintPatientDetails';
import PatientDetails from '../features/patients/components/PatientDetails';
import LabSearchPicker from '../features/tests/components/LabSearchPicker';
import PrintTestDetails from '../features/reports/components/PrintTestReport';

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
    setPatientTests(prev => {
      const current = prev[patient.id] ?? {
        selectedCats: [],
        selectedTestIds: [],
        testValues: {},
      };

      const nextTestIds = current.selectedTestIds.includes(testId)
        ? current.selectedTestIds.filter(id => id !== testId)
        : [...current.selectedTestIds, testId];

      const nextSelectedCats = LAB_TESTS
        .filter(cat => cat.tests.some(t => nextTestIds.includes(t.id)))
        .map(cat => cat.id);

      return {
        ...prev,
        [patient.id]: {
          ...current,
          selectedTestIds: nextTestIds,
          selectedCats: nextSelectedCats,
        },
      };
    });
  };


  const handleInputChange = (
    testId: string,
    fieldKey: string,
    value: TestValue
  ) => {
    setPatientTests(prev => {
      const current = prev[patient.id] ?? {
        selectedCats: [],
        selectedTestIds: [],
        testValues: {},
      };

      return {
        ...prev,
        [patient.id]: {
          ...current,
          testValues: {
            ...current.testValues,
            [`${testId}-${fieldKey}`]: value,
          },
        },
      };
    });
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
          <TestReport
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
