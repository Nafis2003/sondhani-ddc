"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, FileText, Download } from "lucide-react";
import type { ReportRecord } from "@/lib/types";
import { pdf } from "@react-pdf/renderer";
import { ReportDocument } from "./report-document";

interface PdfPreviewProps {
  record: ReportRecord;
  onClose: () => void;
}

export default function PdfPreview({ record, onClose }: PdfPreviewProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const generate = async () => {
      try {
        setLoading(true);
        const blob = await pdf(<ReportDocument record={record} />).toBlob();
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setBlobUrl(url);
      } catch (e) {
        console.error("PDF generation failed:", e);
      } finally {
        setLoading(false);
      }
    };
    generate();
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, [record]);

  const handleDownload = useCallback(async () => {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `Sondhani_Report_${record.refId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [blobUrl, record.refId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl h-full max-h-[90vh] flex flex-col ring-1 ring-slate-900/5">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              <FileText className="h-5 w-5 text-slate-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Report Preview
              </h2>
              <p className="text-xs text-slate-500">{record.refId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {blobUrl && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md h-8 w-8"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-slate-100/50 p-2 sm:p-4">
          <div className="h-full w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />
              </div>
            ) : blobUrl ? (
              <iframe
                src={blobUrl}
                className="h-full w-full border-0"
                title="Report PDF"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-slate-500">
                Failed to generate PDF
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
