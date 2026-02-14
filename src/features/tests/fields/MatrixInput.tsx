import styles from './MatrixInput.module.css';

type MatrixValue = {
  type: 'matrix';
  values: Record<string, string>;
};

type Props = {
  fieldKey: string;
  rows: { key: string; label: string }[];
  columns: string[];
  value?: MatrixValue;
  onChange: (val: MatrixValue) => void;
};

export default function MatrixInput({ rows, columns, value, onChange }: Props) {

  const currentValues = value?.values ?? {};

  const handleSelect = (rowKey: string, column: string) => {
    // 1. Get current selections for this specific row, filtering out any empty strings
    const currentSelections = currentValues[rowKey]
      ? currentValues[rowKey].split(',').filter(Boolean)
      : [];

    let newSelections;
    if (currentSelections.includes(column)) {
      // 2. If already selected, remove it
      newSelections = currentSelections.filter(c => c !== column);
    } else {
      // 3. If not selected, add it to the list
      newSelections = [...currentSelections, column];
    }

    // 4. Update the state by joining the array back into a comma-separated string
    onChange({
      type: 'matrix',
      values: {
        ...currentValues,
        [rowKey]: newSelections.join(','),
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.matrixTable}>
          <thead>
            <tr>
              <th>Antigen / Parameter</th>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td className={styles.rowLabel}>{row.label}</td>
                {columns.map((column) => {

                  const rowData = currentValues[row.key] || "";
                  const isSelected = rowData.split(',').includes(column);

                  return (
                    <td key={column} className={styles.cell}>
                      <button
                        type="button"
                        onClick={() => handleSelect(row.key, column)}
                        className={`${styles.titerBtn} ${isSelected ? styles.selected : ''}`}
                      >
                        {isSelected ? "+" : "−"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotBlue}`}></span>
          <span>Reactive (+)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotGray}`}></span>
          <span>Non-Reactive (−)</span>
        </div>
      </div>
    </div>
  );
}