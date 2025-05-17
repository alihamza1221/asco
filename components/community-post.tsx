"use client"

import { MessageSquare, ThumbsUp, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CommunityPostProps {
  post: {
    id: string
    author: {
      name: string
      avatar: string
      initials: string
    }
    community: string
    content: string
    likes: number
    comments: number
    time: string
    images: string[]
  }
  onLike: () => void
  onComment: () => void
}

export function CommunityPost({ post, onLike, onComment }: CommunityPostProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.author.name}</span>
            <span className="text-sm text-muted-foreground">in</span>
            <Badge variant="outline" className="text-xs">
              {post.community}
            </Badge>
          </div>
          <p className="text-sm">{post.content}</p>

          {post.images.length > 0 && (
            <div className="mt-2 rounded-md overflow-hidden">
              <img
                src={post.images[0] || "/placeholder.svg"}
                alt="Post attachment"
                className="w-full h-auto object-cover max-h-[300px]"
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground" onClick={onLike}>
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground" onClick={onComment}>
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <span>{post.time}</span>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  )
}
