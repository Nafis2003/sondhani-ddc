import { NextResponse } from "next/server";
import { db } from "@/db";
import { patients } from "@/db/schema";
import { sql } from "drizzle-orm";
import type { PatientRecord } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allRecords = await db.select().from(patients);
    return NextResponse.json({ success: true, records: allRecords });
  } catch (error) {
    console.error("Sync GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const records: PatientRecord[] = Array.isArray(body) ? body : [body];

    if (records.length === 0) {
      return NextResponse.json({ success: true, count: 0 });
    }

    const values = records.map((r) => ({
      id: r.id,
      refId: r.refId,
      name: r.name,
      age: r.age,
      mobile: r.mobile,
      date: r.date,
      time: r.time,
      hbsAg: r.hbsAg,
      hcv: r.hcv,
      malaria: r.malaria,
      hiv: r.hiv,
      vdrl: r.vdrl,
      bloodGlucose: r.bloodGlucose,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt || 0,
      isDeleted: r.isDeleted || false,
      synced: true,
    }));

    await db.insert(patients)
      .values(values)
      .onConflictDoUpdate({
        target: patients.id,
        set: {
          refId: sql`EXCLUDED.ref_id`,
          name: sql`EXCLUDED.name`,
          age: sql`EXCLUDED.age`,
          mobile: sql`EXCLUDED.mobile`,
          date: sql`EXCLUDED.date`,
          time: sql`EXCLUDED.time`,
          hbsAg: sql`EXCLUDED.hbs_ag`,
          hcv: sql`EXCLUDED.hcv`,
          malaria: sql`EXCLUDED.malaria`,
          hiv: sql`EXCLUDED.hiv`,
          vdrl: sql`EXCLUDED.vdrl`,
          bloodGlucose: sql`EXCLUDED.blood_glucose`,
          createdAt: sql`EXCLUDED.created_at`,
          updatedAt: sql`EXCLUDED.updated_at`,
          isDeleted: sql`EXCLUDED.is_deleted`,
          synced: true,
        }
      });

    return NextResponse.json({ success: true, count: records.length });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ success: false, error: "Failed to sync" }, { status: 500 });
  }
}
