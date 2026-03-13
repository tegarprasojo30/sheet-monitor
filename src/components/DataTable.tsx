import { WilayahData } from "@/lib/useSheetData";
import { ProgressBar } from "./ProgressBar";
import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";

interface DataTableProps {
  data: WilayahData[];
}

export function DataTable({ data }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof WilayahData>("wilayah");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: keyof WilayahData) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = data
    .filter((d) => d.wilayah.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === "number" ? (av as number) - (bv as number) : String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });

  const getBadgeClass = (pct: number) => {
    if (pct >= 90) return "bg-success/15 text-success";
    if (pct >= 70) return "bg-primary/15 text-primary";
    if (pct >= 50) return "bg-warning/15 text-warning";
    return "bg-destructive/15 text-destructive";
  };

  const headers: { key: keyof WilayahData; label: string }[] = [
    { key: "kode", label: "Kode" },
    { key: "wilayah", label: "Wilayah" },
    { key: "target", label: "Target" },
    { key: "selesai", label: "Selesai" },
    { key: "sisa", label: "Sisa" },
    { key: "persentase", label: "Progress" },
  ];

  return (
    <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari wilayah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-muted border-0 outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} wilayah</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              {headers.map((h) => (
                <th
                  key={h.key}
                  onClick={() => handleSort(h.key)}
                  className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {h.label}
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.kode} className={`border-t border-border hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.kode}</td>
                <td className="px-4 py-3 font-semibold text-card-foreground">{row.wilayah}</td>
                <td className="px-4 py-3 text-card-foreground">{row.target}</td>
                <td className="px-4 py-3 text-card-foreground">{row.selesai}</td>
                <td className="px-4 py-3 text-card-foreground">{row.sisa}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProgressBar value={row.persentase} className="flex-1 min-w-[80px]" />
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getBadgeClass(row.persentase)}`}>
                      {row.persentase}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
