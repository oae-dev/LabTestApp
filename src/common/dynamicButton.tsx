import React from 'react'

type DynamicButtonProps = {
    children: React.ReactNode
    color?: string
    backgroundColor?: string
    onClick?: () => void
    horzontalPadding?: number
    type?: "button" | "submit" | "reset" | undefined
    verticalPadding?: number
}

export default function DynamicButton({children, color, backgroundColor, onClick, horzontalPadding, verticalPadding = 10, type}: DynamicButtonProps) {
  return (
   <button
       style={{
        backgroundColor: color,
        padding: `${verticalPadding}px ${horzontalPadding}px`,
        borderRadius: 8,
        border: "none",
        color: `${backgroundColor}`,
        cursor: "pointer",
      }}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
