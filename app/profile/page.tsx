import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SimpleChart } from "@/components/simple-chart"
import { Award, Edit, Leaf, Settings, Trophy } from "lucide-react"

export default function ProfilePage() {
  const achievementsData = [
    { label: "Trees Planted", value: 2 },
    { label: "Challenges Completed", value: 5 },
    { label: "CO₂ Offset", value: 42.3 },
    { label: "XP Earned", value: 750 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your eco achievements.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit profile</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback className="text-xl">JD</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground">john@example.com</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                <Leaf className="mr-1 h-3 w-3" />
                Eco Warrior
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                <Trophy className="mr-1 h-3 w-3" />
                Top 10%
              </Badge>
              <Badge variant="outline">
                <Award className="mr-1 h-3 w-3" />5 Challenges
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Eco Impact</CardTitle>
            <CardDescription>Track your environmental contributions over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleChart data={achievementsData} type="bar" height={250} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
          <TabsTrigger value="settings">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">First Tree Planted</CardTitle>
                <CardDescription>Planted your first tree through EcoMate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Earned: April 15, 2023</p>
                    <p className="text-xs text-muted-foreground">20kg CO₂ offset</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Challenge Champion</CardTitle>
                <CardDescription>Completed 5 eco challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Earned: May 22, 2023</p>
                    <p className="text-xs text-muted-foreground">+100 XP bonus</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Carbon Reducer</CardTitle>
                <CardDescription>Reduced carbon footprint by 20%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Earned: June 10, 2023</p>
                    <p className="text-xs text-muted-foreground">+150 XP bonus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your logged activities and their impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Car Travel</p>
                    <p className="text-sm text-muted-foreground">35 km, 1 passenger</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-destructive">+5.95 kg CO₂</p>
                    <p className="text-sm text-muted-foreground">May 15, 2023</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Electricity Usage</p>
                    <p className="text-sm text-muted-foreground">120 kWh, monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-destructive">+60 kg CO₂</p>
                    <p className="text-sm text-muted-foreground">May 10, 2023</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Tree Planted</p>
                    <p className="text-sm text-muted-foreground">Offset activity</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">-20 kg CO₂</p>
                    <p className="text-sm text-muted-foreground">May 5, 2023</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Transit</p>
                    <p className="text-sm text-muted-foreground">Bus, 15 km</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-destructive">+1.5 kg CO₂</p>
                    <p className="text-sm text-muted-foreground">May 3, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="john@example.com" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-activity"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="email-activity" className="text-sm font-normal">
                      Activity summaries
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-challenges"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="email-challenges" className="text-sm font-normal">
                      New challenges
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-tips" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <Label htmlFor="email-tips" className="text-sm font-normal">
                      Eco tips
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Push Notifications</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="push-reminders"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="push-reminders" className="text-sm font-normal">
                      Activity reminders
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="push-achievements"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="push-achievements" className="text-sm font-normal">
                      Achievement unlocked
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="push-community"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="push-community" className="text-sm font-normal">
                      Community updates
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
