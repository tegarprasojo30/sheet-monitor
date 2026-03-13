import { useSheetData } from "@/lib/useSheetData";
import { StatsCard } from "@/components/StatsCard";
import { DataTable } from "@/components/DataTable";
import { Target, CheckCircle2, Clock, TrendingUp, RefreshCw } from "lucide-react";

const Index = () => {
  const { data, isLoading, isError, refetch, dataUpdatedAt } = useSheetData();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive font-semibold text-lg">Gagal memuat data</p>
          <button onClick={() => refetch()} className="mt-3 text-sm text-primary hover:underline">
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  const totalTarget = data.reduce((s, d) => s + d.target, 0);
  const totalSelesai = data.reduce((s, d) => s + d.selesai, 0);
  const totalSisa = totalTarget - totalSelesai;
  const avgProgress = Math.round((totalSelesai / totalTarget) * 100);
  const lastUpdate = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString("id-ID") : "-";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              📊 Monitoring Wilayah
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Jawa Tengah — Data real-time dari Google Sheets</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground hidden sm:block">Update: {lastUpdate}</span>
            <button
              onClick={() => refetch()}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Target" value={totalTarget} icon={Target} variant="primary" subtitle={`${data.length} wilayah`} />
          <StatsCard title="Selesai" value={totalSelesai} icon={CheckCircle2} variant="success" />
          <StatsCard title="Sisa" value={totalSisa} icon={Clock} variant="warning" />
          <StatsCard title="Rata-rata" value={`${avgProgress}%`} icon={TrendingUp} variant={avgProgress >= 80 ? "success" : "primary"} />
        </div>

        <DataTable data={data} />
      </main>
    </div>
  );
};

export default Index;
