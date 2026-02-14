
import type { LabTest, MatrixValue, TestValue } from '../../tests.type';
import styles from './MatrixPrint.module.css';

interface Props {
  test: LabTest;
  testValues: Record<string, TestValue>;
}

export default function MatrixPrintView({ test, testValues }: Props) {
 const field = test.fields[0]; // Widal usually has one matrix field
  const val = testValues[`${test.id}-${field.key}`] as MatrixValue;
  
  return (
    <div className={styles.widalContainer}>
      <table className={styles.widalTable}>
        <thead>
          <tr>
            <th className={styles.widalAntigenHeader}>Antigen / Parameter</th>
            {field.columns?.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {field.rows?.map((row) => {
            const selectedTiters = val?.values?.[row.key]?.split(',') || [];
            return (
              <tr key={row.key}>
                <td className={styles.widalRowLabel}>{row.label}</td>
                {field.columns?.map((col) => (
                  <td key={col} className={styles.widalCell}>
                    {selectedTiters.includes(col) ? "POSITIVE (+)" : "Negative (-)"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}