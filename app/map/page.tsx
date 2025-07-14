"use client"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, Lightbulb, MessageSquare, Filter, BellRing, HeartHandshake } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Report {
  id: string
  type: "incident" | "safety-tip" | "alert" | "community" | "woman-safety"
  category: string
  severity: "high" | "medium" | "low"
  author: string
  date: string
  location: string
  description: string
  lat: number
  lng: number
}

const mockReports: Report[] = [
  {
    id: "map1",
    type: "incident",
    category: "Harassment",
    severity: "high",
    author: "Anonymous",
    date: "2024-07-10",
    location: "Downtown Metro Station, City Center",
    description: "Reported verbal harassment incident during rush hour. Area can be unsafe after dark.",
    lat: 40.75,
    lng: -73.99,
  },
  {
    id: "map2",
    type: "safety-tip",
    category: "Personal Safety",
    severity: "low",
    author: "SafetyGuru",
    date: "2024-07-09",
    location: "University Campus, West Side",
    description: "Always walk in well-lit areas, especially at night. Use the buddy system if possible.",
    lat: 40.79,
    lng: -73.96,
  },
  {
    id: "map3",
    type: "alert",
    category: "Public Safety",
    severity: "medium",
    author: "Admin",
    date: "2024-07-11",
    location: "Central Park, North End",
    description: "Increased police presence due to recent reports of suspicious activity. Exercise caution.",
    lat: 40.8,
    lng: -73.95,
  },
  {
    id: "map4",
    type: "woman-safety",
    category: "Safe Zone",
    severity: "low",
    author: "CommunityOrg",
    date: "2024-07-08",
    location: "Women's Community Center, East Side",
    description: "Designated safe zone and resource hub for women. Open daily 9 AM - 5 PM.",
    lat: 40.72,
    lng: -73.98,
  },
  {
    id: "map5",
    type: "incident",
    category: "Bad Touch",
    severity: "high",
    author: "User123",
    date: "2024-07-12",
    location: "Bus Stop, Main Street",
    description: "Experienced an inappropriate touch incident on the bus. Reported to authorities.",
    lat: 40.71,
    lng: -74.0,
  },
  {
    id: "map6",
    type: "woman-safety",
    category: "MeToo Support",
    severity: "low",
    author: "Support Network",
    date: "2024-07-07",
    location: "Online Forum (Virtual)",
    description:
      "Online support group for survivors of sexual harassment and assault. Safe space to share experiences.",
    lat: 40.74,
    lng: -73.97,
  },
]

export default function SafetyMapPage() {
  const { user } = useAuth()
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Please{" "}
          <Link href="/login" className="text-electric-blue hover:underline">
            login
          </Link>{" "}
          to view the Safety Map.
        </p>
      </div>
    )
  }

  const filteredReports = filterType === "all" ? mockReports : mockReports.filter((r) => r.type === filterType)

  const getSeverityColorClass = (severity: Report["severity"]) => {
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

  const getReportIcon = (type: Report["type"]) => {
    switch (type) {
      case "incident":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "safety-tip":
        return <Lightbulb className="h-5 w-5 text-vibrant-green" />
      case "alert":
        return <BellRing className="h-5 w-5 text-accent-yellow" />
      case "community":
        return <MessageSquare className="h-5 w-5 text-electric-blue" />
      case "woman-safety":
        return <HeartHandshake className="h-5 w-5 text-accent-purple" />
      default:
        return <MapPin className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex-1">
      <h1 className="text-4xl font-bold text-electric-blue mb-8">Safety Map</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-electric-blue/30 h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-6 w-6 text-electric-blue" /> Interactive Map (Placeholder)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center bg-muted/10 rounded-md border border-dark-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-vibrant-green/5 opacity-20 animate-pulse" />
              <p className="text-muted-foreground text-lg z-10">Map integration coming soon...</p>
              <div className="absolute bottom-4 left-4 bg-dark-card/80 backdrop-blur-sm p-3 rounded-lg border border-dark-border shadow-lg">
                <p className="text-sm text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-vibrant-green" /> Your Location: Mock City, Mock State (High Accuracy)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-vibrant-green/30 h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Filter className="h-6 w-6 text-vibrant-green" /> Safety Reports
              </CardTitle>
              <Select onValueChange={setFilterType} defaultValue="all">
                <SelectTrigger className="w-[180px] bg-background border-dark-border focus:ring-vibrant-green">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-dark-card border-dark-border">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="incident">Incidents</SelectItem>
                  <SelectItem value="safety-tip">Safety Tips</SelectItem>
                  <SelectItem value="alert">Alerts</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="woman-safety">Woman Safety</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2">
              <div className="grid gap-4">
                {filteredReports.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No reports found for this filter.</p>
                ) : (
                  filteredReports.map((report) => (
                    <Card
                      key={report.id}
                      className={cn(
                        "bg-background border-dark-border card-hover-effect cursor-pointer",
                        getSeverityColorClass(report.severity),
                      )}
                      onClick={() => setSelectedReport(report)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          {getReportIcon(report.type)}
                          <h3 className="font-semibold text-foreground">{report.location}</h3>
                          <Badge className={cn("ml-auto", getSeverityColorClass(report.severity))}>
                            {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {report.date} by {report.author}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="sm:max-w-[600px] bg-dark-card border-dark-border shadow-glow-md shadow-electric-blue/30">
          <DialogHeader>
            <DialogTitle className="text-electric-blue flex items-center gap-2">
              {selectedReport && getReportIcon(selectedReport.type)}
              {selectedReport?.location}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Details of the selected safety report.
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Type:</span>
                <Badge className="bg-electric-blue/20 text-electric-blue border-electric-blue">
                  {selectedReport.type
                    .replace("-", " ")
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Category:</span>
                <Badge className="bg-vibrant-green/20 text-vibrant-green border-vibrant-green">
                  {selectedReport.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Severity:</span>
                <Badge className={getSeverityColorClass(selectedReport.severity)}>
                  {selectedReport.severity.charAt(0).toUpperCase() + selectedReport.severity.slice(1)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-foreground">
                  <span className="font-medium">Author:</span> {selectedReport.author}
                </p>
                <p className="text-foreground">
                  <span className="font-medium">Date:</span> {selectedReport.date}
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Description:</p>
                <p className="text-muted-foreground">{selectedReport.description}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setSelectedReport(null)} className="bg-electric-blue hover:bg-electric-blue/80">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
