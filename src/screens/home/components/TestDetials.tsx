import React, { useMemo, useState } from 'react';
import LabSearchPicker from './LabSearchPicker';
import { LAB_TESTS } from '../types/test';
import TestChips from './testChips';
import type { LabPatientDetails } from '../types/patient';

export default function TestDetails({ patient }: { patient: LabPatientDetails }) {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [testValues, setTestValues] = useState<Record<string, string>>({});

  const toggleTest = (id: string) => {
    setSelectedTestIds(prev => 
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const handleInputChange = (testId: string, fieldKey: string, value: string) => {
    setTestValues(prev => ({ ...prev, [`${testId}-${fieldKey}`]: value }));
  };

  const testsToSelectFrom = useMemo(() => {
    return LAB_TESTS.filter(cat => selectedCats.includes(cat.id));
  }, [selectedCats]);

  const groupedSelection = useMemo(() => {
    return LAB_TESTS.map(cat => ({
      ...cat,
      tests: cat.tests.filter(t => selectedTestIds.includes(t.id))
    })).filter(cat => cat.tests.length > 0);
  }, [selectedTestIds]);

  return (
    <div style={{ padding: '20px' }}>
      <p>Available Tests</p>
      
      <LabSearchPicker 
        selectedCats={selectedCats} 
        setSelectedCats={setSelectedCats} 
      />

      {/* Category Selection Result (Chips) */}
      {selectedCats.length > 0 && (
      <TestChips 
        testsToSelectFrom={testsToSelectFrom} 
        toggleTest={toggleTest} 
        selectedTestIds={selectedTestIds}
      />
      )}

      <h1 style={{ marginTop: '40px', fontSize: '24px' }}>Selected Tests</h1>
      
      {/* Entry List Grouped by Category */}
      <div style={{ marginTop: '20px' }}>
        {groupedSelection.length > 0 ? (
          groupedSelection.map((cat) => (
            <div key={cat.id} style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: 'bold', color: '#3b82f6', fontSize: '14px', marginBottom: '10px' }}>{cat.name}</p>
              
              {cat.tests.map((test) => (
                <div key={test.id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>{test.name}</span>
                    <button onClick={() => toggleTest(test.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
                    {test.fields.map(field => (
                      <div key={field.key} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '12px', color: '#64748b' }}>{field.label} ({field.unit})</label>
                        <input 
                          type="text" 
                          style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '4px' }}
                          value={testValues[`${test.id}-${field.key}`] || ''}
                          onChange={(e) => handleInputChange(test.id, field.key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p style={{ color: '#94a3b8' }}>No tests selected for {patient.name}</p>
        )}
      </div>
    </div>
  );
}