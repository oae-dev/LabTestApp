import { LAB_TESTS } from '../../tests/tests.utils';
import type { MatrixValue, TestValue } from '../../tests/tests.type';
import styles from './PrintTestReport.module.css';

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
                        // DETECT IF THIS IS THE WIDAL TEST
                        const isWidal = test.id === 'widal';

                        return (
                            <div key={test.id} className={styles.testWrapper}>
                                <h3 className={styles.testName}>{test.name}</h3>

                                {isWidal ? (
                                    /* NEW DESIGN FOR WIDAL MATRIX */
                                    <div className={styles.widalContainer}>
                                        <table className={styles.widalTable}>
                                            <thead>
                                                <tr>
                                                    <th className={styles.widalAntigenHeader}>Antigen / Parameter</th>
                                                    {test.fields[0].columns?.map(col => (
                                                        <th key={col}>{col}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {test.fields[0].rows?.map(row => {
                                                    const val = testValues[`${test.id}-${test.fields[0].key}`] as MatrixValue;
                                                    const selectedTiters = val?.values[row.key]?.split(',') || [];
                                                    
                                                    return (
                                                        <tr key={row.key}>
                                                            <td className={styles.widalRowLabel}>{row.label}</td>
                                                            {test.fields[0].columns?.map(col => (
                                                                <td key={col} className={styles.widalCell}>
                                                                    {selectedTiters.includes(col) ? "+" : "-"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    /* OLD DESIGN FOR ALL OTHER TESTS */
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
                                            {test.fields.map(field => (
                                                <tr key={field.key}>
                                                    <td className={styles.fieldName}>{field.label || field.key}</td>
                                                    <td className={styles.resultCell}>
                                                        {String(testValues[`${test.id}-${field.key}`] || '-')}
                                                    </td>
                                                    <td className={styles.unitCell}>{field.unit}</td>
                                                    <td className={styles.refCell}>
                                                        {field.references?.map(r => `${r.min} - ${r.max}`).join(', ') || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        );
                    })}
                </section>
            ))}
        </div>
    );
}