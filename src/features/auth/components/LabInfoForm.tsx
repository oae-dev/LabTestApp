import React, { useState } from 'react';
import styles from './LabInfo.module.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { validateLabInfo } from '../auth.utils';
import { saveUserToLocalStorage, STORAGE_KEY_USER } from '../../../services/localStorage/UserInfo';
import DynamicButton from '../../../common/buttons/dynamicButton';

export default function LabInfoForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        labName: '',
        email: '',
        phone: '',
        address: '',
        logo: '',
    });
    const fileRef = React.useRef<HTMLInputElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm(prev => ({ ...prev, logo: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { isValid, errors } = validateLabInfo(form);

        if (!isValid) {
            const firstError = Object.values(errors)[0];
            alert(firstError);
            return;
        }

        const storedUser = localStorage.getItem(STORAGE_KEY_USER);
        if (!storedUser) return;

        const user = JSON.parse(storedUser);

        const updatedUser = {
            ...user,
            labInfo: form, 
        };

        saveUserToLocalStorage(updatedUser);
        navigate('/home');

    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.headerSection}>
                    <h2 className={styles.title}>Lab Registration</h2>
                    <p className={styles.subtitle}>Please fill in the details to set up your laboratory profile.</p>
                </div>

                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    {/* Logo Section */}
                    <div className={styles.logoField}>
                        <label className={styles.formLebel}>Laboratory Logo</label>

                        <div className={styles.logoUploadArea}>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                id="logo-upload"
                                hidden
                            />

                            <label htmlFor="logo-upload" className={styles.uploadTrigger}>
                                {form.logo ? (
                                    <div className={styles.logoWrapper}>
                                        <img
                                            src={form.logo}
                                            alt="Preview"
                                            className={styles.logoPreview}
                                        />

                                        <button
                                            type="button"
                                            className={styles.removeLogoBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setForm(prev => ({ ...prev, logo: '' }));
                                                if (fileRef.current) fileRef.current.value = '';
                                            }}
                                        >
                                            <RxCross2 color='white' size={10} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.placeholder}>Click to upload logo</div>
                                )}
                            </label>
                        </div>
                    </div>


                    <div className={styles.field}>
                        <label>Lab Name</label>
                        <input name="labName" value={form.labName} onChange={handleChange} placeholder="e.g. City Diagnostic Center" />
                    </div>

                    {/* Two Column Row */}
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Email Address</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="contact@lab.com" />
                        </div>
                        <div className={styles.field}>
                            <label>Phone Number</label>
                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 123456789" />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>Lab Address</label>
                        <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Full street address, City, State" />
                    </div>

                    <div className={styles.footer}>
                        <DynamicButton type="submit" color="blue" backgroundColor="white">Save Information</DynamicButton>
                    </div>
                </form>
            </div>
        </div>
    );
}