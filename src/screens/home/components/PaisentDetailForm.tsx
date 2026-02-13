import React, { useState } from "react";
import styles from "../../../css/LabPatientForm.module.css";
import { ImCross } from "react-icons/im";
import type { LabPatientDetails } from "../types/patient";
import DynamicButton from "../../../common/dynamicButton";

type Props = {
  onSubmit: (data: LabPatientDetails) => void;
  onClose: () => void;
};

export default function LabPatientForm({ onSubmit, onClose }: Props) {
  const [form, setForm] = useState<LabPatientDetails>({
    id: "",
    name: "",
    age: 0,
    gender: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Modern Blue Header */}
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>📋</span>
          <h2>Patient Detail Information</h2>
        </div>
        <button type="button" className={styles.close} onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <ImCross size={12} color="white" />
        </button>
      </div>

      <div className={styles.formBody}>
        {/* Box 1: Primary Info */}
        <div className={styles.field}>
          <label>Patient Name *</label>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label>Age & Gender *</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input type="number" name="age" placeholder="Age" value={form.age || ""} onChange={handleChange} required />
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Phone Number *</label>
          <input name="phone" placeholder="Contact No" value={form.phone} onChange={handleChange} required />
        </div>

        {/* Box 2: Secondary Info */}
        <div className={styles.field}>
          <label>Email Address</label>
          <input type="email" name="email" placeholder="email@lab.com" value={form.email} onChange={handleChange} />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Residential Address</label>
          <textarea name="address" placeholder="Full Address Details..." value={form.address} onChange={handleChange} rows={2} />
        </div>
      </div>

      {/* Action Bar with Success Indicator */}
      <div className={styles.actions}>
        <DynamicButton type="button" color="white" backgroundColor="#f6513b" onClick={onClose} >
          Cancel
          </DynamicButton>
          <DynamicButton type="submit" color="white" backgroundColor="#3b82f6">
          Add Patient
        </DynamicButton>
      </div>
    </form>
  );
}