import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, CheckCircle, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getIncidents } from "@/lib/mockData";

const severityColor: Record<string, string> = {
  critical: "bg-destructive/20 text-destructive border-destructive/30",
  high: "bg-warning/20 text-warning border-warning/30",
  medium: "bg-primary/20 text-primary border-primary/30",
  low: "bg-muted text-muted-foreground border-border",
};

const statusIcon: Record<string, typeof AlertTriangle> = {
  open: AlertTriangle,
  investigating: Clock,
  resolved: CheckCircle,
};

export default function Incidents() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const incidents = getIncidents();

  const filtered = incidents.filter(
    (inc) =>
      (filter === "all" || inc.status === filter) &&
      (search === "" || inc.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold">Incidents</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and resolve infrastructure incidents</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incidents..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary">
            {["all", "open", "investigating", "resolved"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((inc, i) => {
            const StatusIcon = statusIcon[inc.status] || AlertTriangle;
            return (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-5 h-5 ${inc.status === "resolved" ? "text-success" : "text-warning"}`} />
                    <div>
                      <h3 className="font-medium">{inc.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{inc.id} · {inc.service} · {new Date(inc.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${severityColor[inc.severity]}`}>
                    {inc.severity}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 ml-8">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Root Cause</p>
                    <p className="text-sm">{inc.rootCause}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Resolution</p>
                    <p className="text-sm">{inc.resolution}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
