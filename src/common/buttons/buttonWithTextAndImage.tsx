import React from "react";
import styles from "./ButtonWithTextAndImage.module.css";

type ButtonWithTextAndImageProps = {
  icon?: React.ReactNode;
  text: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
};

export default function ButtonWithTextAndImage({
  icon,
  text,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonWithTextAndImageProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </button>
  );
}
