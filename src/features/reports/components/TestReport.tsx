import DynamicButton from '../../../common/buttons/dynamicButton';
import MatrixInput from '../../tests/fields/MatrixInput';
import StandardInput from '../../tests/fields/StandardInput';
import type { MatrixValue, ReferenceRule, TestField, TestValue } from '../../tests/tests.type';
import { LAB_TESTS } from '../../tests/tests.utils';
import styles from './TestReport.module.css';

type Props = {
    selectedTestIds: string[];
    testValues: Record<string, TestValue>;
    toggleTest: (id: string) => void;
    handleInputChange: (testId: string, fieldKey: string, value: TestValue) => void;
    patientName: string;
    patientGender: 'male' | 'female' | '';
    patientAge?: number;
};

export default function TestReport({
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
    const renderFieldInput = (testId: string, field: TestField) => {
        const value = testValues[`${testId}-${field.key}`];

        switch (field.inputType) {
            case 'matrix':
                return (
                    <MatrixInput
                        rows={field.rows ?? []}
                        columns={field.columns ?? []}
                        value={value as MatrixValue | undefined}
                        onChange={(val) => handleInputChange(testId, field.key, val)}
                        fieldKey={field.key} />
                );

            default:
                return (
                    <StandardInput
                        label={field.label}
                        unit={field.unit}
                        inputType={field.inputType === 'number' ? 'number' : 'text'}
                        value={typeof value === 'string' || typeof value === 'number' ? String(value) : ''}
                        onChange={(val) => handleInputChange(testId, field.key, val)}
                    />
                );
        }
    };



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
                                    <div key={field.key} className={`${styles.fieldWrapper} ${field.inputType === 'matrix' ? styles.matrix : ''}`}>

                                        <div className={styles.inputContainer}>
                                            {
                                                renderFieldInput(test.id, field)
                                            }
                                        </div>

                                        {field.references && field.references.length > 0 && (
                                            <div className={styles.referenceBox}>
                                                <span className={styles.refLabel}>Ref Range:</span>
                                                <span className={styles.refValue}>
                                                    {field.references
                                                        .filter(ref => matchReference(ref, patientGender, patientAge))
                                                        .map(ref => `${ref.min} - ${ref.max}`)
                                                        .join(' | ') || 'N/A'}
                                                </span>
                                            </div>
                                        )}

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


