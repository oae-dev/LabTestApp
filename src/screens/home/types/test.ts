import type { Gender } from "./patient";

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

export const LAB_TESTS: LabCategory[] = [
  {
    id: 'blood',
    name: 'Blood Tests',
    tests: [
      {
        id: 'cbc',
        name: 'Complete Blood Count (CBC)',
        fields: [
          {
            key: 'hb',
            label: 'Hemoglobin',
            unit: 'g/dL',
            references: [
              { gender: 'male', min: 13.5, max: 17.5 },
              { gender: 'female', min: 12.0, max: 15.5 },
            ],
          },
          {
            key: 'rbc',
            label: 'RBC Count',
            unit: 'million/µL',
            references: [
              { gender: 'male', min: 4.5, max: 5.9 },
              { gender: 'female', min: 4.1, max: 5.1 },
            ],
          },
          {
            key: 'wbc',
            label: 'WBC Count',
            unit: 'cells/µL',
            references: [
              { min: 4000, max: 11000 },
            ],
          },
          {
            key: 'platelets',
            label: 'Platelet Count',
            unit: 'lakh/µL',
            references: [
              { min: 1.5, max: 4.5 },
            ],
          },
        ],
      },
      {
        id: 'blood_sugar',
        name: 'Blood Sugar',
        fields: [
          {
            key: 'fbs',
            label: 'Fasting Blood Sugar',
            unit: 'mg/dL',
            references: [
              { min: 70, max: 99 },
            ],
          },
          {
            key: 'ppbs',
            label: 'Post Prandial Blood Sugar',
            unit: 'mg/dL',
            references: [
              { min: 70, max: 140 },
            ],
          },
          {
            key: 'rbs',
            label: 'Random Blood Sugar',
            unit: 'mg/dL',
            references: [
              { min: 70, max: 140 },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'hormone',
    name: 'Hormone Tests',
    tests: [
      {
        id: 'thyroid',
        name: 'Thyroid Profile',
        fields: [
          {
            key: 't3',
            label: 'T3',
            unit: 'ng/dL',
            references: [
              { min: 80, max: 200 },
            ],
          },
          {
            key: 't4',
            label: 'T4',
            unit: 'µg/dL',
            references: [
              { min: 5.0, max: 12.0 },
            ],
          },
          {
            key: 'tsh',
            label: 'TSH',
            unit: 'µIU/mL',
            references: [
              { min: 0.4, max: 4.0 },
            ],
          },
        ],
      },
      {
        id: 'vitamin_d',
        name: 'Vitamin D (25-OH)',
        fields: [
          {
            key: 'vit_d',
            label: 'Vitamin D',
            unit: 'ng/mL',
            references: [
              { min: 30, max: 100 },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'liver',
    name: 'Liver Function Test (LFT)',
    tests: [
      {
        id: 'lft',
        name: 'LFT Panel',
        fields: [
          {
            key: 'bilirubin_total',
            label: 'Total Bilirubin',
            unit: 'mg/dL',
            references: [
              { min: 0.3, max: 1.2 },
            ],
          },
          {
            key: 'sgot',
            label: 'SGOT (AST)',
            unit: 'U/L',
            references: [
              { min: 10, max: 40 },
            ],
          },
          {
            key: 'sgpt',
            label: 'SGPT (ALT)',
            unit: 'U/L',
            references: [
              { min: 7, max: 56 },
            ],
          },
          {
            key: 'alk_phos',
            label: 'Alkaline Phosphatase',
            unit: 'U/L',
            references: [
              { min: 44, max: 147 },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'kidney',
    name: 'Kidney Function Test (KFT)',
    tests: [
      {
        id: 'kft',
        name: 'KFT Panel',
        fields: [
          {
            key: 'urea',
            label: 'Blood Urea',
            unit: 'mg/dL',
            references: [
              { min: 15, max: 40 },
            ],
          },
          {
            key: 'creatinine',
            label: 'Serum Creatinine',
            unit: 'mg/dL',
            references: [
              { gender: 'male', min: 0.7, max: 1.3 },
              { gender: 'female', min: 0.6, max: 1.1 },
            ],
          },
          {
            key: 'uric_acid',
            label: 'Uric Acid',
            unit: 'mg/dL',
            references: [
              { gender: 'male', min: 3.4, max: 7.0 },
              { gender: 'female', min: 2.4, max: 6.0 },
            ],
          },
        ],
      },
    ],
  },
];
