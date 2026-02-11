import type { LabPatientDetails } from "../screens/home/types/patient";

export const STORAGE_KEY = "lab_patients";

export const loadPatients = (): LabPatientDetails[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePatients = (patients: LabPatientDetails[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
};