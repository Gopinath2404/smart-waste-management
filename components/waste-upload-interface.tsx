"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, FileImage, Loader2, Wifi, WifiOff } from "lucide-react"

interface ClassificationResult {
  type: string
  confidence: number
  item: string
  icon: string
  color: string
}

const mockClassifyWaste = async (imageData: string): Promise<ClassificationResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock classification results with updated color scheme
  const results = [
    {
      type: "Biodegradable",
      item: "Food waste",
      icon: "Leaf",
      color: "text-red-500", // Updated to red color for biodegradable
      confidence: Math.floor(Math.random() * 20) + 80,
    },
    {
      type: "Non-Biodegradable",
      item: "Plastic bottle",
      icon: "Trash2",
      color: "text-blue-500", // Updated to blue color for non-biodegradable
      confidence: Math.floor(Math.random() * 20) + 75,
    },
    {
      type: "E-Waste",
      item: "Electronic device",
      icon: "Zap",
      color: "text-orange-500", // Updated to orange color for e-waste
      confidence: Math.floor(Math.random() * 20) + 85,
    },
    {
      type: "Recyclable",
      item: "Paper waste",
      icon: "Recycle",
      color: "text-chart-4",
      confidence: Math.floor(Math.random() * 20) + 70,
    },
  ]

  return results[Math.floor(Math.random() * results.length)]
}

interface WasteUploadInterfaceProps {
  onClassificationComplete?: (result: ClassificationResult) => void
}

export function WasteUploadInterface({ onClassificationComplete }: WasteUploadInterfaceProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isClassifying, setIsClassifying] = useState(false)
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null)
  const [hardwareConnected, setHardwareConnected] = useState(true) // Added hardware connection status

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setClassificationResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setClassificationResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClassifyWaste = async () => {
    if (!uploadedImage) return

    setIsClassifying(true)
    try {
      const result = await mockClassifyWaste(uploadedImage)
      setClassificationResult(result)
      onClassificationComplete?.(result)
    } catch (error) {
      console.error("Classification failed:", error)
    } finally {
      setIsClassifying(false)
    }
  }

  const handleUploadDifferent = () => {
    setUploadedImage(null)
    setClassificationResult(null)
    // Reset file input
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleHardwareCapture = async () => {
    console.log("[v0] Attempting hardware capture...")
    setIsClassifying(true)

    try {
      // Simulate hardware image capture
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock captured image from hardware
      const mockHardwareImage = "/waste-item-captured-by-hardware-camera.jpg"
      setUploadedImage(mockHardwareImage)

      // Auto-classify hardware captured image
      const result = await mockClassifyWaste(mockHardwareImage)
      setClassificationResult(result)
      onClassificationComplete?.(result)
    } catch (error) {
      console.error("Hardware capture failed:", error)
    } finally {
      setIsClassifying(false)
    }
  }

  const toggleHardwareConnection = () => {
    setHardwareConnected(!hardwareConnected)
    console.log(`[v0] Hardware ${!hardwareConnected ? "connected" : "disconnected"}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-accent" />
            Waste Classification
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleHardwareConnection}
            className={`flex items-center gap-2 ${hardwareConnected ? "text-green-600" : "text-red-500"}`}
          >
            {hardwareConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {hardwareConnected ? "Hardware Connected" : "Hardware Offline"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {hardwareConnected && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Hardware Camera Ready</p>
                <p className="text-xs text-green-600">Smart waste bin camera is connected</p>
              </div>
              <Button
                onClick={handleHardwareCapture}
                disabled={isClassifying}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isClassifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Capture from Hardware
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded waste"
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button onClick={handleUploadDifferent} variant="outline" size="sm">
                Upload Different Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Drop waste image here</p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
              </div>
              <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Image
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>

        {uploadedImage && !classificationResult && (
          <div className="mt-4">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handleClassifyWaste}
              disabled={isClassifying}
            >
              {isClassifying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Classifying...
                </>
              ) : (
                "Classify Waste"
              )}
            </Button>
          </div>
        )}

        {classificationResult && (
          <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  classificationResult.type === "Biodegradable"
                    ? "bg-red-100"
                    : classificationResult.type === "Non-Biodegradable"
                      ? "bg-blue-100"
                      : classificationResult.type === "E-Waste"
                        ? "bg-orange-100"
                        : "bg-accent/20"
                }`}
              >
                <span
                  className={`text-sm ${
                    classificationResult.type === "Biodegradable"
                      ? "text-red-600"
                      : classificationResult.type === "Non-Biodegradable"
                        ? "text-blue-600"
                        : classificationResult.type === "E-Waste"
                          ? "text-orange-600"
                          : "text-accent"
                  }`}
                >
                  ✓
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{classificationResult.item}</p>
                <p
                  className={`text-xs font-medium ${
                    classificationResult.type === "Biodegradable"
                      ? "text-red-600"
                      : classificationResult.type === "Non-Biodegradable"
                        ? "text-blue-600"
                        : classificationResult.type === "E-Waste"
                          ? "text-orange-600"
                          : "text-muted-foreground"
                  }`}
                >
                  {classificationResult.type}
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-sm font-medium text-accent">{classificationResult.confidence}%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={handleUploadDifferent}>
              Classify Another Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
