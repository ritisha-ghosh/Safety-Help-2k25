"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import {
  MessageSquare,
  Send,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Lightbulb,
  Users,
  AlertTriangle,
  HeartHandshake,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase" // Import Supabase client

interface Post {
  id: string
  author_id: string // Added for Supabase
  author_username: string // Changed from 'author'
  created_at: string // Changed from 'timestamp'
  content: string
  category: "Incident" | "Safety Tip" | "Community" | "Alert" | "Woman Safety"
  sentiment: "positive" | "negative" | "neutral"
  severity: "high" | "medium" | "low"
  upvotes: number
  downvotes: number
}

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth()
  const [postContent, setPostContent] = useState("")
  const [postCategory, setPostCategory] = useState<Post["category"]>("Community")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [postsLoading, setPostsLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true)
    const { data, error } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error.message)
    } else {
      setPosts(data as Post[])
    }
    setPostsLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const getSentimentColor = (sentiment: Post["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "border-vibrant-green shadow-vibrant-green/30"
      case "negative":
        return "border-destructive shadow-destructive/30"
      case "neutral":
      default:
        return "border-electric-blue shadow-electric-blue/30"
    }
  }

  const getSeverityColor = (severity: Post["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive"
      case "medium":
        return "bg-accent-yellow/20 text-accent-yellow border-accent-yellow"
      case "low":
      default:
        return "bg-vibrant-green/20 text-vibrant-green border-vibrant-green"
    }
  }

  const getCategoryIcon = (category: Post["category"]) => {
    switch (category) {
      case "Incident":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "Safety Tip":
        return <Lightbulb className="h-4 w-4 text-vibrant-green" />
      case "Community":
        return <Users className="h-4 w-4 text-electric-blue" />
      case "Alert":
        return <ShieldCheck className="h-4 w-4 text-accent-yellow" />
      case "Woman Safety":
        return <HeartHandshake className="h-4 w-4 text-accent-purple" />
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postContent.trim() || !user) return

    setIsSubmitting(true)
    try {
      // Call the sentiment analysis API (this would call your deployed Python service)
      const sentimentResponse = await fetch("/api/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: postContent }),
      })
      const { sentiment, severity } = await sentimentResponse.json()

      const { data, error } = await supabase
        .from("community_posts")
        .insert([
          {
            author_id: user.id,
            author_username: user.username,
            content: postContent,
            category: postCategory,
            sentiment: sentiment || "neutral",
            severity: severity || "low",
            upvotes: 0,
            downvotes: 0,
          },
        ])
        .select() // Select the inserted data to get the full post object

      if (error) {
        console.error("Error inserting post:", error.message)
        alert("Failed to post. Please try again.")
      } else if (data && data.length > 0) {
        // Add the new post to the local state
        setPosts((prevPosts) => [data[0] as Post, ...prevPosts])
        setPostContent("")
        setPostCategory("Community") // Reset category
      }
    } catch (error) {
      console.error("Failed to analyze sentiment or post:", error)
      alert("An error occurred while posting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVote = async (id: string, type: "up" | "down", currentVotes: number) => {
    const newVotes = currentVotes + 1
    const { error } = await supabase
      .from("community_posts")
      .update({ [type === "up" ? "upvotes" : "downvotes"]: newVotes })
      .eq("id", id)

    if (error) {
      console.error("Error updating vote:", error.message)
    } else {
      setPosts(
        posts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              upvotes: type === "up" ? newVotes : post.upvotes,
              downvotes: type === "down" ? newVotes : post.downvotes,
            }
          }
          return post
        }),
      )
    }
  }

  const filteredPosts = filterCategory === "All" ? posts : posts.filter((post) => post.category === filterCategory)

  if (authLoading || postsLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <Loader2 className="h-10 w-10 animate-spin text-electric-blue" />
        <p className="ml-4 text-lg text-muted-foreground">Loading SafetyHelp...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex-1">
      <h1 className="text-4xl font-bold text-electric-blue mb-8">Community Feed</h1>

      <section className="mb-8">
        <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-electric-blue/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-electric-blue" /> Share Your Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPost} className="grid gap-4">
              <Label htmlFor="post-content" className="sr-only">
                What's on your mind?
              </Label>
              <Textarea
                id="post-content"
                placeholder="Share a safety update, incident report, or tip..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={4}
                className="bg-background border-dark-border focus:ring-electric-blue"
                disabled={!user}
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="post-category" className="sr-only">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => setPostCategory(value as Post["category"])}
                    value={postCategory}
                    disabled={!user}
                  >
                    <SelectTrigger className="w-full bg-background border-dark-border focus:ring-electric-blue">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Incident">Incident</SelectItem>
                      <SelectItem value="Safety Tip">Safety Tip</SelectItem>
                      <SelectItem value="Alert">Alert</SelectItem>
                      <SelectItem value="Woman Safety">Woman Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-electric-blue text-primary-foreground hover:bg-electric-blue/80 shadow-glow-sm shadow-electric-blue/50"
                  disabled={isSubmitting || !user || !postContent.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Post Update
                    </>
                  )}
                </Button>
              </div>
              {!user && (
                <p className="text-sm text-muted-foreground text-center">Please login to share your updates.</p>
              )}
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-electric-blue">Recent Posts</h2>
          <Select onValueChange={setFilterCategory} defaultValue="All">
            <SelectTrigger className="w-[180px] bg-background border-dark-border focus:ring-electric-blue">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-dark-card border-dark-border">
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Incident">Incident</SelectItem>
              <SelectItem value="Safety Tip">Safety Tip</SelectItem>
              <SelectItem value="Alert">Alert</SelectItem>
              <SelectItem value="Woman Safety">Woman Safety</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No posts found for this category.</p>
          ) : (
            filteredPosts.map((post) => (
              <Card
                key={post.id}
                className={cn(
                  "bg-dark-card border-dark-border card-hover-effect shadow-glow-sm",
                  getSentimentColor(post.sentiment),
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">{post.author_username}</CardTitle>
                    <p className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-semibold border",
                        getSeverityColor(post.severity),
                      )}
                    >
                      {post.severity.charAt(0).toUpperCase() + post.severity.slice(1)} Severity
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1",
                        post.sentiment === "positive" && "bg-vibrant-green/20 text-vibrant-green border-vibrant-green",
                        post.sentiment === "negative" && "bg-destructive/20 text-destructive border-destructive",
                        post.sentiment === "neutral" && "bg-electric-blue/20 text-electric-blue border-electric-blue",
                      )}
                    >
                      {getCategoryIcon(post.category)} {post.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{post.content}</p>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, "up", post.upvotes)}
                      className="hover:text-vibrant-green"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" /> {post.upvotes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, "down", post.downvotes)}
                      className="hover:text-destructive"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" /> {post.downvotes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
