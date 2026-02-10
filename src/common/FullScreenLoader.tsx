import styles from '../css/common/FullScreenLoader.module.css';

type FullScreenLoaderProps = {
  visible: boolean;
};

export default function FullScreenLoader({ visible }: FullScreenLoaderProps) {
  if (!visible) return null;

  return (
     <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
}
