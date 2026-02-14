import styles from './StandardInput.module.css';

type Props = {
  label: string;
  unit?: string;
  value: string | number;
  inputType?: 'number' | 'text';
  onChange: (val: string) => void;
  isAbnormal?: boolean; // Optional: for red text if out of range
};

export default function StandardInput({ 
  label, 
  unit, 
  value, 
  inputType = 'text', 
  onChange,
  isAbnormal 
}: Props) {
  return (
    <div className={styles.fieldContainer}>
      <div className={styles.labelRow}>
        <label className={styles.fieldLabel}>{label}</label>
        {unit && <span className={styles.unitTag}>{unit}</span>}
      </div>

      <div className={`${styles.inputWrapper} ${isAbnormal ? styles.abnormal : ''}`}>
        <input
          type={inputType === 'number' ? 'number' : 'text'}
          className={styles.inputField}
          placeholder="---"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}