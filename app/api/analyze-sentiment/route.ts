import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { text } = await request.json()

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 })
  }

  try {
    // In a real application, you would call your deployed Python ML service here.
    // Replace 'https://your-deployed-ml-service.com/analyze' with your actual endpoint.
    const mlServiceResponse = await fetch("https://your-deployed-ml-service.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })

    if (!mlServiceResponse.ok) {
      const errorData = await mlServiceResponse.json()
      console.error("ML Service Error:", errorData)
      throw new Error(
        `ML service responded with status ${mlServiceResponse.status}: ${errorData.error || "Unknown error"}`,
      )
    }

    const data = await mlServiceResponse.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Failed to call ML service:", error.message)
    // Fallback or error handling if ML service is unavailable or fails
    // For this demo, we'll simulate the ML response based on keywords if the call fails
    let sentiment = "neutral"
    let severity = "low"

    const textLower = text.toLowerCase()

    if (
      textLower.includes("emergency") ||
      textLower.includes("danger") ||
      textLower.includes("attack") ||
      textLower.includes("incident") ||
      textLower.includes("harassment") ||
      textLower.includes("assault") ||
      textLower.includes("unsafe") ||
      textLower.includes("bad touch")
    ) {
      sentiment = "negative"
      severity = "high"
    } else if (
      textLower.includes("safe") ||
      textLower.includes("help") ||
      textLower.includes("support") ||
      textLower.includes("positive") ||
      textLower.includes("consent") ||
      textLower.includes("empower") ||
      textLower.includes("resource")
    ) {
      sentiment = "positive"
      severity = "low"
    } else if (textLower.includes("alert") || textLower.includes("warning")) {
      sentiment = "negative"
      severity = "medium"
    }
    return NextResponse.json(
      { sentiment, severity, warning: "ML service call failed, using fallback sentiment." },
      { status: 200 },
    )
  }
}
