"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Users, MessageSquare, Award, ArrowLeft, Settings, Bell, Share2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CommunityPost } from "@/components/community-post"
import { CommunityEvent } from "@/components/community-event"
import { CommunityChallenge } from "@/components/community-challenge"
import { CommunityResource } from "@/components/community-resource"
import { toast } from "@/components/ui/use-toast"

// Sample community data
const communitiesData = [
  {
    id: "1",
    name: "Zero Waste Heroes",
    description:
      "A community dedicated to reducing waste and living a zero-waste lifestyle. We share tips, challenges, and support each other in our journey to minimize our environmental impact through waste reduction.",
    members: 1245,
    posts: 87,
    challenges: 5,
    image: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=300&width=1200",
    location: "Global",
    joined: true,
    tags: ["zero-waste", "sustainable-living", "recycling"],
    about:
      "Zero Waste Heroes is a global community of individuals committed to reducing their waste footprint. We believe that small changes in our daily habits can lead to significant environmental benefits. Our community focuses on practical tips, product recommendations, and support for those at any stage of their zero-waste journey.",
    rules: [
      "Be respectful and supportive of all members",
      "Share only accurate information and cite sources when possible",
      "No promotional content without moderator approval",
      "Focus on practical, actionable advice",
      "Celebrate progress, not perfection",
    ],
    admins: [
      {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      {
        name: "Michael Scott",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MS",
      },
    ],
  },
  {
    id: "2",
    name: "Urban Gardeners",
    description: "Growing food and plants in urban environments to reduce carbon footprint.",
    members: 876,
    posts: 124,
    challenges: 3,
    image: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=300&width=1200",
    location: "Urban Areas",
    joined: false,
    tags: ["gardening", "urban-farming", "local-food"],
    about:
      "Urban Gardeners brings together city dwellers who are passionate about growing their own food and plants in limited spaces. We share techniques for balcony gardens, community plots, indoor growing, and more.",
    rules: [
      "Share knowledge freely",
      "Be respectful of different gardening approaches",
      "No selling or advertising without permission",
      "Support beginners and answer questions",
    ],
    admins: [
      {
        name: "Alex Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AS",
      },
    ],
  },
]

// Sample posts data
const postsData = [
  {
    id: "1",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    community: "Zero Waste Heroes",
    content: "Just planted 3 trees through EcoMate! That's 60kg of CO₂ offset. 🌳",
    likes: 24,
    comments: 5,
    time: "2 hours ago",
    images: [],
  },
  {
    id: "2",
    author: {
      name: "Michael Scott",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MS",
    },
    community: "Zero Waste Heroes",
    content: "Completed the Public Transit Week challenge! Saved approximately 30kg of CO₂ emissions. 🚌",
    likes: 18,
    comments: 3,
    time: "5 hours ago",
    images: ["/placeholder.svg?height=300&width=500"],
  },
  {
    id: "3",
    author: {
      name: "Alex Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AS",
    },
    community: "Zero Waste Heroes",
    content: "Just calculated my carbon footprint for the month. Down 15% from last month! 📉",
    likes: 12,
    comments: 2,
    time: "8 hours ago",
    images: [],
  },
]

// Sample events data
const eventsData = [
  {
    id: "1",
    title: "Community Tree Planting",
    description: "Join us for a day of tree planting in the local park.",
    date: "2023-06-15",
    time: "10:00 AM - 2:00 PM",
    location: "Central Park",
    community: "Zero Waste Heroes",
    attendees: 28,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "2",
    title: "Sustainable Living Workshop",
    description: "Learn practical tips for reducing your environmental impact.",
    date: "2023-06-22",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    community: "Zero Waste Heroes",
    attendees: 45,
    image: "/placeholder.svg?height=150&width=300",
  },
]

// Sample challenges data
const challengesData = [
  {
    id: "1",
    title: "Zero Waste Week",
    description: "Try to produce zero landfill waste for a full week.",
    startDate: "2023-06-01",
    endDate: "2023-06-07",
    participants: 156,
    progress: 65,
    image: "/placeholder.svg?height=150&width=300",
    community: "Zero Waste Heroes",
    reward: "100 EcoPoints",
    difficulty: "Medium",
    joined: true,
  },
  {
    id: "2",
    title: "Plastic-Free July",
    description: "Avoid single-use plastics for the entire month of July.",
    startDate: "2023-07-01",
    endDate: "2023-07-31",
    participants: 89,
    progress: 0,
    image: "/placeholder.svg?height=150&width=300",
    community: "Zero Waste Heroes",
    reward: "200 EcoPoints",
    difficulty: "Hard",
    joined: false,
  },
  {
    id: "3",
    title: "Meatless Mondays",
    description: "Go vegetarian every Monday for a month.",
    startDate: "2023-06-05",
    endDate: "2023-07-03",
    participants: 210,
    progress: 25,
    image: "/placeholder.svg?height=150&width=300",
    community: "Zero Waste Heroes",
    reward: "75 EcoPoints",
    difficulty: "Easy",
    joined: true,
  },
]

// Sample resources data
const resourcesData = [
  {
    id: "1",
    title: "Beginner's Guide to Zero Waste",
    description: "A comprehensive guide for those starting their zero waste journey.",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    type: "Guide",
    downloads: 342,
    likes: 56,
    date: "2023-04-15",
    image: "/placeholder.svg?height=150&width=300",
    community: "Zero Waste Heroes",
  },
  {
    id: "2",
    title: "DIY Cleaning Products",
    description: "Recipes for making your own eco-friendly cleaning products.",
    author: {
      name: "Michael Scott",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MS",
    },
    type: "Tutorial",
    downloads: 189,
    likes: 42,
    date: "2023-05-10",
    image: "/placeholder.svg?height=150&width=300",
    community: "Zero Waste Heroes",
  },
  {
    id: "3",
    title: "Zero Waste Shopping List",
    description: "A printable shopping list for zero waste grocery shopping.",
    author: {
      name: "Alex Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AS",
    },
    type: "Template",
    downloads: 567,
    likes: 89,
    date: "2023-03-22",
    image: "/placeholder.svg?height=150&width=300",
    community: "Zero Waste Heroes",
  },
]

// Sample leaderboard data
const leaderboardData = [
  {
    id: "1",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
    points: 1250,
    posts: 45,
    challenges: 8,
    rank: 1,
  },
  {
    id: "2",
    name: "Michael Scott",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
    points: 980,
    posts: 32,
    challenges: 6,
    rank: 2,
  },
  {
    id: "3",
    name: "Alex Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AS",
    points: 875,
    posts: 28,
    challenges: 5,
    rank: 3,
  },
  {
    id: "4",
    name: "Emily Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EJ",
    points: 720,
    posts: 24,
    challenges: 4,
    rank: 4,
  },
  {
    id: "5",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
    points: 450,
    posts: 15,
    challenges: 3,
    rank: 8,
    isCurrentUser: true,
  },
]

export default function CommunityDetailsPage() {
  const params = useParams()
  const communityId = params.id as string
  const [activeTab, setActiveTab] = useState("feed")
  const [newPostContent, setNewPostContent] = useState("")
  const [posts, setPosts] = useState(postsData)
  const [events, setEvents] = useState(eventsData)
  const [challenges, setChallenges] = useState(challengesData)
  const [resources, setResources] = useState(resourcesData)
  const [isSubscribed, setIsSubscribed] = useState(true)

  // Find the community data
  const community = communitiesData.find((c) => c.id === communityId) || communitiesData[0]

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content for your post.",
        variant: "destructive",
      })
      return
    }

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      community: community.name,
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: "Just now",
      images: [],
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    toast({
      title: "Post Created",
      description: "Your post has been published to the community.",
      variant: "success",
    })
  }

  // Handle liking a post
  const handleLikePost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  // Handle commenting on a post
  const handleCommentPost = (postId: string) => {
    // In a real app, this would open a comment form
    toast({
      description: "Comment functionality would open here.",
    })
  }

  // Handle joining an event
  const handleJoinEvent = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, attendees: event.attendees + 1 } : event)))
    toast({
      title: "Event Joined",
      description: "You have successfully registered for the event.",
      variant: "success",
    })
  }

  // Handle joining a challenge
  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(
      challenges.map((challenge) => (challenge.id === challengeId ? { ...challenge, joined: true } : challenge)),
    )
    toast({
      title: "Challenge Joined",
      description: "You have successfully joined the challenge.",
      variant: "success",
    })
  }

  // Handle leaving a challenge
  const handleLeaveChallenge = (challengeId: string) => {
    setChallenges(
      challenges.map((challenge) => (challenge.id === challengeId ? { ...challenge, joined: false } : challenge)),
    )
    toast({
      description: "You have left the challenge.",
    })
  }

  // Handle downloading a resource
  const handleDownloadResource = (resourceId: string) => {
    setResources(
      resources.map((resource) =>
        resource.id === resourceId ? { ...resource, downloads: resource.downloads + 1 } : resource,
      ),
    )
    toast({
      title: "Resource Downloaded",
      description: "The resource has been downloaded successfully.",
      variant: "success",
    })
  }

  // Handle liking a resource
  const handleLikeResource = (resourceId: string) => {
    setResources(
      resources.map((resource) => (resource.id === resourceId ? { ...resource, likes: resource.likes + 1 } : resource)),
    )
  }

  // Handle subscribing to notifications
  const handleToggleSubscription = () => {
    setIsSubscribed(!isSubscribed)
    toast({
      description: isSubscribed
        ? "You have unsubscribed from community notifications."
        : "You have subscribed to community notifications.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/community">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Communities</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{community.name}</h1>
      </div>

      <div className="relative">
        <div className="h-48 w-full rounded-lg bg-muted overflow-hidden">
          <img
            src={community.coverImage || "/placeholder.svg?height=300&width=1200"}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-12 left-6 flex items-end">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback>{community.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {community.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground">{community.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant={isSubscribed ? "outline" : "default"} size="sm" onClick={handleToggleSubscription}>
            <Bell className="mr-2 h-4 w-4" />
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          {community.admins.some((admin) => admin.name === "John Doe") && (
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Manage
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder={`Share something with the ${community.name} community...`}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleCreatePost}>Post</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Feed</CardTitle>
                  <CardDescription>Recent posts from community members.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {posts
                      .filter((post) => post.community === community.name)
                      .map((post) => (
                        <CommunityPost
                          key={post.id}
                          post={post}
                          onLike={() => handleLikePost(post.id)}
                          onComment={() => handleCommentPost(post.id)}
                        />
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Community Challenges</CardTitle>
                    <CardDescription>Eco-challenges specific to this community.</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Propose Challenge
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {challenges
                      .filter((challenge) => challenge.community === community.name)
                      .map((challenge) => (
                        <CommunityChallenge
                          key={challenge.id}
                          challenge={challenge}
                          onJoin={() => handleJoinChallenge(challenge.id)}
                          onLeave={() => handleLeaveChallenge(challenge.id)}
                        />
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Challenges
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Community Events</CardTitle>
                    <CardDescription>Upcoming events organized by this community.</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {events
                      .filter((event) => event.community === community.name)
                      .map((event) => (
                        <CommunityEvent key={event.id} event={event} onJoin={() => handleJoinEvent(event.id)} />
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Community Resources</CardTitle>
                    <CardDescription>Guides, templates, and other resources shared by the community.</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {resources
                      .filter((resource) => resource.community === community.name)
                      .map((resource) => (
                        <CommunityResource
                          key={resource.id}
                          resource={resource}
                          onDownload={() => handleDownloadResource(resource.id)}
                          onLike={() => handleLikeResource(resource.id)}
                        />
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Community Leaderboard</CardTitle>
                  <CardDescription>Top contributors in this community.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.map((member) => (
                      <div
                        key={member.id}
                        className={`flex items-center gap-4 rounded-lg border p-4 ${
                          member.isCurrentUser ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {member.rank}
                        </div>
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {member.name} {member.isCurrentUser ? "(You)" : ""}
                            </h4>
                            <span className="font-medium">{member.points} points</span>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{member.posts} posts</span>
                            <span>{member.challenges} challenges</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Full Leaderboard
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{community.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{community.posts} posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{community.challenges} challenges</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{community.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {community.rules.map((rule, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admins & Moderators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {community.admins.map((admin) => (
                  <div key={admin.name} className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                      <AvatarFallback>{admin.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{admin.name}</p>
                      <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
