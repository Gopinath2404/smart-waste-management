"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Upload, Recycle, TrendingUp, MapPin, Settings, Home } from "lucide-react"

interface SidebarProps {
  activePage?: string
  onNavigate?: (page: string) => void
}

export function Sidebar({ activePage = "Dashboard", onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: Upload, label: "Upload Waste", key: "upload" },
    { icon: BarChart3, label: "Analytics", key: "analytics" },
    { icon: Recycle, label: "Classification", key: "classification" },
    { icon: TrendingUp, label: "Forecasting", key: "forecasting" },
    { icon: MapPin, label: "Location Tracking", key: "location" },
    { icon: Settings, label: "Settings", key: "settings" },
  ]

  const handleNavigation = (item: (typeof menuItems)[0]) => {
    console.log(`[v0] Navigating to ${item.label}`)
    onNavigate?.(item.key)
  }

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Recycle className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground">EcoSmart</span>
        </div>
        <p className="text-sm text-muted-foreground">Waste Management AI</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={activePage.toLowerCase() === item.key ? "secondary" : "ghost"}
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => handleNavigation(item)}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Card className="mt-8 p-4 bg-accent/10 border-accent/20">
        <div className="text-sm">
          <p className="font-medium text-accent-foreground mb-1">System Status</p>
          <p className="text-xs text-muted-foreground">AI Model: Active</p>
          <p className="text-xs text-muted-foreground">Last Update: 2 min ago</p>
        </div>
      </Card>
    </div>
  )
}
