import React from 'react'
import styles from './DynamicButton.module.css';

interface CustomButtonStyles extends React.CSSProperties {
    '--bg-color'?: string;
    '--text-color'?: string;
}

type DynamicButtonProps = {
    children: React.ReactNode
    color?: string
    backgroundColor?: string
    onClick?: () => void
    horzontalPadding?: number
    type?: "button" | "submit" | "reset" | undefined
    verticalPadding?: number
}

export default function DynamicButton({
    children, 
    color = "#ffffff", 
    backgroundColor = "#3b82f6", 
    onClick, 
    horzontalPadding = 20, 
    verticalPadding = 10, 
    type
}: DynamicButtonProps) {

  const buttonStyle: CustomButtonStyles = {
    '--bg-color': backgroundColor,
    '--text-color': color,
    padding: `${verticalPadding}px ${horzontalPadding}px`,
  };

  return (
   <button
      className={styles.customButton}
      style={buttonStyle}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}