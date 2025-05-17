"use client"

import { Calendar, Trophy, Users, Zap } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CommunityChallengeProps {
  challenge: {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    participants: number
    progress: number
    image: string
    community: string
    reward: string
    difficulty: string
    joined: boolean
  }
  onJoin: () => void
  onLeave: () => void
}

export function CommunityChallenge({ challenge, onJoin, onLeave }: CommunityChallengeProps) {
  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
    const start = new Date(startDate).toLocaleDateString(undefined, options)
    const end = new Date(endDate).toLocaleDateString(undefined, options)
    return `${start} - ${end}`
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-500"
      case "medium":
        return "bg-orange-500/10 text-orange-500"
      case "hard":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img src={challenge.image || "/placeholder.svg"} alt={challenge.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{challenge.title}</CardTitle>
          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-sm text-muted-foreground">{challenge.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDateRange(challenge.startDate, challenge.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{challenge.participants} participants</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span>{challenge.reward}</span>
          </div>
        </div>
        {challenge.joined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your progress</span>
              <span className="font-medium">{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {challenge.joined ? (
          <Button variant="outline" className="w-full" onClick={onLeave}>
            Leave Challenge
          </Button>
        ) : (
          <Button className="w-full" onClick={onJoin}>
            <Zap className="mr-2 h-4 w-4" />
            Join Challenge
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
