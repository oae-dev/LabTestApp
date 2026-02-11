import { useMemo } from 'react';
import LabSearchPicker from './LabSearchPicker';
import { LAB_TESTS } from '../types/test';
import TestChips from './testChips';
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

  const toggleTest = (id: string) => {
    const nextIds = selectedTestIds.includes(id)
      ? selectedTestIds.filter(tid => tid !== id)
      : [...selectedTestIds, id];

    onChange({
      ...state,
      selectedTestIds: nextIds,
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


  const testsToSelectFrom = useMemo(() => {
    return LAB_TESTS.filter(cat => selectedCats.includes(cat.id));
  }, [selectedCats]);

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
      <h1 className="test-heading">Select Tests for {patient.name}</h1>

      <LabSearchPicker
        selectedCats={selectedCats}
        onChange={(nextCats) => {
          // find categories that were REMOVED
          const removedCats = selectedCats.filter(
            catId => !nextCats.includes(catId)
          );

          // collect all test IDs under removed categories
          const removedTestIds = LAB_TESTS
            .filter(cat => removedCats.includes(cat.id))
            .flatMap(cat => cat.tests.map(t => t.id));

          // clean selected tests
          const nextSelectedTestIds = selectedTestIds.filter(
            id => !removedTestIds.includes(id)
          );

          // clean test values
          const nextTestValues = Object.fromEntries(
            Object.entries(testValues).filter(
              ([key]) => !removedTestIds.some(id => key.startsWith(id + '-'))
            )
          );

          onChange({
            selectedCats: nextCats,
            selectedTestIds: nextSelectedTestIds,
            testValues: nextTestValues,
          });
        }}
      />

      {/* Category Selection Result (Chips) */}
      {selectedCats.length > 0 && (
        <TestChips
          testsToSelectFrom={testsToSelectFrom}
          toggleTest={toggleTest}
          selectedTestIds={selectedTestIds}
        />
      )}

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


    </div>
  );
}