// Mock data engine for CloudPulse
export interface Metric {
  label: string;
  value: number;
  unit: string;
  change: number;
  status: "healthy" | "warning" | "critical";
}

export interface Incident {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved";
  service: string;
  timestamp: string;
  rootCause: string;
  resolution: string;
}

export interface CostItem {
  service: string;
  cost: number;
  change: number;
  trend: number[];
}

export interface AnalyticsPoint {
  time: string;
  cpu: number;
  memory: number;
  latency: number;
  requests: number;
}

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number) => +(Math.random() * (max - min) + min).toFixed(1);

export function getMetrics(): Metric[] {
  return [
    { label: "CPU Usage", value: rand(35, 82), unit: "%", change: randFloat(-5, 8), status: rand(1, 10) > 7 ? "warning" : "healthy" },
    { label: "Memory", value: rand(40, 78), unit: "%", change: randFloat(-3, 6), status: rand(1, 10) > 8 ? "warning" : "healthy" },
    { label: "Latency", value: rand(12, 180), unit: "ms", change: randFloat(-20, 30), status: rand(1, 10) > 8 ? "critical" : "healthy" },
    { label: "Requests/s", value: rand(800, 4500), unit: "req/s", change: randFloat(-10, 15), status: "healthy" },
    { label: "Error Rate", value: randFloat(0.01, 2.5), unit: "%", change: randFloat(-0.5, 1), status: randFloat(0, 1) > 0.7 ? "warning" : "healthy" },
    { label: "Uptime", value: randFloat(99.5, 99.99), unit: "%", change: randFloat(-0.1, 0.1), status: "healthy" },
  ];
}

export function getHealthScore(): number {
  let score = 100;
  score -= rand(0, 2) * 20; // downtime
  score -= rand(0, 3) * 5;  // errors
  score -= rand(0, 1) * 10; // cpu spikes
  score -= rand(0, 1) * 10; // cost spikes
  score -= rand(0, 1) * 5;  // security
  return Math.max(0, Math.min(100, score));
}

export function getIncidents(): Incident[] {
  const incidents: Incident[] = [
    { id: "INC-001", title: "Database connection pool exhausted", severity: "critical", status: "resolved", service: "PostgreSQL", timestamp: "2026-02-18T08:23:00Z", rootCause: "Connection leak in payment service", resolution: "Patched connection pooling config" },
    { id: "INC-002", title: "API latency spike on /checkout", severity: "high", status: "investigating", service: "API Gateway", timestamp: "2026-02-18T11:45:00Z", rootCause: "Unoptimized query joining 3 tables", resolution: "Pending index optimization" },
    { id: "INC-003", title: "CDN cache miss rate elevated", severity: "medium", status: "open", service: "CloudFront", timestamp: "2026-02-18T14:12:00Z", rootCause: "Cache invalidation triggered by deployment", resolution: "Monitoring cache warm-up" },
    { id: "INC-004", title: "Memory usage above threshold", severity: "low", status: "resolved", service: "Worker Nodes", timestamp: "2026-02-17T22:30:00Z", rootCause: "Large batch job consuming excess memory", resolution: "Implemented streaming processing" },
    { id: "INC-005", title: "SSL certificate expiring in 7 days", severity: "medium", status: "open", service: "Load Balancer", timestamp: "2026-02-17T09:00:00Z", rootCause: "Auto-renewal failed", resolution: "Manual renewal initiated" },
  ];
  return incidents;
}

export function getCostData(): CostItem[] {
  return [
    { service: "Compute (EC2)", cost: 4280, change: 12, trend: [3800, 3900, 4100, 4000, 4200, 4280] },
    { service: "Storage (S3)", cost: 1850, change: -3, trend: [1900, 1920, 1880, 1860, 1840, 1850] },
    { service: "Database (RDS)", cost: 2100, change: 8, trend: [1900, 1950, 2000, 2050, 2080, 2100] },
    { service: "Networking", cost: 980, change: -5, trend: [1050, 1020, 1000, 990, 985, 980] },
    { service: "Lambda Functions", cost: 420, change: 25, trend: [320, 340, 360, 380, 400, 420] },
    { service: "CloudFront CDN", cost: 650, change: 2, trend: [630, 635, 640, 645, 648, 650] },
  ];
}

export function getAnalyticsData(): AnalyticsPoint[] {
  const hours = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
  return hours.map(time => ({
    time,
    cpu: rand(25, 85),
    memory: rand(35, 75),
    latency: rand(15, 200),
    requests: rand(500, 5000),
  }));
}

export function getAIResponse(question: string): string {
  const responses: Record<string, string> = {
    default: "Based on my analysis of your infrastructure, I can see several optimization opportunities. Your compute costs have increased 12% this month, primarily driven by over-provisioned EC2 instances in us-east-1. I'd recommend right-sizing your m5.xlarge instances to m5.large, which could save approximately $840/month without impacting performance.",
    cost: "Your total cloud spend this month is $10,280, up 8% from last month. The biggest contributor is Compute at $4,280 (42%). I've identified 3 idle instances and 2 over-provisioned databases. Implementing my recommendations could save you $1,200/month — a 12% reduction.",
    performance: "Current performance metrics look stable. Average latency is 45ms (P99: 180ms). CPU utilization averages 58% with peaks at 82% during business hours. I recommend setting up auto-scaling triggers at 70% CPU to prevent bottlenecks during traffic spikes.",
    incidents: "You've had 5 incidents this week — 1 critical (resolved), 1 high (investigating), and 3 medium/low. The critical incident was a database connection pool exhaustion that affected checkout for 12 minutes. I recommend implementing connection pooling with PgBouncer to prevent recurrence.",
    security: "Security posture is generally good. However, I've flagged 2 concerns: an SSL certificate expiring in 7 days on your load balancer, and 3 S3 buckets with overly permissive ACLs. I recommend enabling auto-renewal for certificates and tightening bucket policies immediately.",
  };

  const q = question.toLowerCase();
  if (q.includes("cost") || q.includes("spend") || q.includes("saving")) return responses.cost;
  if (q.includes("performance") || q.includes("latency") || q.includes("cpu")) return responses.performance;
  if (q.includes("incident") || q.includes("outage") || q.includes("issue")) return responses.incidents;
  if (q.includes("security") || q.includes("ssl") || q.includes("vulnerability")) return responses.security;
  return responses.default;
}

export const suggestedPrompts = [
  "How can I reduce cloud costs?",
  "What's causing the latency spike?",
  "Summarize recent incidents",
  "Are there any security risks?",
  "Optimize my compute resources",
];

export function getTotalCost(): number {
  return getCostData().reduce((sum, item) => sum + item.cost, 0);
}

export function getOptimizationScore(): number {
  return rand(62, 88);
}

export function getSavingsOpportunities() {
  return [
    { title: "Right-size EC2 instances", saving: 840, impact: "low", description: "3 instances running at <20% CPU utilization" },
    { title: "Delete unused EBS volumes", saving: 220, impact: "none", description: "8 unattached volumes totaling 2TB" },
    { title: "Switch to Reserved Instances", saving: 1200, impact: "none", description: "5 on-demand instances running 24/7" },
    { title: "Optimize S3 lifecycle policies", saving: 180, impact: "none", description: "Move infrequently accessed data to Glacier" },
  ];
}
