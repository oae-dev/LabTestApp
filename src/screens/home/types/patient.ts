
export type LabPatientDetails = {
  id: string;
  name: string;
  age: number;
  gender: Gender | "";
  phone: string;
  email?: string;
  address?: string;
};

export type Gender = 'male' | 'female';

export const STORAGE_KEY = "lab_patients";

export const loadPatients = (): LabPatientDetails[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePatients = (patients: LabPatientDetails[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
};