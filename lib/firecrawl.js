import FirecrawlApp from "@mendable/firecrawl-js";

let firecrawl = null;

function getFirecrawl() {
  if (!firecrawl) {
    firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY || "dummy_key_for_build",
    });
  }
  return firecrawl;
}

export async function scrapeProduct(url) {
  try {
    const client = getFirecrawl();
    const result = await client.scrapeUrl(url, {
      formats: ["extract"],
      extract: {
        prompt:
          "Extract the product name as 'productName', current price as 'currentPrice' (include only the numeric value and decimal points, e.g. '1299.99', without commas or currency symbols), currency code (USD, EUR, INR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
        schema: {
          type: "object",
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "string" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
        },
      },
    });

    // Firecrawl returns data in result.extract
    const extractedData = result.extract;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
