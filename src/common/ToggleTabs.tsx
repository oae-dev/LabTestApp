import styles from "../css/common/ToggleTabs.module.css";

export type SegmentControlerProps = {
    segments: string[]
    value: string
    onChange: (value: string) => void
}

const ToggleTabs = ({ segments, value, onChange }:SegmentControlerProps) => {
  return (
    <div className={styles.segmentContainer}>
      {segments.map((segment, index) => (
        <button
          key={index}
          className={`${styles.segmentTab} ${
            value === segment ? styles.active : ""
          }`}
          onClick={() => onChange(segment)}
        >
          {segment}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;
