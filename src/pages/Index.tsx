import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, BarChart3, Shield, Bell, ArrowRight, Check } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Real-time Analytics", desc: "Monitor CPU, memory, latency, and costs with live-updating dashboards." },
  { icon: Shield, title: "Incident Management", desc: "Track, triage, and resolve incidents with AI-powered root cause analysis." },
  { icon: Zap, title: "AI Assistant", desc: "Get intelligent recommendations to optimize performance and cut costs." },
  { icon: Bell, title: "Smart Alerts", desc: "Proactive notifications before issues impact your users." },
];

const testimonials = [
  { name: "Sarah Chen", role: "VP Engineering, Scalefast", quote: "CloudPulse cut our cloud costs by 32% in the first month. The AI insights are game-changing." },
  { name: "Marcus Johnson", role: "SRE Lead, DataFlow", quote: "We reduced our MTTR by 60%. The incident timeline is exactly what we needed." },
  { name: "Priya Sharma", role: "CTO, NexGen Labs", quote: "Finally a dashboard that's as beautiful as it is functional. Our team actually enjoys using it." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">CloudPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link to="/auth" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden gradient-hero">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground mb-6 border border-border">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Now monitoring 2M+ cloud resources
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Your Cloud,
              <br />
              <span className="gradient-text">Crystal Clear</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Intelligent infrastructure monitoring, cost optimization, and incident management — powered by AI. See everything. Miss nothing.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/auth"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Start Free Trial
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-muted transition-all flex items-center gap-2"
              >
                Live Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 glass-card p-2 mx-auto max-w-4xl glow-gold"
          >
            <div className="bg-background rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="text-xs text-muted-foreground ml-2">CloudPulse Dashboard</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {["CPU: 54%", "Memory: 68%", "Latency: 23ms", "Health: 94"].map((label, i) => (
                  <div key={i} className="glass-card p-3 text-center">
                    <div className="text-xs text-muted-foreground">{label.split(":")[0]}</div>
                    <div className="text-lg font-display font-bold text-foreground mt-1">{label.split(":")[1]}</div>
                  </div>
                ))}
              </div>
              <div className="h-32 bg-secondary/50 rounded-xl flex items-center justify-center">
                <div className="flex items-end gap-1 h-20">
                  {[40, 55, 45, 70, 60, 80, 65, 75, 50, 85, 70, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-6 rounded-t bg-primary/60"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Everything you need to manage cloud infrastructure</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From real-time metrics to AI-powered insights, CloudPulse gives your team superpowers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover-glow"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Trusted by engineering teams worldwide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <p className="text-sm text-muted-foreground mb-4 italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to see your cloud clearly?</h2>
          <p className="text-muted-foreground mb-8">Start free. No credit card required. Set up in 5 minutes.</p>
          <div className="glass-card p-8 glow-gold">
            <div className="space-y-3 mb-6 text-left max-w-xs mx-auto">
              {["Unlimited dashboards", "AI-powered insights", "Real-time alerting", "14-day free trial"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/auth"
              className="inline-flex px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-semibold">CloudPulse</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 CloudPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
