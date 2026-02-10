import React, { useState } from "react";
import type { LabPacientDetails } from "../types/pacient";
import styles from "../../../css/LabPatientForm.module.css";
import { ImCross } from "react-icons/im";

type Props = {
  onSubmit: (data: LabPacientDetails) => void;
  onClose: () => void;
};

export default function LabPatientForm({ onSubmit, onClose }: Props) {
  const [form, setForm] = useState<LabPacientDetails>({
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
      {/* Header */}
      <div className={styles.header}>
        <h2>Add New Patient</h2>
        <button type="button" className={styles.close} onClick={onClose}>
          <ImCross color="red" />
        </button>
      </div>

      {/* Fields */}
      <div className={styles.field}>
        <label>Patient Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter patient name"
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age || ""}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
        />
      </div>

      <div className={styles.field}>
        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Full address"
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={styles.save}>
          Save Patient
        </button>
      </div>
    </form>
  );
}