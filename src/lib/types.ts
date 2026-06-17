export interface PatientRecord {
  id: string;
  refId: string;
  name: string;
  age: number;
  mobile: string;
  date: string;
  time: string;
  hbsAg: "Negative" | "Positive";
  hcv: "Negative" | "Positive";
  malaria: "Negative" | "Positive";
  hiv: "Negative" | "Positive";
  vdrl: "Negative" | "Positive";
  bloodGlucose: string;
  createdAt: number;
  updatedAt?: number;
  isDeleted?: boolean;
  synced: boolean;
}

export type TestName = "hbsAg" | "hcv" | "malaria" | "hiv" | "vdrl";

export const TEST_LABELS: Record<TestName, string> = {
  hbsAg: "HBsAg",
  hcv: "HCV",
  malaria: "Malaria",
  hiv: "HIV",
  vdrl: "VDRL",
};

export const TEST_OPTIONS = ["Negative", "Positive"] as const;
