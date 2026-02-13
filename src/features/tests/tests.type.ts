import type { Gender } from "../patients/patient.type";

type PatientTestState = {
  selectedCats: string[];
  selectedTestIds: string[];
  testValues: Record<string, string>;
};

export type PatientTestsMap = {
  [patientId: string]: PatientTestState;
};


export type ReferenceRule = {
  gender?: Gender;
  minAge?: number;
  maxAge?: number;
  min: number;
  max: number;
};
export type TestField = {
  key: string;
  label: string;
  unit: string;
  references: ReferenceRule[];
};
export type LabTest = {
  id: string;
  name: string;
  fields: TestField[];
};
export type LabCategory = {
  id: string;
  name: string;
  tests: LabTest[];
};
export type SelectedTest = {
  testId: string;
  values: Record<string, string>; // fieldKey → entered value
};
export type PatientTestReport = {
  patientId: string;
  tests: SelectedTest[];
};