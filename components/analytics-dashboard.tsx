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
  { name: "Biodegradable", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Non-Biodegradable", value: 35, color: "hsl(var(--chart-2))" },
  { name: "E-Waste", value: 20, color: "hsl(var(--chart-3))" },
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

      {/* Key Metrics */}
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {wasteDistributionData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trends Bar Chart */}
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
                <Bar dataKey="biodegradable" fill="hsl(var(--chart-1))" />
                <Bar dataKey="nonBiodegradable" fill="hsl(var(--chart-2))" />
                <Bar dataKey="eWaste" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Forecasting Chart */}
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
