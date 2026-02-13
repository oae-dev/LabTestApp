import styles from '../../../css/print/PrintTestDetails.module.css';
import { LAB_TESTS } from '../types/test';

type Props = {
    selectedTestIds: string[];
    testValues: Record<string, string>;
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
                    
                    {cat.tests.map(test => (
                        <div key={test.id} className={styles.testWrapper}>
                            <h3 className={styles.testName}>{test.name}</h3>
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
                                                {testValues[`${test.id}-${field.key}`] || '-'}
                                            </td>
                                            <td className={styles.unitCell}>{field.unit}</td>
                                            <td className={styles.refCell}>
                                                {field.references.map(r => `${r.min} - ${r.max}`).join(', ')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
}