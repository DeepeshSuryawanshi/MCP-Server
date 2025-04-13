import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Create an MCP server
const server = new McpServer({
  name: "Weather data Featch",
  version: "1.0.0"
});

async function getWeatherByCity(city) {
  // const response = await fetch(`
  //   http://api.weatherstack.com/current
  //   ? access_key = ${process.env.WEATHERSTACK_API_KEY}
  //   & query = ${city}`);
  // const data = await response.json();
  // console.log(data);
  if (city === "New York") {
    return { content: [{ type: "16c", text: "The weather in New York is sunny" }] }
  }
  if (city === "Mumbai") {
    return { content: [{ type: "40C", text: "The weather in Mumbai is sunny" }] }
  }
  if (city === "Delhi") {
    return { content: [{ type: "30C", text: "The weather in Delhi is sunny" }] }
  }
  if (city === "London") {
    return { content: [{ type: "20C", text: "The weather in London is sunny" }] }
  }
  else {  
    return { content: [{ type: null, error: "weather not get, Something went wrong." }] }
  }
}

server.tool("get_weather_data", {
  city: z.string().describe("The city to get the weather data for")
}, async ({ city }) => {
  return { content: [{ type: "text", text: json.string(getWeatherByCity(city)) }] }
}
)

async function main() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();