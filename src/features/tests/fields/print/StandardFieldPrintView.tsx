import type { LabTest, TestValue } from '../../tests.type';
import styles from './StandardFieldsPrint.module.css';

interface Props {
  test: LabTest;
  testValues: Record<string, TestValue>;
}

export default function StandardFieldPrintView({ test, testValues }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.fieldName}>Investigation</th>
          <th className={styles.resultCell}>Result</th>
          <th className={styles.unitCell}>Unit</th>
          <th className={styles.refCell}>Reference Range</th>
        </tr>
      </thead>
      <tbody>
        {test.fields.map((field) => (
          <tr key={field.key}>
            <td className={styles.fieldName}>{field.label || field.key}</td>
            <td className={styles.resultCell}>
              {String(testValues[`${test.id}-${field.key}`] || '-')}
            </td>
            <td className={styles.unitCell}>{field.unit || '-'}</td>
            <td className={styles.refCell}>
              {field.references && field.references.length > 0
                ? field.references.map((r) => `${r.min} - ${r.max}`).join(', ')
                : 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}