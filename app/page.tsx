"use client"

import { useState } from "react"
import { WasteUploadInterface } from "@/components/waste-upload-interface"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { WasteClassificationDisplay } from "@/components/waste-classification-display"
import { Sidebar } from "@/components/sidebar"

export default function WasteManagementSystem() {
  const [activePage, setActivePage] = useState("Dashboard")
  const [latestClassification, setLatestClassification] = useState(null)

  const handleNavigation = (page: string) => {
    console.log(`[v0] Navigating to ${page}`)
    setActivePage(page.charAt(0).toUpperCase() + page.slice(1))
  }

  const handleClassificationComplete = (result: any) => {
    console.log("[v0] New classification completed:", result)
    setLatestClassification(result)
  }

  const renderContent = () => {
    switch (activePage.toLowerCase()) {
      case "upload":
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Upload Waste for Classification</h1>
              <p className="text-muted-foreground text-lg">
                Upload images of waste items for AI-powered classification and analysis
              </p>
            </div>
            <div className="space-y-6">
              <WasteUploadInterface onClassificationComplete={handleClassificationComplete} />
              <WasteClassificationDisplay newClassification={latestClassification} />
            </div>
          </div>
        )
      case "analytics":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Waste Analytics Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive analytics and insights for waste management optimization
              </p>
            </div>
            <AnalyticsDashboard />
          </div>
        )
      case "classification":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Classification History</h1>
              <p className="text-muted-foreground text-lg">View and manage all waste classification results</p>
            </div>
            <WasteClassificationDisplay newClassification={latestClassification} />
          </div>
        )
      case "forecasting":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Waste Volume Forecasting</h1>
              <p className="text-muted-foreground text-lg">Predictive analytics for future waste generation patterns</p>
            </div>
            <div className="text-center py-20 text-muted-foreground">
              <p>Forecasting module coming soon...</p>
            </div>
          </div>
        )
      case "location":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Location Tracking</h1>
              <p className="text-muted-foreground text-lg">Track waste collection points and optimize routes</p>
            </div>
            <div className="text-center py-20 text-muted-foreground">
              <p>Location tracking module coming soon...</p>
            </div>
          </div>
        )
      case "settings":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
              <p className="text-muted-foreground text-lg">
                Configure AI models, notifications, and system preferences
              </p>
            </div>
            <div className="text-center py-20 text-muted-foreground">
              <p>Settings panel coming soon...</p>
            </div>
          </div>
        )
      default:
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">AI-Powered Smart Waste Management System</h1>
              <p className="text-muted-foreground text-lg">
                Monitor, classify, and analyze waste data with advanced AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <AnalyticsDashboard />
              </div>
              <div className="space-y-6">
                <WasteUploadInterface onClassificationComplete={handleClassificationComplete} />
                <WasteClassificationDisplay newClassification={latestClassification} />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activePage={activePage} onNavigate={handleNavigation} />
      <main className="flex-1 p-6 space-y-6">{renderContent()}</main>
    </div>
  )
}
