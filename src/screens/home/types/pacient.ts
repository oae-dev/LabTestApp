export type LabPacientDetails = {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
};

export const STORAGE_KEY = "lab_patients";

export const loadPatients = (): LabPacientDetails[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePatients = (patients: LabPacientDetails[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
};