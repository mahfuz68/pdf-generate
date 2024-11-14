const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());

app.post("/generate-pdf", async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).send("HTML content is required");
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
