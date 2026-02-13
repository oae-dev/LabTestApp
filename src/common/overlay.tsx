import { useRef } from "react";
import styles from "./Overlay.module.css";

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Overlay({ isOpen, onClose, children }: OverlayProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
