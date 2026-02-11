
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

