import type { LabPatientDetails } from "../../features/patients/patient.type";

export const STORAGE_KEY = "lab_patients";

export const loadPatients = (): LabPatientDetails[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePatients = (patients: LabPatientDetails[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
};

export const deletePatient = (patientId: string) => {
  const patients = loadPatients();
  const updatedPatients = patients.filter(p => p.id !== patientId);
  savePatients(updatedPatients);
};