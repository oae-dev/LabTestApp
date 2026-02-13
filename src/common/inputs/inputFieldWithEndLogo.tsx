import React from 'react'
import  styles from './InputFieldWithEndLogo.module.css'

export interface InputFieldWithEndLogoProps {
    type: "text" | "password" | "email" | "number"
    title?: string
    placeholder: string
    value: string
    setValue: (value: string) => void
    icon: React.ReactNode
}

export default function InputFieldWithEndLogo({ type, title, placeholder, value, setValue, icon }: InputFieldWithEndLogoProps) {
    return (
        <div className={styles.container}>
            <label>{title}</label>
            <div className={styles.inputBoxWrapper}>

                <input type={type} placeholder={placeholder} className={styles.inputBox}
                    value={value}
                    onChange={(event) => setValue(event.target.value)} />
                <div className={styles.inputIcon}>{icon}</div>
            </div>
        </div>

    )
}
