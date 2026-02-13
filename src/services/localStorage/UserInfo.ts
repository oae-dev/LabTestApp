export type StoredUser = {
  uid: string;
  email: string | null;

  labInfo?: {
    labName: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
  };
};

export const STORAGE_KEY_USER = "lab_user";
export const saveUserToLocalStorage = async (user: StoredUser): Promise<void> => {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
};