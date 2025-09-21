"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Leaf, Trash2, Zap, AlertTriangle, Recycle, RefreshCw } from "lucide-react"

interface ClassificationItem {
  id: number
  type: string
  confidence: number
  icon: any
  color: string
  bgColor: string
  item: string
  timestamp: string
}

const initialClassifications: ClassificationItem[] = [
  {
    id: 1,
    type: "Biodegradable",
    confidence: 94,
    icon: Leaf,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    item: "Food waste",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    type: "Non-Biodegradable",
    confidence: 87,
    icon: Trash2,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    item: "Plastic bottle",
    timestamp: "5 min ago",
  },
  {
    id: 3,
    type: "E-Waste",
    confidence: 91,
    icon: Zap,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    item: "Old smartphone",
    timestamp: "8 min ago",
  },
  {
    id: 4,
    type: "Biodegradable",
    confidence: 78,
    icon: Leaf,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    item: "Paper waste",
    timestamp: "12 min ago",
  },
]

interface WasteClassificationDisplayProps {
  newClassification?: any
}

export function WasteClassificationDisplay({ newClassification }: WasteClassificationDisplayProps) {
  const [classifications, setClassifications] = useState<ClassificationItem[]>(initialClassifications)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (newClassification) {
      const newItem: ClassificationItem = {
        id: Date.now(),
        type: newClassification.type,
        confidence: newClassification.confidence,
        icon: getIconByType(newClassification.type),
        color: getColorByType(newClassification.type),
        bgColor: getBgColorByType(newClassification.type),
        item: newClassification.item,
        timestamp: "Just now",
      }

      setClassifications((prev) => [newItem, ...prev.slice(0, 3)])
    }
  }, [newClassification])

  const getIconByType = (type: string) => {
    switch (type) {
      case "Biodegradable":
        return Leaf
      case "Non-Biodegradable":
        return Trash2
      case "E-Waste":
        return Zap
      case "Recyclable":
        return Recycle
      default:
        return AlertTriangle
    }
  }

  const getColorByType = (type: string) => {
    switch (type) {
      case "Biodegradable":
        return "text-chart-1"
      case "Non-Biodegradable":
        return "text-chart-2"
      case "E-Waste":
        return "text-chart-3"
      case "Recyclable":
        return "text-chart-4"
      default:
        return "text-muted-foreground"
    }
  }

  const getBgColorByType = (type: string) => {
    switch (type) {
      case "Biodegradable":
        return "bg-chart-1/10"
      case "Non-Biodegradable":
        return "bg-chart-2/10"
      case "E-Waste":
        return "bg-chart-3/10"
      case "Recyclable":
        return "bg-chart-4/10"
      default:
        return "bg-muted/10"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    console.log("[v0] Refreshing classification data...")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update timestamps to simulate real-time data
    setClassifications((prev) =>
      prev.map((item) => ({
        ...item,
        timestamp:
          item.timestamp === "Just now"
            ? "1 min ago"
            : item.timestamp === "1 min ago"
              ? "2 min ago"
              : item.timestamp === "2 min ago"
                ? "3 min ago"
                : item.timestamp,
      })),
    )

    setIsRefreshing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Recent Classifications
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {classifications.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium truncate">{item.item}</p>
                <Badge variant="secondary" className="text-xs">
                  {item.confidence}%
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground">{item.type}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              </div>

              <Progress value={item.confidence} className="h-1" />
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            AI Model Accuracy: 94.2% • Last Updated: {isRefreshing ? "Updating..." : "2 minutes ago"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
