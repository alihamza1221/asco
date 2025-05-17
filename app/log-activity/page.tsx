"use client"

import type React from "react"

import { useState } from "react"
import { Flame, Lightbulb, Droplet, Trash2, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function LogActivityPage() {
  const [activeTab, setActiveTab] = useState("fuel")
  const [calculatedEmissions, setCalculatedEmissions] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // Form states
  const [fuelType, setFuelType] = useState("petrol")
  const [fuelAmount, setFuelAmount] = useState("")
  const [fuelUnit, setFuelUnit] = useState("liters")
  const [fuelPurpose, setFuelPurpose] = useState("personal")

  const [electricityAmount, setElectricityAmount] = useState("")
  const [electricityPeriod, setElectricityPeriod] = useState("month")

  const [waterAmount, setWaterAmount] = useState("")
  const [waterUnit, setWaterUnit] = useState("liters")

  const [wasteType, setWasteType] = useState("general")
  const [wasteAmount, setWasteAmount] = useState("")

  const [transportMode, setTransportMode] = useState("car")
  const [distance, setDistance] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("km")
  const [passengers, setPassengers] = useState("1")

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Simple calculation logic based on the active tab
      let emissions = 0

      if (activeTab === "fuel") {
        const amount = Number.parseFloat(fuelAmount) || 0
        // Different emission factors based on fuel type
        const factors: Record<string, number> = {
          petrol: 2.31,
          diesel: 2.68,
          lpg: 1.51,
          "natural-gas": 1.93,
        }
        emissions = amount * factors[fuelType]
      } else if (activeTab === "electricity") {
        const amount = Number.parseFloat(electricityAmount) || 0
        // Simplified calculation
        emissions = amount * 0.5 // 0.5 kg CO2 per kWh
      } else if (activeTab === "water") {
        const amount = Number.parseFloat(waterAmount) || 0
        // Convert to liters if needed
        const liters =
          waterUnit === "gallons" ? amount * 3.78541 : waterUnit === "cubic-meters" ? amount * 1000 : amount
        emissions = liters * 0.0003 // 0.0003 kg CO2 per liter
      } else if (activeTab === "waste") {
        const amount = Number.parseFloat(wasteAmount) || 0
        // Different emission factors based on waste type
        const factors: Record<string, number> = {
          general: 2.5,
          organic: 1.0,
          plastic: 6.0,
          paper: 1.5,
        }
        emissions = amount * factors[wasteType]
      } else if (activeTab === "travel") {
        const distanceValue = Number.parseFloat(distance) || 0
        // Convert to km if needed
        const km = distanceUnit === "miles" ? distanceValue * 1.60934 : distanceValue
        // Different emission factors based on transport mode
        const factors: Record<string, number> = {
          car: 0.17,
          bus: 0.1,
          train: 0.04,
          subway: 0.03,
          bicycle: 0,
        }
        const passengerCount = Number.parseInt(passengers) || 1
        emissions = (km * factors[transportMode]) / (transportMode === "car" ? passengerCount : 1)
      }

      // Round to 2 decimal places
      setCalculatedEmissions(Math.round(emissions * 100) / 100)
      setLoading(false)

      toast({
        title: "Emissions Calculated",
        description: `Your activity will generate approximately ${Math.round(emissions * 100) / 100} kg of CO₂.`,
        action: <ToastAction altText="Save">Save Activity</ToastAction>,
      })
    }, 1000)
  }

  const handleSave = () => {
    toast({
      title: "Activity Saved",
      description: "Your activity has been saved successfully.",
      variant: "success",
    })

    // Reset form and calculated emissions
    setCalculatedEmissions(null)
    resetActiveForm()
  }

  const resetActiveForm = () => {
    if (activeTab === "fuel") {
      setFuelAmount("")
    } else if (activeTab === "electricity") {
      setElectricityAmount("")
    } else if (activeTab === "water") {
      setWaterAmount("")
    } else if (activeTab === "waste") {
      setWasteAmount("")
    } else if (activeTab === "travel") {
      setDistance("")
      setPassengers("1")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Log Activity</h1>
        <p className="text-muted-foreground">Track your carbon footprint by logging your daily activities.</p>
      </div>

      <Tabs defaultValue="fuel" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="fuel" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            <span>Fuel</span>
          </TabsTrigger>
          <TabsTrigger value="electricity" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Electricity</span>
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center gap-2">
            <Droplet className="h-4 w-4" />
            <span>Water</span>
          </TabsTrigger>
          <TabsTrigger value="waste" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span>Waste</span>
          </TabsTrigger>
          <TabsTrigger value="travel" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            <span>Travel</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-2">
          <TabsContent value="fuel" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Usage</CardTitle>
                <CardDescription>Log your fuel consumption for vehicles and heating.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel-type">Fuel Type</Label>
                    <Select value={fuelType} onValueChange={setFuelType}>
                      <SelectTrigger id="fuel-type">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="lpg">LPG</SelectItem>
                        <SelectItem value="natural-gas">Natural Gas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={fuelAmount}
                        onChange={(e) => setFuelAmount(e.target.value)}
                      />
                      <Select value={fuelUnit} onValueChange={setFuelUnit}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="liters">Liters</SelectItem>
                          <SelectItem value="gallons">Gallons</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Purpose</Label>
                    <RadioGroup value={fuelPurpose} onValueChange={setFuelPurpose} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personal" id="personal" />
                        <Label htmlFor="personal">Personal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="business" />
                        <Label htmlFor="business">Business</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Emissions"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="electricity" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Electricity Usage</CardTitle>
                <CardDescription>Log your electricity consumption.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kwh">Usage (kWh)</Label>
                    <Input
                      id="kwh"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={electricityAmount}
                      onChange={(e) => setElectricityAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period">Time Period</Label>
                    <Select value={electricityPeriod} onValueChange={setElectricityPeriod}>
                      <SelectTrigger id="period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Emissions"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Water Usage</CardTitle>
                <CardDescription>Log your water consumption.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="water-amount">Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="water-amount"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={waterAmount}
                        onChange={(e) => setWaterAmount(e.target.value)}
                      />
                      <Select value={waterUnit} onValueChange={setWaterUnit}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="liters">Liters</SelectItem>
                          <SelectItem value="gallons">Gallons</SelectItem>
                          <SelectItem value="cubic-meters">Cubic Meters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Emissions"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waste" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Waste Disposal</CardTitle>
                <CardDescription>Log your waste disposal activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Waste Type</Label>
                    <Select value={wasteType} onValueChange={setWasteType}>
                      <SelectTrigger id="waste-type">
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Waste</SelectItem>
                        <SelectItem value="organic">Organic Waste</SelectItem>
                        <SelectItem value="plastic">Plastic</SelectItem>
                        <SelectItem value="paper">Paper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-amount">Amount (kg)</Label>
                    <Input
                      id="waste-amount"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={wasteAmount}
                      onChange={(e) => setWasteAmount(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Emissions"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="travel" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Travel</CardTitle>
                <CardDescription>Log your travel activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transport-mode">Transport Mode</Label>
                    <Select value={transportMode} onValueChange={setTransportMode}>
                      <SelectTrigger id="transport-mode">
                        <SelectValue placeholder="Select transport mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                        <SelectItem value="subway">Subway</SelectItem>
                        <SelectItem value="bicycle">Bicycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance</Label>
                    <div className="flex gap-2">
                      <Input
                        id="distance"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                      />
                      <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="km">Kilometers</SelectItem>
                          <SelectItem value="miles">Miles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {transportMode === "car" && (
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Number of Passengers</Label>
                      <Input
                        id="passengers"
                        type="number"
                        placeholder="1"
                        min="1"
                        step="1"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Emissions"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {calculatedEmissions !== null && (
            <Card>
              <CardHeader>
                <CardTitle>Calculated Emissions</CardTitle>
                <CardDescription>Based on your input, we've calculated the following emissions:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary/10 p-6 text-center">
                  <span className="text-4xl font-bold text-primary">{calculatedEmissions} kg CO₂</span>
                  <p className="text-sm text-muted-foreground">
                    This is equivalent to driving a car for approximately {(calculatedEmissions * 4).toFixed(1)} km
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCalculatedEmissions(null)}>
                  Reset
                </Button>
                <Button onClick={handleSave}>Save Activity</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </Tabs>
    </div>
  )
}
