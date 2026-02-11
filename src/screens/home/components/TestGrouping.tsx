import styles from '../../../css/TestGrouping.module.css';
import { LAB_TESTS, type ReferenceRule } from '../types/test';

type Props = {
    selectedTestIds: string[];
    testValues: Record<string, string>;
    toggleTest: (id: string) => void;
    handleInputChange: (testId: string, fieldKey: string, value: string) => void;
    patientName: string;
    patientGender: 'male' | 'female' | '';
    patientAge?: number;
};

export default function TestGrouping({
    selectedTestIds,
    testValues,
    toggleTest,
    handleInputChange,
    patientName,
    patientGender,
    patientAge,
}: Props) {
    const groupedSelection = LAB_TESTS
        .map(cat => ({
            ...cat,
            tests: cat.tests.filter(t => selectedTestIds.includes(t.id)),
        }))
        .filter(cat => cat.tests.length > 0);

    const matchReference = (
        ref: ReferenceRule,
        gender: string,
        age?: number
    ) => {
        if (ref.gender && ref.gender !== gender) return false;
        if (age !== undefined) {
            if (ref.minAge !== undefined && age < ref.minAge) return false;
            if (ref.maxAge !== undefined && age > ref.maxAge) return false;
        }
        return true;
    };

    if (groupedSelection.length === 0) {
        return <p className={styles.empty}>No tests selected for {patientName}</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className="test-heading">Selected Tests</h1>
            {groupedSelection.map(cat => (
                <div key={cat.id} className={styles.category}>
                    <p className={styles.categoryName}>{cat.name}</p>

                    {cat.tests.map(test => (
                        <div key={test.id} className={styles.testCard}>
                            <div className={styles.testHeader}>
                                <span className={styles.testName}>{test.name}</span>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => toggleTest(test.id)}
                                >
                                    Remove
                                </button>
                            </div>

                            <div className={styles.fields}>
                                {test.fields.map(field => (
                                    <div key={field.key} className={styles.field}>
                                        <label className={styles.label}>
                                            {field.label} ({field.unit})
                                            <br />
                                            <span className={styles.reference}>
                                                Reference:{' '}
                                                {field.references
                                                    .filter(ref => matchReference(ref, patientGender, patientAge))
                                                    .map(ref => `${ref.min}-${ref.max} ${field.unit}`)
                                                    .join(' | ')}
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={testValues[`${test.id}-${field.key}`] || ''}
                                            onChange={(e) =>
                                                handleInputChange(test.id, field.key, e.target.value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
