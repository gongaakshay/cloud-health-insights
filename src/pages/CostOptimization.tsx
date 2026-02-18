import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingDown, DollarSign, Lightbulb, ArrowDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCostData, getTotalCost, getOptimizationScore, getSavingsOpportunities } from "@/lib/mockData";

export default function CostOptimization() {
  const costData = getCostData();
  const totalCost = getTotalCost();
  const score = getOptimizationScore();
  const savings = getSavingsOpportunities();
  const totalSavings = savings.reduce((s, i) => s + i.saving, 0);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold">Cost Optimization</h1>
          <p className="text-sm text-muted-foreground mt-1">Identify savings and optimize cloud spend</p>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-5 glow-gold">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <DollarSign className="w-4 h-4" /> Monthly Spend
            </div>
            <p className="text-3xl font-display font-bold">${totalCost.toLocaleString()}</p>
          </div>
          <div className="glass-card p-5 glow-cyan">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <TrendingDown className="w-4 h-4" /> Potential Savings
            </div>
            <p className="text-3xl font-display font-bold text-accent">${totalSavings.toLocaleString()}/mo</p>
          </div>
          <div className="glass-card p-5 glow-violet">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Lightbulb className="w-4 h-4" /> Optimization Score
            </div>
            <p className="text-3xl font-display font-bold">{score}%</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Cost Breakdown */}
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Cost by Service</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={costData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 12%, 18%)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} />
                <YAxis dataKey="service" type="category" tick={{ fill: "hsl(230, 10%, 55%)", fontSize: 11 }} axisLine={false} width={120} />
                <Tooltip contentStyle={{ background: "hsl(230, 15%, 11%)", border: "1px solid hsl(230, 12%, 22%)", borderRadius: "12px", fontSize: 12 }} />
                <Bar dataKey="cost" fill="hsl(43, 96%, 56%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Savings Opportunities */}
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Savings Opportunities</h3>
            <div className="space-y-3">
              {savings.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-secondary/50 hover-glow"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{s.title}</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-success">
                      <ArrowDown className="w-3 h-3" />${s.saving}/mo
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
