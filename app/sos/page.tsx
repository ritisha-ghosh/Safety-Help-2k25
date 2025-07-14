"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/textarea-select"
import {
  AlertTriangle,
  MapPin,
  Loader2,
  CheckCircle,
  Phone,
  ShieldAlert,
  FireExtinguisher,
  Ambulance,
  HelpCircle,
  UserPlus,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

const mockEmergencyContacts = [
  { id: 1, name: "John Doe", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", phone: "098-765-4321" },
]

const safetyTips = [
  "Stay calm and follow instructions.",
  "Do not attempt to move seriously injured individuals.",
  "Use your phone to call emergency services.",
  "If possible, provide details about the emergency.",
]

const SOSPage = () => {
  const [user] = useState(true) // Mock user state for demonstration purposes
  const [emergencyType, setEmergencyType] = useState<string>("")
  const [additionalMessage, setAdditionalMessage] = useState("")
  const [isActivating, setIsActivating] = useState(false)
  const [activationSuccess, setActivationSuccess] = useState(false)

  const handleActivateSOS = async () => {
    if (!emergencyType) {
      alert("Please select an emergency type.")
      return
    }

    setIsActivating(true)
    setActivationSuccess(false)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsActivating(false)
    setActivationSuccess(true)
    console.log("SOS Activated!", { emergencyType, additionalMessage })
    // In a real app, you'd send this data to a backend for alert dispatch
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold text-electric-blue mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Please{" "}
          <Link href="/login" className="text-electric-blue hover:underline">
            login
          </Link>{" "}
          to access Emergency SOS.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex-1">
      <h1 className="text-4xl font-bold text-electric-blue mb-8">Emergency SOS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid gap-8">
          <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-destructive/30">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" /> Activate Emergency Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="emergency-type">Emergency Type</Label>
                <Select onValueChange={setEmergencyType} value={emergencyType}>
                  <SelectTrigger className="bg-background border-dark-border focus:ring-destructive">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-border">
                    <SelectItem value="medical">Medical Emergency</SelectItem>
                    <SelectItem value="fire">Fire Emergency</SelectItem>
                    <SelectItem value="crime">Crime/Assault</SelectItem>
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="natural">Natural Disaster</SelectItem>
                    <SelectItem value="general">General Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="additional-message">Additional Message (Optional)</Label>
                <Textarea
                  id="additional-message"
                  placeholder="Provide more details about the emergency..."
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  rows={3}
                  className="bg-background border-dark-border focus:ring-destructive"
                />
              </div>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-vibrant-green" /> Your Current Location
                </Label>
                <p className="text-muted-foreground text-sm">
                  Mock Location: 123 Safety St, Anytown, USA (Accuracy: 5m)
                </p>
              </div>
              <Button
                onClick={handleActivateSOS}
                disabled={isActivating || activationSuccess}
                className={`w-full py-3 text-lg font-bold shadow-glow-md ${
                  isActivating
                    ? "bg-destructive/50 cursor-not-allowed"
                    : activationSuccess
                      ? "bg-vibrant-green/80 cursor-not-allowed"
                      : "bg-destructive hover:bg-destructive/80 shadow-destructive/50"
                }`}
              >
                {isActivating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Activating SOS...
                  </>
                ) : activationSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> SOS Activated!
                  </>
                ) : (
                  "ACTIVATE SOS"
                )}
              </Button>
              {activationSuccess && (
                <p className="text-vibrant-green text-center text-sm">
                  Emergency alert sent successfully. Help is on the way.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-electric-blue/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-6 w-6 text-electric-blue" /> Quick Dial Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 bg-background border-electric-blue text-electric-blue hover:bg-electric-blue/10"
              >
                <ShieldAlert className="h-6 w-6 mb-1" />
                <span className="text-sm">Police</span>
                <span className="text-xs text-muted-foreground">911</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 bg-background border-destructive text-destructive hover:bg-destructive/10"
              >
                <FireExtinguisher className="h-6 w-6 mb-1" />
                <span className="text-sm">Fire</span>
                <span className="text-xs text-muted-foreground">911</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 bg-background border-vibrant-green text-vibrant-green hover:bg-vibrant-green/10"
              >
                <Ambulance className="h-6 w-6 mb-1" />
                <span className="text-sm">Ambulance</span>
                <span className="text-xs text-muted-foreground">911</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto py-4 bg-background border-accent-purple text-accent-purple hover:bg-accent-purple/10"
              >
                <HelpCircle className="h-6 w-6 mb-1" />
                <span className="text-sm">Helpline</span>
                <span className="text-xs text-muted-foreground">112</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8">
          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-vibrant-green/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-vibrant-green" /> Personal Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {mockEmergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-vibrant-green text-vibrant-green hover:bg-vibrant-green/10 bg-transparent"
                  >
                    Call
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-electric-blue hover:bg-electric-blue/10">
                Add New Contact
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-accent-purple/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent-purple" /> Essential Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                {safetyTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SOSPage
