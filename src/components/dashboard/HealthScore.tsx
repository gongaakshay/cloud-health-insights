import { motion } from "framer-motion";

interface HealthScoreProps {
  score: number;
}

export default function HealthScore({ score }: HealthScoreProps) {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "hsl(150, 60%, 50%)" : score >= 50 ? "hsl(38, 92%, 50%)" : "hsl(0, 72%, 51%)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="glass-card p-8 flex flex-col items-center glow-gold"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Cloud Health Score</h3>
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(230, 12%, 18%)" strokeWidth="8" />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-display font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground mt-1">/ 100</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        {score >= 80 ? "Systems operating normally" : score >= 50 ? "Some issues detected" : "Critical attention needed"}
      </p>
    </motion.div>
  );
}
