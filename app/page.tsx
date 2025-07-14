"use client"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Users,
  ShieldCheck,
  BellRing,
  Award,
  MessageSquare,
  MapPin,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  PlusCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Members",
      value: "12,345",
      icon: Users,
      color: "text-electric-blue",
      shadow: "shadow-electric-blue/30",
    },
    {
      title: "Safety Reports",
      value: "876",
      icon: ShieldCheck,
      color: "text-vibrant-green",
      shadow: "shadow-vibrant-green/30",
    },
    {
      title: "Active Alerts",
      value: "12",
      icon: BellRing,
      color: "text-accent-yellow",
      shadow: "shadow-accent-yellow/30",
    },
    {
      title: "Safety Score",
      value: "92%",
      icon: Award,
      color: "text-accent-purple",
      shadow: "shadow-accent-purple/30",
    },
  ]

  const platformFeatures = [
    {
      title: "Community Feed",
      description: "Share updates & tips",
      icon: MessageSquare,
      link: "/community",
      color: "bg-electric-blue/20 border-electric-blue",
    },
    {
      title: "Safety Map",
      description: "View incident hotspots",
      icon: MapPin,
      link: "/map",
      color: "bg-vibrant-green/20 border-vibrant-green",
    },
    {
      title: "Safety Knowledge",
      description: "Enhance your awareness",
      icon: Lightbulb,
      link: "/quiz",
      color: "bg-accent-purple/20 border-accent-purple",
    },
    {
      title: "Emergency Services",
      description: "Quick access directory",
      icon: BookOpen,
      link: "/emergency-services",
      color: "bg-accent-yellow/20 border-accent-yellow",
    },
  ]

  const quickActions = [
    {
      title: "Emergency SOS",
      icon: AlertTriangle,
      link: "/sos",
      color: "bg-destructive/20 border-destructive text-destructive",
      buttonText: "Activate SOS",
    },
    {
      title: "Report Incident",
      icon: PlusCircle,
      link: "/community",
      color: "bg-electric-blue/20 border-electric-blue text-electric-blue",
      buttonText: "New Report",
    },
    {
      title: "Safety Quiz",
      icon: HelpCircle,
      link: "/quiz",
      color: "bg-vibrant-green/20 border-vibrant-green text-vibrant-green",
      buttonText: "Take Quiz",
    },
  ]

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold text-electric-blue mb-4">Welcome to SafetyHelp</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your community platform for enhanced safety and awareness. Please{" "}
          <Link href="/login" className="text-electric-blue hover:underline">
            login
          </Link>{" "}
          or{" "}
          <Link href="/register" className="text-vibrant-green hover:underline">
            register
          </Link>{" "}
          to get started.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          <Link href="/login">
            <Button className="w-full bg-electric-blue text-primary-foreground hover:bg-electric-blue/80 shadow-glow-sm shadow-electric-blue/50 py-6 text-lg">
              Login to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button className="w-full bg-vibrant-green text-primary-foreground hover:bg-vibrant-green/80 shadow-glow-sm shadow-vibrant-green/50 py-6 text-lg">
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex-1">
      <h1 className="text-4xl font-bold text-electric-blue mb-8">Welcome back, {user.username}!</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-electric-blue mb-6">Key Safety Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={`bg-dark-card border-dark-border card-hover-effect shadow-glow-sm ${stat.shadow}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-electric-blue mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature) => (
            <Link key={feature.title} href={feature.link} className="block">
              <Card className={`bg-dark-card border-dark-border card-hover-effect shadow-glow-sm ${feature.color}/30`}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className={`p-3 rounded-full mb-4 border ${feature.color} shadow-glow-sm ${feature.color}/50`}>
                    <feature.icon className={`h-8 w-8 ${feature.color.split(" ")[0].replace("bg", "text")}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-electric-blue mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className={`bg-dark-card border-dark-border card-hover-effect shadow-glow-sm ${action.color.split(" ")[0].replace("bg", "shadow")}/30`}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div
                  className={`p-3 rounded-full mb-4 border ${action.color} shadow-glow-sm ${action.color.split(" ")[0].replace("bg", "shadow")}/50`}
                >
                  <action.icon className={`h-8 w-8 ${action.color.split(" ")[0].replace("bg", "text")}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{action.title}</h3>
                <Link href={action.link}>
                  <Button
                    className={`mt-4 w-full ${action.color.split(" ")[0].replace("bg", "bg")} ${action.color.split(" ")[1].replace("border", "border")} ${action.color.split(" ")[2].replace("text", "text")} hover:${action.color.split(" ")[0].replace("bg", "bg")}/80`}
                  >
                    {action.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-electric-blue mb-6">Recent Activity</h2>
        <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-electric-blue/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  AS
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    <span className="text-electric-blue">Aisha S.</span> posted a new Woman Safety tip: "Always share
                    your live location with a trusted contact when going out alone."
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  UA
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    <span className="text-vibrant-green">User A.</span> reported an incident of street harassment near
                    the subway station.
                    <span className="inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-destructive/20 text-destructive border border-destructive">
                      High Severity
                    </span>
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  CW
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    <span className="text-accent-purple">Community Watch</span> shared a community announcement about a
                    local self-defense workshop for women.
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">1 day ago</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="mt-6 w-full text-electric-blue hover:bg-electric-blue/10">
              View All Activity <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
