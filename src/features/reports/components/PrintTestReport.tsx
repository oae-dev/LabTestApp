import { LAB_TESTS } from '../../tests/tests.utils';
import type { MatrixValue, TestValue } from '../../tests/tests.type';
import styles from './PrintTestReport.module.css';
import MatrixPrintView from '../../tests/fields/print/MatrixPrint';
import StandardFieldPrintView from '../../tests/fields/print/StandardFieldPrintView';

type Props = {
  selectedTestIds: string[];
  testValues: Record<string, TestValue>;
};

export default function PrintTestDetails({ selectedTestIds, testValues }: Props) {
  const grouped = LAB_TESTS
    .map(cat => ({
      ...cat,
      tests: cat.tests.filter(t => selectedTestIds.includes(t.id)),
    }))
    .filter(cat => cat.tests.length > 0);

  return (
    <div className={styles.root}>
      {grouped.map(cat => (
        <section key={cat.id} className={styles.categoryBlock}>
          <h2 className={styles.categoryTitle}>{cat.name}</h2>

          {cat.tests.map(test => {
            
            switch (test.id) {
              case 'widal':
                return(
                <div key={test.id} className={styles.testWrapper}>
                <h3 className={styles.testName}>{test.name}</h3>
                <MatrixPrintView
                    field={test.fields[0]}
                    values={testValues[`${test.id}-${test.fields[0].key}`] as MatrixValue}
                  />
                </div>
                );
              default:
                return(
                <div key={test.id} className={styles.testWrapper}>
                <h3 className={styles.testName}>{test.name}</h3>
                 <StandardFieldPrintView
                    test={test}
                    testValues={testValues}
                  />
                </div>
                );
            }
          })}
        </section>
      ))}
    </div>
  );
}