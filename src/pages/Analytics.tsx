import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getAnalyticsData } from "@/lib/mockData";

const COLORS = ["hsl(43, 96%, 56%)", "hsl(190, 80%, 50%)", "hsl(270, 70%, 60%)", "hsl(150, 60%, 50%)"];

const resourceUsage = [
  { name: "Compute", value: 42 },
  { name: "Storage", value: 28 },
  { name: "Network", value: 18 },
  { name: "Database", value: 12 },
];

const timeRanges = ["1H", "6H", "24H", "7D", "30D"];

export default function Analytics() {
  const [range, setRange] = useState("24H");
  const data = getAnalyticsData();

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">Performance trends & resource usage</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary">
            {timeRanges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(190, 80%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(190, 80%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 12%, 18%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(230, 15%, 11%)", border: "1px solid hsl(230, 12%, 22%)", borderRadius: "12px", fontSize: 12 }}
                  labelStyle={{ color: "hsl(230, 10%, 55%)" }}
                />
                <Area type="monotone" dataKey="cpu" stroke="hsl(43, 96%, 56%)" fill="url(#cpuGrad)" strokeWidth={2} name="CPU %" />
                <Area type="monotone" dataKey="memory" stroke="hsl(190, 80%, 50%)" fill="url(#memGrad)" strokeWidth={2} name="Memory %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Resource Usage */}
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Resource Usage</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={resourceUsage} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {resourceUsage.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(230, 15%, 11%)", border: "1px solid hsl(230, 12%, 22%)", borderRadius: "12px", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {resourceUsage.map((r, i) => (
                <div key={r.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{r.name}</span>
                  <span className="ml-auto font-medium">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latency & Requests */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 12%, 18%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(230, 15%, 11%)", border: "1px solid hsl(230, 12%, 22%)", borderRadius: "12px", fontSize: 12 }} />
                <Line type="monotone" dataKey="latency" stroke="hsl(270, 70%, 60%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Requests/s</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(150, 60%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(150, 60%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 12%, 18%)" />
                <XAxis dataKey="time" tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(230, 15%, 11%)", border: "1px solid hsl(230, 12%, 22%)", borderRadius: "12px", fontSize: 12 }} />
                <Area type="monotone" dataKey="requests" stroke="hsl(150, 60%, 50%)" fill="url(#reqGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
