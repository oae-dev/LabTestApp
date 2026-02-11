import React from 'react'
import type { LabCategory } from '../types/test';

type TestChipsProps = {
  testsToSelectFrom: LabCategory[];
  toggleTest: (id: string) => void;
  selectedTestIds: string[];
};

export default function TestChips({ testsToSelectFrom, toggleTest, selectedTestIds }: TestChipsProps) {
  return (
    <div style={{ background: '#f8fafc', borderRadius: '12px' }}>
      {testsToSelectFrom.map(cat => (
        <div key={cat.id} style={{ marginBottom: '10px' }}>
          <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', margin: '0' }}>{cat.name}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
            {cat.tests.map(test => (
              <button
                key={test.id}
                onClick={() => toggleTest(test.id)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', cursor: 'pointer',
                  backgroundColor: selectedTestIds.includes(test.id) ? '#3b82f6' : 'white',
                  color: selectedTestIds.includes(test.id) ? 'white' : '#1e293b',
                }}
              >
                {test.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
