"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  Search,
  MapPin,
  Star,
  Clock,
  ExternalLink,
  HeartHandshake,
  Hospital,
  Users,
  AlertTriangle,
  Building2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Service {
  id: string
  name: string
  category: "police-station" | "ngo-women-safety" | "hospital" | "crisis-helpline" | "legal-aid" | "shelter"
  address: string
  phone: string
  distance: string
  openStatus: "Open Now" | "Closed"
  rating: number
}

const mockEmergencyNumbers = [
  { name: "All-in-One Emergency (India)", number: "112", description: "Police, Fire, Ambulance, Women's Helpline." },
  { name: "Women's Helpline (India)", number: "1098", description: "Childline India (for children in distress)." },
  { name: "National Commission for Women", number: "10921", description: "For complaints related to women's rights." },
  { name: "Domestic Abuse Helpline", number: "181", description: "For domestic violence victims (some states)." },
  { name: "Police Control Room", number: "100", description: "Direct police assistance." },
]

const mockServices: Service[] = [
  {
    id: "s1",
    name: "Delhi Police Station (Connaught Place)",
    category: "police-station",
    address: "Connaught Place, New Delhi",
    phone: "+91-11-23456789",
    distance: "1.5 km",
    openStatus: "Open Now",
    rating: 4.6,
  },
  {
    id: "s2",
    name: "Swayam (Women's Rights NGO)",
    category: "ngo-women-safety",
    address: "Kolkata, West Bengal",
    phone: "+91-33-24648484",
    distance: "3.2 km",
    openStatus: "Open Now",
    rating: 4.9,
  },
  {
    id: "s3",
    name: "Fortis Hospital (Bengaluru)",
    category: "hospital",
    address: "Bannerghatta Road, Bengaluru",
    phone: "+91-80-66214444",
    distance: "5.0 km",
    openStatus: "Open Now",
    rating: 4.7,
  },
  {
    id: "s4",
    name: "Mumbai Police Station (Colaba)",
    category: "police-station",
    address: "Colaba, Mumbai",
    phone: "+91-22-22852222",
    distance: "0.8 km",
    openStatus: "Open Now",
    rating: 4.5,
  },
  {
    id: "s5",
    name: "Sneha (Suicide Prevention & Crisis Support)",
    category: "crisis-helpline",
    address: "Chennai, Tamil Nadu",
    phone: "+91-44-24640050",
    distance: "2.1 km",
    openStatus: "Open Now",
    rating: 4.8,
  },
  {
    id: "s6",
    name: "Saheli (Women's Legal Aid Cell)",
    category: "legal-aid",
    address: "New Delhi, Delhi",
    phone: "+91-11-23389111",
    distance: "4.0 km",
    openStatus: "Open Now",
    rating: 4.7,
  },
  {
    id: "s7",
    name: "Apollo Hospital (Hyderabad)",
    category: "hospital",
    address: "Jubilee Hills, Hyderabad",
    phone: "+91-40-23607777",
    distance: "6.5 km",
    openStatus: "Open Now",
    rating: 4.6,
  },
  {
    id: "s8",
    name: "Women's Shelter (Pune)",
    category: "shelter",
    address: "Shivajinagar, Pune",
    phone: "+91-20-25533333",
    distance: "1.9 km",
    openStatus: "Open Now",
    rating: 4.9,
  },
  {
    id: "s9",
    name: "Bengaluru Police Station (Indiranagar)",
    category: "police-station",
    address: "Indiranagar, Bengaluru",
    phone: "+91-80-22942222",
    distance: "2.8 km",
    openStatus: "Open Now",
    rating: 4.4,
  },
  {
    id: "s10",
    name: "Majlis Legal Centre (Mumbai)",
    category: "ngo-women-safety",
    address: "Bandra, Mumbai",
    phone: "+91-22-26408261",
    distance: "3.5 km",
    openStatus: "Open Now",
    rating: 4.9,
  },
]

export default function EmergencyServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || service.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: Service["category"]) => {
    switch (category) {
      case "police-station":
        return "bg-electric-blue/20 text-electric-blue border-electric-blue"
      case "ngo-women-safety":
        return "bg-vibrant-green/20 text-vibrant-green border-vibrant-green"
      case "hospital":
        return "bg-accent-yellow/20 text-accent-yellow border-accent-yellow"
      case "crisis-helpline":
        return "bg-destructive/20 text-destructive border-destructive"
      case "legal-aid":
        return "bg-accent-purple/20 text-accent-purple border-accent-purple"
      case "shelter":
        return "bg-cyan-500/20 text-cyan-500 border-cyan-500"
      default:
        return "bg-muted/20 text-muted-foreground border-muted"
    }
  }

  const getCategoryIcon = (category: Service["category"]) => {
    switch (category) {
      case "police-station":
        return <Building2 className="h-4 w-4" />
      case "ngo-women-safety":
        return <HeartHandshake className="h-4 w-4" />
      case "hospital":
        return <Hospital className="h-4 w-4" />
      case "crisis-helpline":
        return <AlertTriangle className="h-4 w-4" />
      case "legal-aid":
        return <Users className="h-4 w-4" /> // Using Users for legal aid
      case "shelter":
        return <MapPin className="h-4 w-4" /> // Using MapPin for shelter
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex-1">
      <h1 className="text-4xl font-bold text-electric-blue mb-8">Emergency Services Directory</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 grid gap-8">
          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-electric-blue/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-6 w-6 text-electric-blue" /> Quick Emergency Numbers (India)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {mockEmergencyNumbers.map((num) => (
                <div key={num.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{num.name}</p>
                    <p className="text-sm text-muted-foreground">{num.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 bg-transparent"
                  >
                    Call {num.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-vibrant-green/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-6 w-6 text-vibrant-green" /> Service Locations (Placeholder)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center bg-muted/10 rounded-md border border-dark-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant-green/5 to-accent-purple/5 opacity-20 animate-pulse" />
              <p className="text-muted-foreground text-lg z-10">Map view coming soon...</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-accent-yellow/30">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Search className="h-6 w-6 text-accent-yellow" /> Nearby Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search by name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 bg-background border-dark-border focus:ring-accent-yellow"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Select onValueChange={setFilterCategory} defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px] bg-background border-dark-border focus:ring-accent-yellow">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-border">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="police-station">Police Stations</SelectItem>
                    <SelectItem value="ngo-women-safety">NGOs (Women Safety)</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                    <SelectItem value="crisis-helpline">Crisis Helplines</SelectItem>
                    <SelectItem value="legal-aid">Legal Aid</SelectItem>
                    <SelectItem value="shelter">Shelters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {filteredServices.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No services found matching your criteria.</p>
                ) : (
                  filteredServices.map((service) => (
                    <Card key={service.id} className="bg-background border-dark-border card-hover-effect">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{service.name}</h3>
                          <Badge className={cn("text-xs flex items-center gap-1", getCategoryColor(service.category))}>
                            {getCategoryIcon(service.category)}
                            {service.category
                              .replace("-", " ")
                              .split(" ")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-1">
                          <MapPin className="h-4 w-4 flex-shrink-0" /> {service.address} ({service.distance})
                        </p>
                        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
                          <Clock className="h-4 w-4 flex-shrink-0" /> {service.openStatus}
                          <span className="ml-auto flex items-center gap-1 text-accent-yellow">
                            <Star className="h-4 w-4 fill-accent-yellow" /> {service.rating.toFixed(1)}
                          </span>
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 bg-transparent"
                          >
                            <Phone className="h-4 w-4 mr-1" /> Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-vibrant-green text-vibrant-green hover:bg-vibrant-green/10 bg-transparent"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> Get Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
