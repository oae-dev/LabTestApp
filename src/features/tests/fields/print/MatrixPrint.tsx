
import type { MatrixValue } from '../../tests.type';
import styles from './MatrixPrint.module.css';

interface Props {
    field: {
        key: string;
        rows?: { key: string; label: string }[];
        columns?: string[];
    };
    values: MatrixValue | undefined;
}

export default function MatrixPrintView({field, values  }: Props) {
  const { rows = [], columns = [] } = field;
 return (
        <div className={styles.widalContainer}>
            <table className={styles.widalTable}>
                <thead>
                    <tr>
                        <th className={styles.widalAntigenHeader}>Antigen / Parameter</th>
                        {columns.map(col => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        const selectedTiters = values?.values[row.key]?.split(',') || [];
                        return (
                            <tr key={row.key}>
                                <td className={styles.widalRowLabel}>{row.label}</td>
                                {columns.map(col => (
                                    <td
                                        key={col}
                                        className={`${styles.widalCell} ${
                                            selectedTiters.includes(col) ? styles.positive : ''
                                        }`}
                                    >
                                        {selectedTiters.includes(col) ? "+" : "-"}
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