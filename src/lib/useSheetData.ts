import { useQuery } from "@tanstack/react-query";

export interface WilayahData {
  kode: string;
  wilayah: string;
  target: number;
  selesai: number;
  sisa: number;
  persentase: number;
}

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vReacWakO-6uszfT7C3HWESMzLNRy63-pInklJSPYlqLNryMFXB9nwr6_2Z2YKbaBCBAdb5uPbICsa1/pub?output=csv";

function parseCSV(csv: string): WilayahData[] {
  const lines = csv.trim().split("\n");
  return lines.slice(1).map((line) => {
    const [kode, wilayah, targetStr, selesaiStr] = line.split(",");
    const target = parseInt(targetStr);
    const selesai = parseInt(selesaiStr);
    return {
      kode: kode.trim(),
      wilayah: wilayah.trim(),
      target,
      selesai,
      sisa: target - selesai,
      persentase: target > 0 ? Math.round((selesai / target) * 100) : 0,
    };
  });
}

export function useSheetData() {
  return useQuery({
    queryKey: ["sheet-data"],
    queryFn: async () => {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      return parseCSV(text);
    },
    refetchInterval: 60000,
  });
}
