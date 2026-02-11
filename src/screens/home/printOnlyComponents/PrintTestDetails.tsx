import styles from '../../../css/print/PrintTestDetails.module.css';
import { LAB_TESTS } from '../types/test';

type Props = {
    selectedTestIds: string[];
    testValues: Record<string, string>;
};

export default function PrintTestDetails({
    selectedTestIds,
    testValues,
}: Props) {
    const grouped = LAB_TESTS
        .map(cat => ({
            ...cat,
            tests: cat.tests.filter(t => selectedTestIds.includes(t.id)),
        }))
        .filter(cat => cat.tests.length > 0);

    return (
        <div className={styles.root}>
            {grouped.map(cat => (
                <div key={cat.id} className={styles.category}>
                    <h3 className={styles.categoryTitle}>{cat.name}</h3>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Test</th>
                                <th>Result</th>
                                <th>Unit</th>
                                <th>Reference</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cat.tests.map(test =>
                                test.fields.map(field => (
                                    <tr key={test.id + field.key}>
                                        <td>{test.name}</td>
                                        <td>{testValues[`${test.id}-${field.key}`] || '-'}</td>
                                        <td>{field.unit}</td>
                                        <td>
                                            {field.references
                                                .map(r => `${r.min}-${r.max}`)
                                                .join(', ')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
