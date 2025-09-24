import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 1000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use("/css", express.static(path.join(__dirname, "../")));

// Business Info (shared across routes)
const businessInfo = {
  name: "NailsByCeline",
  tagline: "Where Beauty Meets Perfection",
  phone: "+46 76-709 84 88",
  email: "Nailsbyc3linee@gmail.com",
  hours: {
    weekdays: "Monday - Friday: 17:00 - 19:00",
    weekend: "Saturday - Sunday: 12:00 - 20:00",
  },
  services: [
    {
      name: "Classic Manicure",
      description: "Professional nail care with polish application",
      price: "250 - 350 kr",
    },
    {
      name: "Gel Manicure",
      description: "Long-lasting gel polish that lasts up to 3 weeks",
      price: "450 - 550 kr",
    },
    {
      name: "Nail Art Design",
      description: "Custom nail art and decorative designs",
      price: "150 - 400 kr",
    },
    {
      name: "French Manicure",
      description: "Classic French tip design",
      price: "300 - 400 kr",
    },
  ],
  socialMedia: {
    instagram: "@nailsbyc3linee",
    tiktok: "@nailsbyc3line",
  },
};

// Routes
app.get("/", (req, res) => {
  res.render("index", { business: businessInfo });
});

// Fixed route names to match your file names
app.get("/privacy-policy", (req, res) => {
  res.render("privacy", { business: businessInfo });
});

app.get("/terms-of-service", (req, res) => {
  res.render("terms", { business: businessInfo });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("index", { business: businessInfo });
});

app.listen(PORT, () => {
  console.log(`🚀 Nail salon website running on http://localhost:${PORT}`);
});
