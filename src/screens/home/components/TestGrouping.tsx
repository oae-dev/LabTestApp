import DynamicButton from '../../../common/dynamicButton';
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
        <>
            {groupedSelection.map(cat => (
                <div key={cat.id} className={styles.category}>
                    <p className={styles.categoryName}>{cat.name}</p>

                    {cat.tests.map(test => (
                        <div key={test.id} className={styles.testCard}>
                            <div className={styles.testHeader}>
                                <span className={styles.testName}>{test.name}</span>
                                <DynamicButton 
                                onClick={() => toggleTest(test.id)} 
                                color='white' backgroundColor='#3b82f6'>
                                    Remove</DynamicButton>
                            </div>

                            <div className={styles.fields}>
                                {test.fields.map(field => (
                                    <div key={field.key} className={styles.fieldWrapper}>
                                        <div className={styles.labelRow}>
                                            <label className={styles.fieldLabel}>{field.label}</label>
                                            <span className={styles.unitTag}>{field.unit}</span>
                                        </div>

                                        <div className={styles.inputContainer}>
                                            <input
                                                type="text"
                                                className={styles.classicInput}
                                                placeholder="Enter result..."
                                                value={testValues[`${test.id}-${field.key}`] || ''}
                                                onChange={(e) => handleInputChange(test.id, field.key, e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.referenceBox}>
                                            <span className={styles.refLabel}>Ref Range:</span>
                                            <span className={styles.refValue}>
                                                {field.references
                                                    .filter(ref => matchReference(ref, patientGender, patientAge))
                                                    .map(ref => `${ref.min} - ${ref.max}`)
                                                    .join(' | ') || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}
