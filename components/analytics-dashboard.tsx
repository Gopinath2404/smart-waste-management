"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Recycle, Trash2, Zap } from "lucide-react"

const wasteDistributionData = [
  { name: "Biodegradable", value: 45, color: "#ef4444" }, // red
  { name: "Non-Biodegradable", value: 35, color: "#3b82f6" }, // blue
  { name: "E-Waste", value: 20, color: "#f97316" }, // orange
]

const weeklyTrendsData = [
  { day: "Mon", biodegradable: 120, nonBiodegradable: 80, eWaste: 30 },
  { day: "Tue", biodegradable: 150, nonBiodegradable: 95, eWaste: 25 },
  { day: "Wed", biodegradable: 180, nonBiodegradable: 110, eWaste: 40 },
  { day: "Thu", biodegradable: 140, nonBiodegradable: 85, eWaste: 35 },
  { day: "Fri", biodegradable: 200, nonBiodegradable: 120, eWaste: 45 },
  { day: "Sat", biodegradable: 160, nonBiodegradable: 100, eWaste: 30 },
  { day: "Sun", biodegradable: 130, nonBiodegradable: 75, eWaste: 20 },
]

const monthlyForecastData = [
  { month: "Jan", predicted: 2400, actual: 2200 },
  { month: "Feb", predicted: 2600, actual: 2500 },
  { month: "Mar", predicted: 2800, actual: 2700 },
  { month: "Apr", predicted: 3000, actual: null },
  { month: "May", predicted: 3200, actual: null },
  { month: "Jun", predicted: 3400, actual: null },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("week")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [segmentColors, setSegmentColors] = useState(
    wasteDistributionData.map((item) => ({ ...item, selected: false })),
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    console.log("[v0] Refreshing analytics data...")
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleTimeRangeChange = (range: string) => {
    console.log(`[v0] Changing time range to ${range}`)
    setTimeRange(range)
  }

  const handlePieClick = (data: any, index: number) => {
    console.log(`[v0] Clicked on ${data.name} segment`)
    setSelectedSegment(data.name)

    const updatedColors = segmentColors.map((item, i) => {
      if (i === index) {
        return { ...item, color: item.color, selected: true }
      }
      return { ...item, selected: false }
    })
    setSegmentColors(updatedColors)
  }

  const renderCustomizedCell = (entry: any, index: number) => {
    const isSelected = entry.selected
    return (
      <Cell
        key={`cell-${index}`}
        fill={entry.color}
        stroke={isSelected ? "#ffffff" : "none"}
        strokeWidth={isSelected ? 3 : 0}
        style={{
          filter: isSelected ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none",
          cursor: "pointer",
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["day", "week", "month", "year"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => handleTimeRangeChange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Waste</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-accent">+12% from last week</p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recycled</p>
                <p className="text-2xl font-bold">892</p>
                <p className="text-xs text-accent">+8% efficiency</p>
              </div>
              <div className="w-10 h-10 bg-chart-1/10 rounded-full flex items-center justify-center">
                <Recycle className="w-5 h-5 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">E-Waste</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-chart-3">Needs attention</p>
              </div>
              <div className="w-10 h-10 bg-chart-3/10 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-xs text-accent">AI Classification</p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Waste Distribution
              {selectedSegment && (
                <span className="text-sm font-normal text-muted-foreground">Selected: {selectedSegment}</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentColors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={handlePieClick}
                  style={{ cursor: "pointer" }}
                >
                  {segmentColors.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.selected ? "#ffffff" : "none"}
                      strokeWidth={entry.selected ? 3 : 0}
                      style={{
                        filter: entry.selected ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {segmentColors.map((item, index) => (
                <div
                  key={item.name}
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                    item.selected ? "scale-110" : "hover:scale-105"
                  }`}
                  onClick={() => handlePieClick(item, index)}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      item.selected ? "ring-2 ring-white ring-offset-2" : ""
                    }`}
                    style={{
                      backgroundColor: item.color,
                      filter: item.selected ? "brightness(1.2)" : "none",
                    }}
                  />
                  <span
                    className={`text-sm transition-colors duration-200 ${
                      item.selected ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            {selectedSegment && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedSegment(null)
                    setSegmentColors(wasteDistributionData.map((item) => ({ ...item, selected: false })))
                  }}
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="biodegradable" fill="#ef4444" name="Biodegradable" />
                <Bar dataKey="nonBiodegradable" fill="#3b82f6" name="Non-Biodegradable" />
                <Bar dataKey="eWaste" fill="#f97316" name="E-Waste" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Waste Volume Forecasting</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Actual" />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
