import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, MemoryStick, Timer, Activity, AlertTriangle, ArrowUpRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HealthScore from "@/components/dashboard/HealthScore";
import MetricCard from "@/components/dashboard/MetricCard";
import { getMetrics, getHealthScore, getIncidents } from "@/lib/mockData";

const metricIcons = [Cpu, MemoryStick, Timer, Activity, AlertTriangle, ArrowUpRight];

export default function Dashboard() {
  const [metrics, setMetrics] = useState(getMetrics());
  const [healthScore, setHealthScore] = useState(getHealthScore());
  const incidents = getIncidents().slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getMetrics());
      setHealthScore(getHealthScore());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const severityColor: Record<string, string> = {
    critical: "bg-destructive/20 text-destructive",
    high: "bg-warning/20 text-warning",
    medium: "bg-primary/20 text-primary",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time infrastructure overview</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <HealthScore score={healthScore} />
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <MetricCard key={m.label} metric={m} icon={metricIcons[i]} index={i} />
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Recent Incidents</h3>
          <div className="space-y-3">
            {incidents.map((inc) => (
              <div key={inc.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${severityColor[inc.severity]}`}>
                    {inc.severity}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{inc.title}</p>
                    <p className="text-xs text-muted-foreground">{inc.service}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-xs ${inc.status === "resolved" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                  {inc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
