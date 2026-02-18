import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Palette, Key } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    incidents: true,
    costAlerts: true,
    weeklyReport: false,
    securityAlerts: true,
  });

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Profile */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold">Profile</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                <input defaultValue="Alex Morgan" className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input defaultValue="alex@cloudpulse.io" className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Role</label>
                <input defaultValue="Platform Engineer" className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Organization</label>
                <input defaultValue="Acme Corp" className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold">Notifications</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <button
                    onClick={() => setNotifications((n) => ({ ...n, [key]: !val }))}
                    className={`w-10 h-6 rounded-full transition-colors relative ${val ? "bg-primary" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${val ? "bg-primary-foreground left-5" : "bg-muted-foreground left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* API Config */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold">API Configuration</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">API Key</label>
                <input defaultValue="cp_live_xxxxxxxxxxxx" type="password" className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Endpoint URL</label>
                <input defaultValue="https://api.cloudpulse.io/v1" className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          </div>

          <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
