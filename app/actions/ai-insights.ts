"use server"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { xai } from "@ai-sdk/xai"

// Define the types for our analytics data
type AnalyticsData = {
  menuViews: number[]
  itemViews: number[]
  qrScans: number[]
  topItems: { name: string; views: number }[]
  categoryDistribution: { name: string; value: number }[]
  deviceData: { name: string; value: number }[]
}

// Define the type for our insights response
type InsightsResponse = {
  summary: string
  trends: string[]
  recommendations: string[]
}

export async function generateAnalyticsInsights(data: AnalyticsData): Promise<InsightsResponse> {
  try {
    // Prepare the prompt with the analytics data
    const prompt = `
      As an AI analytics assistant, analyze the following restaurant digital menu analytics data and provide insights:

      Menu Views: ${data.menuViews.join(", ")}
      Item Views: ${data.itemViews.join(", ")}
      QR Scans: ${data.qrScans.join(", ")}
      
      Top Items by Views:
      ${data.topItems.map((item) => `- ${item.name}: ${item.views} views`).join("\n")}
      
      Category Distribution:
      ${data.categoryDistribution.map((cat) => `- ${cat.name}: ${cat.value}%`).join("\n")}
      
      Device Distribution:
      ${data.deviceData.map((device) => `- ${device.name}: ${device.value}%`).join("\n")}
      
      Please provide:
      1. A concise summary of the overall performance
      2. Three key trends you observe in the data
      3. Three actionable recommendations to improve menu performance
      
      Format your response as JSON with the following structure:
      {
        "summary": "Overall summary here",
        "trends": ["Trend 1", "Trend 2", "Trend 3"],
        "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
      }
    `

    // Call Grok API using the AI SDK
    // const response = await xai("grok-3").chat({
    //   messages: [{ role: "user", content: prompt }],
    // })
    const response = {
      choices: [{
        message: {
          content: prompt
        }
      }]
    }

  // Parse the response
  const content = response.choices[0].message.content

  // Try to extract JSON from the response
  try {
    // Look for JSON in the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const jsonStr = jsonMatch[0]
      const insights = JSON.parse(jsonStr) as InsightsResponse
      return insights
    }
  } catch (error) {
    console.error("Error parsing JSON from Grok response:", error)
  }

  // Fallback if JSON parsing fails
  return {
    summary: "Unable to generate structured insights. Please try again later.",
    trends: ["Data analysis unavailable"],
    recommendations: ["Try refreshing the page or check back later"],
  }
} catch (error) {
  console.error("Error generating insights:", error)
  return {
    summary: "An error occurred while generating insights.",
    trends: ["Error in data analysis"],
    recommendations: ["Please try again later"],
  }
}
}
