import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { saveUserToLocalStorage, type StoredUser } from "../../services/localStorage/UserInfo";
import { auth } from "../../services/firebase/firebaseConfig";
import type { LabInfo } from "./auth.type";


export type Errors = {
  email?: string;
  password?: string;
};

export type FunctionResult = {
  success: boolean;
  message: string;
};

const validation = (email: string, password: string): boolean => {
  if (!email.trim() && !password.trim()) {
    alert("Please enter both email and password");
    return false;
  }
  if (!email.trim()) {
    alert("Please enter email");
    return false;
  }
  if (!password.trim()) {
    alert("Please enter password");
    return false;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email");
    return false;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return false;
  }
  return true;
};
export default validation

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const onLoginTapped = async ({ email, password, setLoading }: {
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}): Promise<FunctionResult> => {
  if (!validation(email, password)) {
    console.log('Validation failed');
    return { success: false, message: 'Validation failed' };
  }
  console.log('Validation passed');
  const result = await loginUser(email, password, setLoading);
  return result;
};

const loginUser = async (
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<FunctionResult> => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential.user);
    // Save user info to local storage
    const userData: StoredUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      // accessToken: userCredential.user.refreshToken,
      labInfo: undefined, 
    };
    saveUserToLocalStorage(userData);

    return { success: true, message: 'Logged in successfully' }
  } catch (error) {
    console.log(error);
    return { success: false, message: (error as Error).message }
  } finally {
    setLoading(false);
  }
};

export const signUpTapped = async ({ email, password, setLoading }: {
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}): Promise<FunctionResult> => {
  if (!validation(email, password)) {
    console.log('Validation failed');
    return { success: false, message: 'Validation failed' };
  }
  const result = await signUp(email, password, setLoading);
  return result
};

const signUp = async (
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<FunctionResult> => {
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential.user);

    // Save user info to local storage
    const userData: StoredUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      // accessToken: userCredential.user.refreshToken,
      labInfo: undefined, 
    };
    saveUserToLocalStorage(userData);

    return { success: true, message: 'Account created successfully' }
  } catch (error) {
    console.log(error);
    return { success: false, message: (error as Error).message }
  } finally {
    setLoading(false);
  }
}

export const onGooglePress = async (): Promise<FunctionResult> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log('✅ Firebase user (web):', userCredential.user);

    //  const stored = localStorage.getItem(STORAGE_KEY_USER);
  // const existingUser = stored ? JSON.parse(stored) : {};

    // Save user info to local storage
    const userData: StoredUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      // accessToken: userCredential.user.refreshToken,
      labInfo: undefined, 
    };
    saveUserToLocalStorage(userData);

    return { success: true, message: 'Logged in successfully' }
  } catch (error) {
    console.log(error);
    alert(`Error : ${error}`);
    return { success: false, message: (error as Error).message }
  }
}

// Form Functionality related to authentication screens.

export const validateLabInfo = (form: LabInfo) => {
  const errors: Record<string, string> = {};

  if (!form.logo) errors.logo = 'Laboratory logo is required';
  if (!form.labName.trim()) errors.labName = 'Lab name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  if (form.email && !isValidEmail(form.email)) errors.email = 'Please enter a valid email';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  if (!form.address.trim()) errors.address = 'Address is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};