//componenets/ReportSubtitle
import { Report } from "../lib/supabase";

interface ReportSubtitleProps {
  report: Report;
  filters: Record<string, string>;
  companies?: { value: string; label: string }[];
  dropdownOptions?: Record<string, { value: string; label: string }[]>;
}

const formatPeriodOption = (opt: string): string => {
  return opt
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ReportSubtitle({
  report,
  filters,
  companies = [],
  dropdownOptions = {}
}: ReportSubtitleProps) {

  if (!report) return null;

  const activeFilters = Object.entries(filters).filter(
    ([_, value]) => value && value !== ""
  );

  if (activeFilters.length === 0) return null;

  const parts: string[] = [];

  report.filter_config.filters.forEach((f) => {
    const value = filters[f.name];
    if (!value) return;

    if (f.name === "company") {
      const label =
        companies.find((c) => c.value === value)?.label || value;
      parts.push(label.toUpperCase());
      return;
    }

    if (f.type === "select") {
      const option =
        dropdownOptions[f.name]?.find((o) => o.value === value);
      parts.push(option?.label || value);
      return;
    }

    if (f.type === "period") {
      parts.push(formatPeriodOption(value));
      return;
    }

    if (f.type === "date") {
      parts.push(value);
      return;
    }

    parts.push(value);
  });

  if (parts.length === 0) return null;

  return (
    <p className="text-sm text-gray-600 mt-1">
      {report.name} ({parts.join(" - ")})
    </p>
  );
}