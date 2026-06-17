"use client";

import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PatientRecord } from "@/lib/types";
import { TEST_LABELS, type TestName } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 56,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1e1e1e",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  clinicName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    letterSpacing: 1,
  },
  department: {
    fontSize: 11,
    color: "#555",
    marginBottom: 4,
  },
  location: {
    fontSize: 9,
    color: "#888",
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 32,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  metaItem: {
    width: "33.33%",
    marginBottom: 14,
  },
  metaLabel: {
    fontSize: 8,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#555",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 4,
  },
  tableHeaderCell: {
    width: "50%",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#888",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  tableCell: {
    width: "50%",
    fontSize: 11,
  },
  resultNegative: {
    color: "#166534",
    fontFamily: "Helvetica-Bold",
  },
  resultPositive: {
    color: "#dc2626",
    fontFamily: "Helvetica-Bold",
  },
  glucoseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 20,
    marginBottom: 0,
  },
  glucoseLabel: {
    fontSize: 11,
    color: "#555",
  },
  glucoseValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  disclaimer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#e2e2e2",
    paddingTop: 12,
    fontSize: 8,
    color: "#999",
    textAlign: "center",
  },
});

interface ReportDocumentProps {
  record: PatientRecord;
}

const testNames: TestName[] = ["hbsAg", "hcv", "malaria", "hiv", "vdrl"];

export function ReportDocument({ record }: ReportDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.clinicName}>Sondhani DDC</Text>
          <Text style={styles.department}>Blood Testing Lab</Text>
          <Text style={styles.location}>Mirpur 14, Dhaka, Bangladesh</Text>
        </View>

        {/* Patient Info */}
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Patient Name</Text>
            <Text style={styles.metaValue}>{record.name}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Age</Text>
            <Text style={styles.metaValue}>{record.age} years</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Mobile</Text>
            <Text style={styles.metaValue}>{record.mobile}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{record.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{record.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Ref ID</Text>
            <Text style={styles.metaValue}>{record.refId}</Text>
          </View>
        </View>

        {/* Test Results */}
        <Text style={styles.sectionTitle}>Test Results</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Test</Text>
          <Text style={styles.tableHeaderCell}>Result</Text>
        </View>
        {testNames.map((test) => (
          <View key={test} style={styles.tableRow}>
            <Text style={styles.tableCell}>{TEST_LABELS[test]}</Text>
            <Text
              style={[
                styles.tableCell,
                record[test] === "Positive"
                  ? styles.resultPositive
                  : styles.resultNegative,
              ]}
            >
              {record[test]}
            </Text>
          </View>
        ))}

        {/* Blood Glucose */}
        {record.bloodGlucose && record.bloodGlucose !== "N/A" && (
          <View style={styles.glucoseRow}>
            <Text style={styles.glucoseLabel}>
              {record.bloodGlucose.includes("(Fasting)")
                ? "Fasting Blood Sugar (FBS)"
                : record.bloodGlucose.includes("(2h glucose)")
                ? "2 Hours Post-Prandial Glucose (2h PPBS)"
                : "Random Blood Sugar (RBS)"}
            </Text>
            <Text style={styles.glucoseValue}>
              {record.bloodGlucose.replace(/\s*\(.*?\)\s*$/, "")}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
