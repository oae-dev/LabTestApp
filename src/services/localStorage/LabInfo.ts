import type { LabInfo } from "../../features/auth/auth.type";

export const STORAGE_KEY_LAB_INFO = "lab_info";

export const loadLabInfo = (): LabInfo | null => {
  const stored = localStorage.getItem(STORAGE_KEY_LAB_INFO);
  return stored ? JSON.parse(stored) : null;
};

export const saveLabInfo = (info: LabInfo) => {
  localStorage.setItem(STORAGE_KEY_LAB_INFO, JSON.stringify(info));
};

export const clearLabInfo = () => {
  localStorage.removeItem(STORAGE_KEY_LAB_INFO);
};

