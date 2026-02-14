import type { LabTest, TestValue } from '../../tests.type';
import styles from './StandardFieldsPrint.module.css';

interface Props {
  test: LabTest;
  testValues: Record<string, TestValue>;
}

export default function StandardPrint({ test, testValues }: Props) {
  return (
    <table className={styles.mainTable}>
      <thead>
        <tr>
          <th className={styles.colInvest}>Investigation</th>
          <th className={styles.colResult}>Result</th>
          <th className={styles.colUnit}>Unit</th>
          <th className={styles.colRef}>Reference Range</th>
        </tr>
      </thead>
      <tbody>
        {test.fields.map((field) => {
          const value = testValues[`${test.id}-${field.key}`];
          
          return (
            <tr key={field.key}>
              <td className={styles.colInvest}>{field.label || field.key}</td>
              <td className={styles.colResult}>
                {value !== undefined && value !== '' ? String(value) : '-'}
              </td>
              <td className={styles.colUnit}>{field.unit || ''}</td>
              <td className={styles.colRef}>
                {field.references && field.references.length > 0
                  ? field.references.map((r) => `${r.min} - ${r.max}`).join(', ')
                  : 'N/A'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}