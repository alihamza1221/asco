"use client"

import type React from "react"

import { useState } from "react"
import { Leaf, SproutIcon, Waves, CreditCard, Award, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { OffsetHistoryTable } from "@/components/offset-history-table"
import { OffsetImpactChart } from "@/components/offset-impact-chart"

// Offset project data
const offsetProjects = [
  {
    id: "tree-planting",
    title: "Plant Trees",
    description: "Offset your carbon footprint by planting trees.",
    icon: Leaf,
    unitLabel: "trees",
    unitCost: 3.99,
    offsetPerUnit: 20, // kg CO2 per tree
    minUnits: 1,
    maxUnits: 100,
    image: "/placeholder.svg?height=200&width=400",
    details:
      "Trees absorb CO₂ and release oxygen, helping to clean the air and combat climate change. Each tree planted can absorb approximately 20kg of CO₂ per year once mature.",
    locations: ["Brazil", "Kenya", "Indonesia"],
    certifications: ["Gold Standard", "Verified Carbon Standard"],
  },
  {
    id: "soil-regeneration",
    title: "Create Soil Area",
    description: "Support soil regeneration projects.",
    icon: SproutIcon,
    unitLabel: "m²",
    unitCost: 5.99,
    offsetPerUnit: 15, // kg CO2 per m²
    minUnits: 1,
    maxUnits: 50,
    image: "/placeholder.svg?height=200&width=400",
    details:
      "Healthy soil sequesters carbon and supports biodiversity, helping to mitigate climate change. Each square meter of regenerated soil can sequester approximately 15kg of CO₂ per year.",
    locations: ["United States", "France", "Australia"],
    certifications: ["Climate Action Reserve", "Plan Vivo"],
  },
  {
    id: "water-conservation",
    title: "Protect Water Bodies",
    description: "Support water conservation projects.",
    icon: Waves,
    unitLabel: "1000L",
    unitCost: 7.99,
    offsetPerUnit: 10, // kg CO2 per 1000L
    minUnits: 1,
    maxUnits: 30,
    image: "/placeholder.svg?height=200&width=400",
    details:
      "Clean water bodies act as carbon sinks and support diverse ecosystems that help fight climate change. Each 1000 liters of protected water can offset approximately 10kg of CO₂.",
    locations: ["Canada", "Sweden", "New Zealand"],
    certifications: ["Blue Carbon Initiative", "Water Stewardship Council"],
  },
]

// Payment method options
const paymentMethods = [
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Pay with Visa, Mastercard, or American Express",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Fast and secure payment with PayPal",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    description: "Quick payment with Apple Pay",
  },
]

