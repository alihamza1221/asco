"use client"

import { Download, FileText, ThumbsUp, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommunityResourceProps {
  resource: {
    id: string
    title: string
    description: string
    author: {
      name: string
      avatar: string
      initials: string
    }
    type: string
    downloads: number
    likes: number
    date: string
    image: string
    community: string
  }
  onDownload: () => void
  onLike: () => void
}

export function CommunityResource({ resource, onDownload, onLike }: CommunityResourceProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get resource type icon
  const getResourceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "guide":
        return <FileText className="h-4 w-4" />
      case "template":
        return <FileText className="h-4 w-4" />
      case "tutorial":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img src={resource.image || "/placeholder.svg"} alt={resource.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {getResourceTypeIcon(resource.type)}
            <span className="ml-1">{resource.type}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={resource.author.avatar || "/placeholder.svg"} alt={resource.author.name} />
            <AvatarFallback>{resource.author.initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{resource.author.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(resource.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <span>{resource.downloads} downloads</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onLike}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          {resource.likes}
        </Button>
        <Button className="flex-1" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
