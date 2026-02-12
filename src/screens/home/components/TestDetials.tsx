import LabSearchPicker from './LabSearchPicker';
import { LAB_TESTS } from '../types/test';
import type { LabPatientDetails } from '../types/patient';
import TestGrouping from './TestGrouping';

type Props = {
  patient: LabPatientDetails;
  state: {
    selectedCats: string[];
    selectedTestIds: string[];
    testValues: Record<string, string>;
  };
  onChange: (next: Props["state"]) => void;
};


export default function TestDetails({ patient, state, onChange }: Props) {
  const { selectedCats, selectedTestIds, testValues } = state;

  const toggleTest = (testId: string) => {
  const nextTestIds = selectedTestIds.includes(testId)
    ? selectedTestIds.filter(id => id !== testId)
    : [...selectedTestIds, testId];

  // derive selected categories from selected tests
  const nextSelectedCats = LAB_TESTS
    .filter(cat => cat.tests.some(t => nextTestIds.includes(t.id)))
    .map(cat => cat.id);

  onChange({
    ...state,
    selectedTestIds: nextTestIds,
    selectedCats: nextSelectedCats,
  });
};


  const handleInputChange = (testId: string, fieldKey: string, value: string) => {
    onChange({
      ...state,
      testValues: {
        ...testValues,
        [`${testId}-${fieldKey}`]: value,
      },
    });
  };


  // const testsToSelectFrom = useMemo(() => {
  //   return LAB_TESTS.filter(cat => selectedCats.includes(cat.id));
  // }, [selectedCats]);

  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', gap:'10px'}}>

      {/* Category Selection Result (Chips) */}
      {/* {selectedCats.length > 0 && (
        <TestChips
          testsToSelectFrom={testsToSelectFrom}
          toggleTest={toggleTest}
          selectedTestIds={selectedTestIds}
        />
      )} */}

      {/* Entry List Grouped by Category */}

      <TestGrouping
        selectedTestIds={selectedTestIds}
        testValues={testValues}
        toggleTest={toggleTest}
        handleInputChange={handleInputChange}
        patientName={patient.name}
        patientGender={patient.gender}
        patientAge={patient.age}
      />

        <LabSearchPicker
        selectedCats={selectedCats}
        selectedTestIds={selectedTestIds}
        onTestToggle={toggleTest}
      />

    </div>
  );
}