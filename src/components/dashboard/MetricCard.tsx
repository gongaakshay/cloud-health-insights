import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { Metric } from "@/lib/mockData";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  metric: Metric;
  icon: LucideIcon;
  index: number;
}

export default function MetricCard({ metric, icon: Icon, index }: MetricCardProps) {
  const statusColors = {
    healthy: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card p-5 hover-glow group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{metric.label}</span>
        <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center ${statusColors[metric.status]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-display font-bold text-foreground">
          {metric.value.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground mb-0.5">{metric.unit}</span>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {metric.change >= 0 ? (
          <ArrowUp className="w-3 h-3 text-success" />
        ) : (
          <ArrowDown className="w-3 h-3 text-destructive" />
        )}
        <span className={`text-xs ${metric.change >= 0 ? "text-success" : "text-destructive"}`}>
          {Math.abs(metric.change)}%
        </span>
        <span className="text-xs text-muted-foreground ml-1">vs last hour</span>
      </div>
    </motion.div>
  );
}
