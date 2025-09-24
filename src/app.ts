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

// Language translations
const translations = {
  en: {
    // Navigation
    home: "Home",
    gallery: "Gallery",
    services: "Services",
    contact: "Contact",
    bookNow: "Book Now",

    // Hero Section
    tagline: "Where Beauty Meets Perfection",
    viewServices: "View Services",

    // Gallery Section
    myBeautifulWork: "My Beautiful Work",
    galleryDescription:
      "Discover my stunning nail art creations and see why my clients love my work",
    followMeOnInstagram: "Follow Me on Instagram",

    // Services Section
    myServices: "My Services",
    servicesDescription:
      "Professional nail care services tailored to your style and preferences",
    beforeAfterTransformations: "Before & After Transformations",

    // Testimonials
    whatClientsEhay: "What My Clients Say",
    testimonialText:
      "Amazing service and beautiful results! I always leave feeling pampered and confident. Highly recommend!",

    // Contact Section
    getInTouch: "Get In Touch",
    contactDescription:
      "Ready to pamper yourself? Contact me today to book your appointment",
    contactInformation: "Contact Information",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    followMe: "Follow Me",
    bookYourAppointment: "Book Your Appointment",
    firstName: "First Name",
    lastName: "Last Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    selectService: "Select a Service",
    specialRequests: "Special requests or notes",
    bookAppointment: "Book Appointment",

    // Footer
    quickLinks: "Quick Links",
    popularServices: "Popular Services",
    contactInfo: "Contact Info",
    businessHours: "Business Hours",
    callNow: "Call Now",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved",
    professionalNailSalon:
      "Professional nail salon serving Style City and surrounding areas",

    // Hours
    weekdays: "Monday - Friday: 17:00 - 19:00",
    weekend: "Saturday - Sunday: 12:00 - 20:00",

    // Services
    services: {
      classicManicure: {
        name: "Classic Manicure",
        description: "Professional nail care with polish application",
        price: "250 - 350 kr",
      },
      gelManicure: {
        name: "Gel Manicure",
        description: "Long-lasting gel polish that lasts up to 3 weeks",
        price: "450 - 550 kr",
      },
      nailArtDesign: {
        name: "Nail Art Design",
        description: "Custom nail art and decorative designs",
        price: "150 - 400 kr",
      },
      frenchManicure: {
        name: "French Manicure",
        description: "Classic French tip design",
        price: "300 - 400 kr",
      },
    },
  },
  sv: {
    // Navigation
    home: "Hem",
    gallery: "Galleri",
    services: "Tjänster",
    contact: "Kontakt",
    bookNow: "Boka Nu",

    // Hero Section
    tagline: "Där Skönhet Möter Perfektion",
    viewServices: "Visa Tjänster",

    // Gallery Section
    myBeautifulWork: "Mitt Vackra Arbete",
    galleryDescription:
      "Upptäck mina fantastiska nagelkonstverk och se varför mina kunder älskar mitt arbete",
    followMeOnInstagram: "Följ Mig på Instagram",

    // Services Section
    myServices: "Mina Tjänster",
    servicesDescription:
      "Professionella nagelvårdstjänster anpassade efter din stil och preferenser",
    beforeAfterTransformations: "Före & Efter Transformationer",

    // Testimonials
    whatClientsEhay: "Vad Mina Kunder Säger",
    testimonialText:
      "Fantastisk service och vackra resultat! Jag lämnar alltid känner mig bortskämd och självsäker. Rekommenderar starkt!",

    // Contact Section
    getInTouch: "Kom i Kontakt",
    contactDescription:
      "Redo att skämma bort dig själv? Kontakta mig idag för att boka din tid",
    contactInformation: "Kontaktinformation",
    phone: "Telefon",
    email: "E-post",
    hours: "Öppettider",
    followMe: "Följ Mig",
    bookYourAppointment: "Boka Din Tid",
    firstName: "Förnamn",
    lastName: "Efternamn",
    emailAddress: "E-postadress",
    phoneNumber: "Telefonnummer",
    selectService: "Välj en Tjänst",
    specialRequests: "Speciella önskemål eller anteckningar",
    bookAppointment: "Boka Tid",

    // Footer
    quickLinks: "Snabblänkar",
    popularServices: "Populära Tjänster",
    contactInfo: "Kontaktinfo",
    businessHours: "Öppettider",
    callNow: "Ring Nu",
    privacyPolicy: "Integritetspolicy",
    termsOfService: "Användarvillkor",
    allRightsReserved: "Alla rättigheter förbehållna",
    professionalNailSalon:
      "Professionell nagelsalong som betjänar Style City och omgivande områden",

    // Hours
    weekdays: "Måndag - Fredag: 17:00 - 19:00",
    weekend: "Lördag - Söndag: 12:00 - 20:00",

    // Services
    services: {
      classicManicure: {
        name: "Klassisk Manikyr",
        description: "Professionell nagelvård med lackapplikation",
        price: "250 - 350 kr",
      },
      gelManicure: {
        name: "Gel Manikyr",
        description: "Långvarigt gel-lack som håller upp till 3 veckor",
        price: "450 - 550 kr",
      },
      nailArtDesign: {
        name: "Nagelkonst Design",
        description: "Anpassad nagelkonst och dekorativa mönster",
        price: "150 - 400 kr",
      },
      frenchManicure: {
        name: "Fransk Manikyr",
        description: "Klassisk fransk spetsdesign",
        price: "300 - 400 kr",
      },
    },
  },
};

// Business Info (shared across routes)
const businessInfo = {
  name: "NailsByCeline",
  phone: "+46 76-709 84 88",
  email: "Nailsbyc3linee@gmail.com",
  socialMedia: {
    instagram: "@nailsbyc3linee",
    tiktok: "@nailsbyc3line",
  },
};

// Middleware to handle language
app.use((req, res, next) => {
  const lang = (req.query.lang as string) || "en";
  res.locals.lang = ["en", "sv"].includes(lang) ? lang : "en";
  res.locals.t = translations[res.locals.lang];
  res.locals.otherLang = res.locals.lang === "en" ? "sv" : "en";
  res.locals.otherLangName = res.locals.lang === "en" ? "Svenska" : "English";
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { business: businessInfo });
});

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
