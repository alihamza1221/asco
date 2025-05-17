"use client"

import { MapPin, Users, MessageSquare, Award } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CommunityCardProps {
  community: {
    id: string
    name: string
    description: string
    members: number
    posts: number
    challenges: number
    image: string
    location: string
    joined: boolean
    tags: string[]
  }
  onJoin: () => void
  onLeave: () => void
}

export function CommunityCard({ community, onJoin, onLeave }: CommunityCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-24 bg-primary/10 flex items-center justify-center">
          <Avatar className="h-16 w-16 border-4 border-background">
            <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback>{community.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate">{community.name}</h3>
            {community.joined && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Joined
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{community.location}</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {community.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {community.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{community.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-4">
        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{community.members}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{community.posts}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{community.challenges}</span>
          </div>
        </div>
        {community.joined ? (
          <Button variant="outline" className="w-full" onClick={onLeave}>
            Leave
          </Button>
        ) : (
          <Button className="w-full" onClick={onJoin}>
            Join Community
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
