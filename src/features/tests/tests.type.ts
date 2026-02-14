import type { Gender } from "../patients/patient.type";

type PatientTestState = {
  selectedCats: string[];
  selectedTestIds: string[];
  testValues: Record<string, TestValue>;
};

export type TestValue =
  | string
  | number
  | boolean
  | MatrixValue;


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
export type InputType =
  | 'number'       // CBC, LFT, KFT
  | 'step'         // + / ++ / +++
  | 'boolean'      // Positive / Negative
  | 'select'       // Blood group, color
  | 'text'         // Remarks
  | 'calculated'   // BMI, LDL
  | 'matrix';      // Widal, Culture

  export type MatrixValue = {
  type: 'matrix';
  values: Record<string, string>;
};


export type TestField = {
  key: string;
  label: string;

  // behavior
  inputType?: InputType; // default = 'number'

  // numeric
  unit?: string;
  references?: ReferenceRule[];
  min?: number;
  max?: number;

  // step (+ / -)
  steps?: string[];

  // select
  options?: string[];

  // calculated
  formula?: string;

  // matrix (Widal, Culture)
  rows?: { key: string; label: string }[];
  columns?: string[];
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
  values: Record<string, TestValue>; // fieldKey → entered value
};
export type PatientTestReport = {
  patientId: string;
  tests: SelectedTest[];
};