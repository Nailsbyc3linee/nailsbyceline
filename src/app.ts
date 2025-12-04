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

// Serve static files with proper headers
app.use(
  express.static(path.join(__dirname, "../public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
      // Cache static assets for 1 year
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

app.use("/css", express.static(path.join(__dirname, "../")));

// Enhanced Business Info with SEO data
const businessInfo = {
  name: "NailsByCeline",
  tagline: "Where Beauty Meets Perfection",
  phone: "+46 76-709 84 88",
  email: "Nailsbyc3linee@gmail.com",

  // SEO-specific data
  seo: {
    title: "Professional Nail Salon in Växjö - NailsByCeline",
    description:
      "Expert nail care services in Växjö, Sweden. Specializing in gel manicures, nail art, French manicures, and acrylic extensions. Book your appointment today!",
    keywords:
      "nail salon Växjö, manicure Växjö, pedicure, gel nails, nail art, French manicure, acrylic extensions, professional nail care Sweden",
    canonicalUrl: "https://nailsbyceline.se",
    image: "https://nailsbyceline.se/images/og-image.jpg",
  },

  location: {
    city: "Växjö",
    region: "Kronoberg",
    country: "Sweden",
    postalCode: "352 46",
    address: "Professional Nail Studio, Växjö, Sweden",
  },

  hours: {
    weekdays: "Monday - Friday: 17:00 - 20:00",
    weekend: "Saturday - Sunday: 13:00 - 21:00",
    structured: [
      { day: "Monday", opens: "17:00", closes: "20:00" },
      { day: "Tuesday", opens: "17:00", closes: "20:00" },
      { day: "Wednesday", opens: "17:00", closes: "20:00" },
      { day: "Thursday", opens: "17:00", closes: "20:00" },
      { day: "Friday", opens: "17:00", closes: "20:00" },
      { day: "Saturday", opens: "12:00", closes: "21:00" },
      { day: "Sunday", opens: "12:00", closes: "21:00" },
    ],
  },

  services: [
    {
      name: "Builder Gel Extension",
      description:
        "Professional nail extension using builder gel for strong, long lasting, and natural-looing nails. Includes shaping, cuticle care and filing.",
      price: "250 - 500kr",
      duration: "120-210 minutes",
      keywords: "builder gel extension, gel nails, nail extension, acrylic alternative, nail strengthening",
    },
    {
      name: "Gel Manicure",
      description:
        "Long-lasting gel polish that maintains shine for up to 3 weeks",
      price: "250 - 350 kr",
      duration: "60 minutes",
      keywords: "gel manicure Växjö, long-lasting nail polish, gel nails",
    },
    {
      name: "Nail Art Design",
      description:
        "Custom nail art and decorative designs tailored to your style",
      price: "200 - 400 kr",
      duration: "60-90 minutes",
      keywords: "nail art Växjö, custom nail designs, decorative nails",
    },
  ],

  socialMedia: {
    instagram: "@nailsbyc3linee",
    tiktok: "@@nailsbyc3line",
    instagramUrl: "https://instagram.com/nailsbyc3linee",
    tiktokUrl: "https://tiktok.com/@nailsbyc3line",
  },

  // Reviews and ratings for rich snippets
  reviews: {
    rating: 4.9,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1,
  },
};

// SEO middleware
app.use((req, res, next) => {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  next();
});

// Routes with SEO enhancements
app.get("/", (req, res) => {
  const pageData = {
    ...businessInfo,
    pageTitle: businessInfo.seo.title,
    pageDescription: businessInfo.seo.description,
    canonical: businessInfo.seo.canonicalUrl,
    ogType: "business.business",
  };
  res.render("index", { business: pageData });
});

app.get("/services", (req, res) => {
  const pageData = {
    ...businessInfo,
    pageTitle: `Nail Services in ${businessInfo.location.city} - ${businessInfo.name}`,
    pageDescription: `Comprehensive nail care services including gel manicures, nail art, and French manicures in ${businessInfo.location.city}. Professional quality guaranteed.`,
    canonical: `${businessInfo.seo.canonicalUrl}/services`,
    ogType: "website",
  };
  res.render("services", { business: pageData });
});

app.get("/gallery", (req, res) => {
  const pageData = {
    ...businessInfo,
    pageTitle: `Nail Art Gallery - ${businessInfo.name} ${businessInfo.location.city}`,
    pageDescription: `Browse our stunning nail art gallery featuring custom designs, gel manicures, and professional nail work from ${businessInfo.name}.`,
    canonical: `${businessInfo.seo.canonicalUrl}/gallery`,
    ogType: "website",
  };
  res.render("gallery", { business: pageData });
});

app.get("/privacy-policy", (req, res) => {
  const pageData = {
    ...businessInfo,
    pageTitle: `Privacy Policy - ${businessInfo.name}`,
    pageDescription: `Privacy policy for ${businessInfo.name}. Learn how we protect and handle your personal information.`,
    canonical: `${businessInfo.seo.canonicalUrl}/privacy-policy`,
    ogType: "website",
  };
  res.render("privacy-policy", { business: pageData });
});

app.get("/terms-of-service", (req, res) => {
  const pageData = {
    ...businessInfo,
    pageTitle: `Terms of Service - ${businessInfo.name}`,
    pageDescription: `Terms of service for ${businessInfo.name}. Read our service terms, booking policies, and conditions.`,
    canonical: `${businessInfo.seo.canonicalUrl}/terms-of-service`,
    ogType: "website",
  };
  res.render("terms-of-service", { business: pageData });
});

// XML Sitemap
app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${businessInfo.seo.canonicalUrl}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${businessInfo.seo.canonicalUrl}/services</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${businessInfo.seo.canonicalUrl}/gallery</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${businessInfo.seo.canonicalUrl}/privacy-policy</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${businessInfo.seo.canonicalUrl}/terms-of-service</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  res.send(sitemap);
});

// Robots.txt
app.get("/robots.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: ${businessInfo.seo.canonicalUrl}/sitemap.xml`;

  res.send(robots);
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", {
    business: businessInfo,
    pageTitle: `Page Not Found - ${businessInfo.name}`,
    pageDescription: "The page you're looking for doesn't exist.",
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 SEO-optimized nail salon website running on http://localhost:${PORT}`
  );
});
