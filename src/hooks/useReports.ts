//hooks/useReport
import { useState, useEffect } from "react";
import api from "../services/api";
import { Report } from "../lib/supabase";
import { REPORT_COLUMN_MAP } from "../config/reportColumns";
import { REPORT_CONFIG } from "../config/reportConfig";

interface ApiReport {
  reportId: string;
  reportName: string;
  url: string;
  description: string;
}

export function useReports(userId: number | null) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        const res = await api.get<ApiReport[]>(
          `/api/ReportIndex/${userId}`
        );

        const mappedReports: Report[] = res.data.map((r) => {
          const key = r.url.toLowerCase().trim();
          const config = REPORT_CONFIG[key];
          const columnMapKey = Object.keys(REPORT_COLUMN_MAP).find(
            (k) => k.toLowerCase() === key
          ) || r.url;

          return {
            id: r.reportId,
            key: key, // 🔥🔥🔥 FIX YAHI HAI
            name: r.reportName,
            description: r.description || "",
            category: "General",
            api_endpoint: `/api/${r.url}`,
            // ✅ ONLY SHOW IF CONFIG ME HAI
            supports_excel_export: config?.supports_excel_export ?? false,
            supports_pdf_export: config?.supports_pdf_export ?? false,
            //enableSchedule: config?.enableSchedule ?? false,
            ...config, // 🔥 config merge
            filter_config: config?.filter_config || { filters: [] },
            columns: REPORT_COLUMN_MAP[columnMapKey] || [],
          };
        });

        setReports(mappedReports);
      } catch {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId]);

  return { reports, loading, error };
}