"use client"

import { useState } from "react"
import { Search, Users, Plus, Filter, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { CommunityCard } from "@/components/community-card"
import { CommunityPost } from "@/components/community-post"
import { CommunityEvent } from "@/components/community-event"

// Sample community data
const communitiesData = [
  {
    id: "1",
    name: "Zero Waste Heroes",
    description: "A community dedicated to reducing waste and living a zero-waste lifestyle.",
    members: 1245,
    posts: 87,
    challenges: 5,
    image: "/placeholder.svg?height=100&width=100",
    location: "Global",
    joined: true,
    tags: ["zero-waste", "sustainable-living", "recycling"],
  },
  {
    id: "2",
    name: "Urban Gardeners",
    description: "Growing food and plants in urban environments to reduce carbon footprint.",
    members: 876,
    posts: 124,
    challenges: 3,
    image: "/placeholder.svg?height=100&width=100",
    location: "Urban Areas",
    joined: false,
    tags: ["gardening", "urban-farming", "local-food"],
  },
  {
    id: "3",
    name: "Sustainable Transport",
    description: "Promoting cycling, walking, and public transport to reduce emissions.",
    members: 654,
    posts: 56,
    challenges: 2,
    image: "/placeholder.svg?height=100&width=100",
    location: "Global",
    joined: false,
    tags: ["cycling", "public-transport", "car-free"],
  },
  {
    id: "4",
    name: "Renewable Energy Advocates",
    description: "Supporting the transition to renewable energy sources.",
    members: 432,
    posts: 43,
    challenges: 1,
    image: "/placeholder.svg?height=100&width=100",
    location: "Global",
    joined: false,
    tags: ["solar", "wind", "renewable"],
  },
  {
    id: "5",
    name: "Plastic-Free Living",
    description: "Tips and support for reducing plastic consumption in daily life.",
    members: 987,
    posts: 76,
    challenges: 4,
    image: "/placeholder.svg?height=100&width=100",
    location: "Global",
    joined: false,
    tags: ["plastic-free", "sustainable-living", "oceans"],
  },
  {
    id: "6",
    name: "Local Food Movement",
    description: "Supporting local farmers and reducing food miles.",
    members: 543,
    posts: 65,
    challenges: 2,
    image: "/placeholder.svg?height=100&width=100",
    location: "Regional",
    joined: false,
    tags: ["local-food", "farmers-markets", "seasonal-eating"],
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
    community: "Sustainable Transport",
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
  {
    id: "4",
    author: {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EJ",
    },
    community: "Urban Gardeners",
    content:
      "My balcony garden is thriving! Growing my own herbs and vegetables has reduced my grocery store trips and packaging waste. Here's this week's harvest! 🌱",
    likes: 32,
    comments: 7,
    time: "1 day ago",
    images: ["/placeholder.svg?height=300&width=500"],
  },
  {
    id: "5",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
    },
    community: "Renewable Energy Advocates",
    content: "Just installed solar panels on my roof! Estimated to reduce my carbon footprint by 2.5 tons per year. ☀️",
    likes: 45,
    comments: 12,
    time: "2 days ago",
    images: ["/placeholder.svg?height=300&width=500"],
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
  {
    id: "3",
    title: "Bike to Work Day",
    description: "Ditch your car and join the community cycling to work.",
    date: "2023-06-30",
    time: "7:00 AM - 9:00 AM",
    location: "City-wide",
    community: "Sustainable Transport",
    attendees: 112,
    image: "/placeholder.svg?height=150&width=300",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")
  const [communities, setCommunities] = useState(communitiesData)
  const [posts, setPosts] = useState(postsData)
  const [events, setEvents] = useState(eventsData)
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCommunity, setNewPostCommunity] = useState("Zero Waste Heroes")
  const [newCommunityName, setNewCommunityName] = useState("")
  const [newCommunityDescription, setNewCommunityDescription] = useState("")
  const [newCommunityLocation, setNewCommunityLocation] = useState("Global")
  const [newCommunityTags, setNewCommunityTags] = useState("")
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [isCreatingCommunity, setIsCreatingCommunity] = useState(false)

  // Filter communities based on search query
  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Get joined communities
  const joinedCommunities = communities.filter((community) => community.joined)

  // Handle joining a community
  const handleJoinCommunity = (communityId: string) => {
    setCommunities(
      communities.map((community) => (community.id === communityId ? { ...community, joined: true } : community)),
    )
    toast({
      title: "Community Joined",
      description: "You have successfully joined the community.",
      variant: "success",
    })
  }

  // Handle leaving a community
  const handleLeaveCommunity = (communityId: string) => {
    setCommunities(
      communities.map((community) => (community.id === communityId ? { ...community, joined: false } : community)),
    )
    toast({
      description: "You have left the community.",
    })
  }

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
      community: newPostCommunity,
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: "Just now",
      images: [],
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setIsCreatingPost(false)
    toast({
      title: "Post Created",
      description: "Your post has been published to the community.",
      variant: "success",
    })
  }

  // Handle creating a new community
  const handleCreateCommunity = () => {
    if (!newCommunityName.trim() || !newCommunityDescription.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please provide a name and description for your community.",
        variant: "destructive",
      })
      return
    }

    const newCommunity = {
      id: `community-${Date.now()}`,
      name: newCommunityName,
      description: newCommunityDescription,
      members: 1, // Creator is the first member
      posts: 0,
      challenges: 0,
      image: "/placeholder.svg?height=100&width=100",
      location: newCommunityLocation,
      joined: true,
      tags: newCommunityTags.split(",").map((tag) => tag.trim().toLowerCase()),
    }

    setCommunities([newCommunity, ...communities])
    setNewCommunityName("")
    setNewCommunityDescription("")
    setNewCommunityLocation("Global")
    setNewCommunityTags("")
    setIsCreatingCommunity(false)
    toast({
      title: "Community Created",
      description: "Your new community has been created successfully.",
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect with other eco-conscious individuals and share your journey.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search communities, posts, events..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogDescription>Share your eco-friendly activities with the community.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="community">Select Community</Label>
                  <Select value={newPostCommunity} onValueChange={setNewPostCommunity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a community" />
                    </SelectTrigger>
                    <SelectContent>
                      {joinedCommunities.map((community) => (
                        <SelectItem key={community.id} value={community.name}>
                          {community.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="post-content">Post Content</Label>
                  <Textarea
                    id="post-content"
                    placeholder="Share your thoughts, achievements, or questions..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingPost(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost}>Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreatingCommunity} onOpenChange={setIsCreatingCommunity}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Create Community
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create a New Community</DialogTitle>
                <DialogDescription>Start a community around an eco-friendly topic or interest.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="community-name">Community Name</Label>
                  <Input
                    id="community-name"
                    placeholder="e.g., Sustainable Fashion"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="community-description">Description</Label>
                  <Textarea
                    id="community-description"
                    placeholder="Describe what your community is about..."
                    value={newCommunityDescription}
                    onChange={(e) => setNewCommunityDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="community-location">Location</Label>
                  <Select value={newCommunityLocation} onValueChange={setNewCommunityLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Global">Global</SelectItem>
                      <SelectItem value="Regional">Regional</SelectItem>
                      <SelectItem value="Local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="community-tags">Tags (comma-separated)</Label>
                  <Input
                    id="community-tags"
                    placeholder="e.g., sustainable-fashion, recycling, eco-friendly"
                    value={newCommunityTags}
                    onChange={(e) => setNewCommunityTags(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingCommunity(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCommunity}>Create Community</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="my-communities">My Communities</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>See what's happening in the EcoMate community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {posts.map((post) => (
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

        <TabsContent value="explore" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Discover Communities</CardTitle>
                <CardDescription>Find and join communities that match your interests.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onJoin={() => handleJoinCommunity(community.id)}
                    onLeave={() => handleLeaveCommunity(community.id)}
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

        <TabsContent value="my-communities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Communities</CardTitle>
              <CardDescription>Communities you've joined or created.</CardDescription>
            </CardHeader>
            <CardContent>
              {joinedCommunities.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {joinedCommunities.map((community) => (
                    <CommunityCard
                      key={community.id}
                      community={community}
                      onJoin={() => handleJoinCommunity(community.id)}
                      onLeave={() => handleLeaveCommunity(community.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Communities Joined Yet</h3>
                  <p className="text-muted-foreground mt-2 mb-6">
                    You haven't joined any communities yet. Explore and join communities to see them here.
                  </p>
                  <Button onClick={() => setActiveTab("explore")}>Explore Communities</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Eco-friendly events and activities in your communities.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar View
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {events.map((event) => (
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
      </Tabs>
    </div>
  )
}