export default function OffsetsPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [purchaseStep, setPurchaseStep] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  // User's total emissions and offsets
  const totalEmissions = 245.8 // kg CO2
  const currentOffsets = 42.3 // kg CO2

  // Get the selected project details
  const project = offsetProjects.find((p) => p.id === selectedProject)

  // Calculate the cost and impact
  const cost = project ? (quantity * project.unitCost).toFixed(2) : "0.00"
  const impact = project ? quantity * project.offsetPerUnit : 0

  // Handle project selection
  const handleSelectProject = (projectId: string) => {
    setSelectedProject(projectId)
    setPurchaseStep(1)
  }

  // Handle quantity change
  const handleQuantityChange = (value: number[]) => {
    setQuantity(value[0])
  }

  // Handle direct quantity input
  const handleDirectQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      if (project) {
        if (value < project.minUnits) {
          setQuantity(project.minUnits)
        } else if (value > project.maxUnits) {
          setQuantity(project.maxUnits)
        } else {
          setQuantity(value)
        }
      }
    }
  }

  // Handle continue to payment
  const handleContinueToPayment = () => {
    setPurchaseStep(2)
  }

  // Handle payment method selection
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }

  // Handle purchase completion
  const handleCompletePurchase = () => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setPurchaseStep(3)

      toast({
        title: "Purchase Successful!",
        description: `You've offset ${impact}kg of CO₂ by supporting the ${project?.title} project.`,
        variant: "success",
      })
    }, 2000)
  }

  // Handle starting a new purchase
  const handleStartNewPurchase = () => {
    setSelectedProject(null)
    setPurchaseStep(1)
    setQuantity(1)
    setActiveTab("browse")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Offsets</h1>
        <p className="text-muted-foreground">Offset your carbon footprint by supporting eco-friendly projects.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Offset Progress</CardTitle>
          <CardDescription>Track your carbon offset achievements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Total Emissions Offset</span>
              <span className="text-sm font-medium">
                {currentOffsets} kg / {totalEmissions} kg
              </span>
            </div>
            <Progress value={(currentOffsets / totalEmissions) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              You've offset {Math.round((currentOffsets / totalEmissions) * 100)}% of your total carbon footprint.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Leaf className="mr-1 h-3 w-3" />2 Trees Planted
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <SproutIcon className="mr-1 h-3 w-3" />5 m² Soil Protected
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Award className="mr-1 h-3 w-3" />
              Carbon Reducer Badge
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Projects</TabsTrigger>
          <TabsTrigger value="impact">Your Impact</TabsTrigger>
          <TabsTrigger value="history">Offset History</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {!selectedProject ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {offsetProjects.map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <project.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          1 {project.unitLabel} = {project.offsetPerUnit}kg CO₂ offset
                        </span>
                        <span className="font-medium">
                          ${project.unitCost.toFixed(2)} per {project.unitLabel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.details}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleSelectProject(project.id)}>
                      Select Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      {project && <project.icon className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <CardTitle>{project?.title}</CardTitle>
                      <CardDescription>{project?.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                    Change Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {purchaseStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                          <img
                            src={project?.image || "/placeholder.svg"}
                            alt={project?.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">Project Details</h3>
                            <p className="text-sm text-muted-foreground mt-1">{project?.details}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Locations</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {project?.locations.map((location) => (
                                <Badge key={location} variant="outline">
                                  {location}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Certifications</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {project?.certifications.map((cert) => (
                                <Badge key={cert} variant="outline" className="bg-primary/10 text-primary">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">Choose Amount</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Select how many {project?.unitLabel} you want to support
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="quantity">Quantity ({project?.unitLabel})</Label>
                              <span className="text-sm text-muted-foreground">
                                {project?.minUnits} - {project?.maxUnits}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Slider
                                id="quantity-slider"
                                min={project?.minUnits || 1}
                                max={project?.maxUnits || 100}
                                step={1}
                                value={[quantity]}
                                onValueChange={handleQuantityChange}
                                className="flex-1"
                              />
                              <Input
                                id="quantity"
                                type="number"
                                min={project?.minUnits}
                                max={project?.maxUnits}
                                value={quantity}
                                onChange={handleDirectQuantityInput}
                                className="w-20"
                              />
                            </div>
                          </div>
                          <div className="rounded-lg border p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Price per {project?.unitLabel}</span>
                              <span className="text-sm font-medium">${project?.unitCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Quantity</span>
                              <span className="text-sm font-medium">
                                {quantity} {project?.unitLabel}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">CO₂ Offset</span>
                              <span className="text-sm font-medium text-primary">{impact} kg</span>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-medium">${cost}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {purchaseStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium">Payment Method</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Choose how you'd like to pay for your offset
                          </p>
                        </div>
                        <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50"
                              onClick={() => setPaymentMethod(method.id)}
                            >
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div className="flex-1">
                                <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                  {method.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                              {method.id === "credit-card" && <CreditCard className="h-5 w-5 text-muted-foreground" />}
                            </div>
                          ))}
                        </RadioGroup>

                        {paymentMethod === "credit-card" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="name">Name on Card</Label>
                              <Input id="name" placeholder="John Doe" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="rounded-lg border p-4 space-y-4">
                          <h3 className="font-medium">Order Summary</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Project</span>
                              <span className="text-sm font-medium">{project?.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Quantity</span>
                              <span className="text-sm font-medium">
                                {quantity} {project?.unitLabel}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">CO₂ Offset</span>
                              <span className="text-sm font-medium text-primary">{impact} kg</span>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-medium">${cost}</span>
                              </div>
                            </div>
                          </div>
                          <div className="pt-4 space-y-2">
                            <p className="text-xs text-muted-foreground">
                              By completing this purchase, you're supporting verified carbon offset projects and helping
                              to combat climate change.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              You'll receive a certificate for your offset via email.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {purchaseStep === 3 && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Thank You for Your Purchase!</h2>
                      <p className="text-muted-foreground">
                        You've successfully offset {impact} kg of CO₂ by supporting the {project?.title} project.
                      </p>
                    </div>
                    <div className="rounded-lg border p-6 w-full max-w-md space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-medium">Certificate of Carbon Offset</h3>
                        <p className="text-sm text-muted-foreground">
                          This certifies that John Doe has offset {impact} kg of CO₂ emissions
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Project</span>
                          <span className="text-sm font-medium">{project?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Date</span>
                          <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Certificate ID</span>
                          <span className="text-sm font-medium">ECO-{Math.floor(Math.random() * 1000000)}</span>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-center">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Verified Carbon Offset
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleStartNewPurchase}>
                        Offset More
                      </Button>
                      <Button onClick={() => setActiveTab("impact")}>
                        View Your Impact <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              {(purchaseStep === 1 || purchaseStep === 2) && (
                <CardFooter className="flex justify-between">
                  {purchaseStep === 1 ? (
                    <>
                      <Button variant="outline" onClick={() => setSelectedProject(null)}>
                        Cancel
                      </Button>
                      <Button onClick={handleContinueToPayment}>Continue to Payment</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setPurchaseStep(1)}>
                        Back
                      </Button>
                      <Button onClick={handleCompletePurchase} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Complete Purchase"}
                      </Button>
                    </>
                  )}
                </CardFooter>
              )}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Offset Impact</CardTitle>
              <CardDescription>See the positive impact of your carbon offsets over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <OffsetImpactChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trees Planted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">40 kg CO₂ offset</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Soil Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <SproutIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5 m²</p>
                    <p className="text-sm text-muted-foreground">75 kg CO₂ offset</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Water Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Waves className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0 L</p>
                    <p className="text-sm text-muted-foreground">0 kg CO₂ offset</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Your offsets have made a real difference to the environment.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">42.3 kg</p>
                    <p className="text-xs text-muted-foreground">CO₂ Offset</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">169 km</p>
                    <p className="text-xs text-muted-foreground">Car Travel Equivalent</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">17%</p>
                    <p className="text-xs text-muted-foreground">Of Monthly Emissions</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Projects Supported</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Offset History</CardTitle>
              <CardDescription>A record of all your carbon offset purchases.</CardDescription>
            </CardHeader>
            <CardContent>
              <OffsetHistoryTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
