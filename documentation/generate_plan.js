const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, convertInchesToTwip
} = require("docx");

const TABLE_WIDTH = 9360; // 6.5in usable width at 1440/in

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } });
}
function p(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: 120 } });
}
function bullet(text, level = 0) {
  return new Paragraph({
    text,
    numbering: { reference: "bullets", level },
    spacing: { after: 60 },
  });
}
function numbered(text, level = 0) {
  return new Paragraph({
    text,
    numbering: { reference: "steps", level },
    spacing: { after: 60 },
  });
}
function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: opts.header ? { type: ShadingType.CLEAR, fill: "1F4E3D" } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      children: [new TextRun({ text, bold: !!opts.header, color: opts.header ? "FFFFFF" : undefined, size: 20 })],
    })],
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 260 } } } },
        ],
      },
      {
        reference: "steps",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } },
        ],
      },
    ],
  },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } }, // A4
    },
    children: [
      new Paragraph({
        children: [new TextRun({ text: "Cardiff Community Meals", bold: true, size: 56, color: "1F4E3D" })],
        spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Platform Plan — donation-funded meals for Cardiff residents who are ill, disabled, or recently discharged from hospital", italics: true, size: 24, color: "444444" })],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Working name — rename freely.  Prepared for Sarah  •  4 August 2026", size: 20, color: "888888" })],
        spacing: { after: 400 },
      }),

      h1("1. Overview"),
      p("Cardiff Community Meals connects three groups: neighbours who need a hot meal while they recover from illness, disability, or a hospital stay; community members who want to fund or dedicate a meal; and local Cardiff food businesses who cook and deliver it. The site sits between a request/referral system, a donation platform, and a lightweight logistics tracker."),
      p("The model mirrors two things that already work in Cardiff: Cardiff Council's Meals on Wheels service (self- or family-referral, ~2,000 meals/week, welfare check included) and UK food-referral platforms such as Food Aid Referral, which manage vouchers between referrers, providers, and recipients. This project adds a public donation and business-showcase layer on top of that referral model."),

      h1("2. Who it's for"),
      h2("Recipients"),
      bullet("Elderly or disabled residents living independently in Cardiff"),
      bullet("People recently discharged from University Hospital of Wales or another Cardiff hospital"),
      bullet("Anyone in a temporary period of ill health with no one to cook for them"),
      h2("Referrers"),
      bullet("The person themselves (self-referral)"),
      bullet("Family, friends, or neighbours"),
      bullet("Social workers, GP surgeries, hospital discharge teams, community wardens"),
      h2("Donors"),
      bullet("Local residents funding a one-off or recurring meal"),
      bullet("Groups/workplaces sponsoring a week of meals for someone"),
      h2("Business partners"),
      bullet("Cardiff cafés, restaurants, and caterers who cook and/or deliver meals, in exchange for public recognition and local goodwill"),

      h1("3. User roles & permissions"),
      new Table({
        width: { size: TABLE_WIDTH, type: WidthType.DXA },
        columnWidths: [2200, 4260, 2900],
        rows: [
          new TableRow({ children: [cell("Role", { header: true, width: 2200 }), cell("Can do", { header: true, width: 4260 }), cell("Requires", { header: true, width: 2900 })] }),
          new TableRow({ children: [cell("Visitor", { width: 2200 }), cell("Browse businesses, impact stats, how-it-works", { width: 4260 }), cell("No account", { width: 2900 })] }),
          new TableRow({ children: [cell("Donor", { width: 2200 }), cell("Browse open requests, donate, book a specific meal/business, leave a message", { width: 4260 }), cell("Email + payment", { width: 2900 })] }),
          new TableRow({ children: [cell("Requester / Referrer", { width: 2200 }), cell("Submit a request, edit it, see status, add delivery notes", { width: 4260 }), cell("Verified phone/email; ID check if referring a third party", { width: 2900 })] }),
          new TableRow({ children: [cell("Business partner", { width: 2200 }), cell("Manage profile, accept/decline bookings, mark meals prepared/delivered, view fulfilment history", { width: 4260 }), cell("Approved application + valid FSA food hygiene rating", { width: 2900 })] }),
          new TableRow({ children: [cell("Admin / moderator", { width: 2200 }), cell("Verify requests, approve businesses, resolve disputes, view all data, export reports", { width: 4260 }), cell("Staff/trustee account", { width: 2900 })] }),
        ],
      }),
      new Paragraph({ text: "", spacing: { after: 200 } }),

      h1("4. Site map"),
      bullet("Home — mission, live impact snapshot, primary CTAs (Request Help / Donate a Meal / Partner With Us)"),
      bullet("Request Help — referral form (self or on behalf of someone)"),
      bullet("Donate & Book a Meal — browse verified open requests, choose amount/meal, pick or auto-match a business"),
      bullet("Our Business Partners — showcase grid: logo, cuisine, meals delivered, rating, \"Book from them\" link"),
      bullet("Impact Dashboard — meals delivered, £ raised, requests fulfilled, top partners, coverage map of Cardiff postcodes served"),
      bullet("How It Works / About — process explanation, safeguarding statement, FAQs, contact"),
      bullet("Partner Sign-Up — business application form"),
      bullet("Account areas — Requester dashboard, Donor history, Business portal, Admin console (not in the public prototype)"),

      h1("5. Core user flows"),
      h2("A. Request or referral"),
      numbered("Referrer completes the Request Help form: recipient details, situation (illness / disability / hospital discharge / other), dietary needs and allergies, delivery address and access notes, urgency, and referrer's relationship to the recipient."),
      numbered("Consent is captured for the recipient's data being shared with a business partner for delivery."),
      numbered("Admin reviews and verifies the request (see Section 6) before it becomes publicly visible — this step exists specifically to protect vulnerable people from being listed without consent or being targeted by bad actors."),
      numbered("Once approved, the request appears on the Donate & Book a Meal page as an anonymised card (first name + area only)."),
      numbered("Requester/referrer can track status: Pending review → Open for donations → Meal booked → Prepared → Delivered → Complete, and can add more requests if needs continue."),
      h2("B. Donate & book"),
      numbered("Donor browses open requests or goes straight to a favourite business."),
      numbered("Donor selects a request, chooses a meal value or a set number of meals (e.g. 1 meal, 5 meals, a week of meals), and picks a partner business (or \"let the platform match one nearby\")."),
      numbered("Donor pays online; funds are held until the meal is confirmed delivered, then released to the business."),
      numbered("Donor optionally leaves a short message of encouragement, delivered anonymously with the meal."),
      numbered("Donor receives a confirmation and, later, a delivery confirmation — closing the loop."),
      h2("C. Business fulfilment"),
      numbered("Business receives a booking notification with delivery window, address, dietary needs — no donor payment details."),
      numbered("Business accepts, cooks, and marks the meal Prepared, then Delivered (with optional photo/timestamp) or logs an issue."),
      numbered("Completed bookings add to the business's public meals-delivered count and feed the impact dashboard."),

      h1("6. Trust, safeguarding & verification"),
      p("Because recipients are, by definition, vulnerable, verification is the most important workflow on the site, not an afterthought."),
      bullet("Every request is reviewed by an admin/trustee before it goes public — no unmoderated listing of vulnerable people."),
      bullet("Third-party referrals (not self-submitted) require a callback or confirmation from the recipient, or referral from a recognised source (GP, hospital discharge team, social worker, Age Connects Cardiff & Vale) before approval."),
      bullet("Public request cards never show a full name, exact address, or contact details — only first name/initial and general area (e.g. \"Margaret, Cathays\")."),
      bullet("Business partners must hold a valid Food Standards Agency hygiene rating (verified at sign-up and re-checked periodically) and, if collecting/delivering to a private address, at least one DBS-checked point of contact."),
      bullet("Data handling follows UK GDPR and the Data Protection Act 2018; a data retention and safeguarding policy should be published on the site."),
      bullet("Wales-specific: as a public-facing Cardiff service, consider Welsh Language Standards — bilingual English/Cymraeg pages for core flows (Request Help, Donate, How It Works) are recommended, and are common practice for Cardiff-based charities."),
      bullet("A clear escalation path exists for admins if a delivery reveals a safeguarding concern (e.g. signs of neglect) — a documented referral to Cardiff Council Adult Services."),

      h1("7. Business partner programme"),
      p("Local Cardiff cafés, restaurants, and caterers apply through the Partner Sign-Up page: business details, cuisine type, food hygiene rating, delivery capability (own drivers, courier partner, or collection only), and typical capacity."),
      bullet("Approved partners get a public profile on Our Business Partners: logo, story, cuisine, meals delivered to date, and a \"Book from them\" shortcut on the donation page."),
      bullet("Recognition tiers (e.g. Bronze/Silver/Gold Community Kitchen) based on meals delivered, displayed as a badge — free marketing in exchange for discounted or in-kind meals."),
      bullet("Businesses can optionally donate meals outright (no donor payment) to build goodwill and badge status faster."),

      h1("8. Donations & meal booking"),
      p("Cardiff Council's own Meals on Wheels currently charges around £6.01 per main meal; that is a reasonable public benchmark. Suggested donation tiers:"),
      bullet("£7 — one meal"),
      bullet("£35 — five meals (a working week)"),
      bullet("£70 — two weeks of meals"),
      bullet("Custom amount, or \"cover a whole request\""),
      p("Payments should run through a UK-compliant processor (Stripe is the standard choice) with funds held in escrow-style until delivery is confirmed, protecting both donor and business."),

      h1("9. Impact dashboard"),
      p("A public page builds trust and encourages repeat donation and business sign-ups:"),
      bullet("Total meals delivered, total £ donated, number of people helped, all-time and this-month"),
      bullet("Requests currently open for donation vs fulfilled"),
      bullet("Leaderboard of top contributing businesses and top donor postcodes/areas"),
      bullet("A simple map or list of Cardiff areas served (Cathays, Riverside, Grangetown, Splott, etc.)"),

      h1("10. Data model (core entities)"),
      new Table({
        width: { size: TABLE_WIDTH, type: WidthType.DXA },
        columnWidths: [2200, 7160],
        rows: [
          new TableRow({ children: [cell("Entity", { header: true, width: 2200 }), cell("Key fields", { header: true, width: 7160 })] }),
          new TableRow({ children: [cell("User", { width: 2200 }), cell("id, name, email, phone, role (donor/requester/business/admin), verified flag", { width: 7160 })] }),
          new TableRow({ children: [cell("Request", { width: 2200 }), cell("id, recipient first name, area, situation type, dietary needs, urgency, status, referrer id, consent flag, verified_by (admin id), created_at", { width: 7160 })] }),
          new TableRow({ children: [cell("Business", { width: 2200 }), cell("id, name, cuisine, hygiene rating, delivery type, meals delivered count, badge tier, approved flag", { width: 7160 })] }),
          new TableRow({ children: [cell("Booking / Donation", { width: 2200 }), cell("id, request id, donor id, business id, meal count, amount, message, status (pending/prepared/delivered), payment id", { width: 7160 })] }),
          new TableRow({ children: [cell("Delivery log", { width: 2200 }), cell("booking id, timestamps for each status change, delivery confirmation, issue notes", { width: 7160 })] }),
        ],
      }),
      new Paragraph({ text: "", spacing: { after: 200 } }),

      h1("11. Recommended tech stack for a production build"),
      p("The attached prototype is static HTML/CSS/JS with browser-local storage standing in for a database, so it can be opened directly in a browser with no setup. For a real, publicly deployed version, recommended:"),
      bullet("Frontend: same HTML/CSS/JS approach, or React/Next.js if the team wants richer interactivity later"),
      bullet("Backend/API: Node.js (Express) or Django — either is fine for this scale"),
      bullet("Database: PostgreSQL"),
      bullet("Payments: Stripe (Connect, so funds can route to business partners)"),
      bullet("Auth: email/password + magic link, with phone verification for requesters"),
      bullet("Hosting: any UK/EU-region host to simplify GDPR data residency (e.g. EU-region on Render, Fly.io, or AWS eu-west-2 London)"),
      bullet("Notifications: email (Postmark/SendGrid) and SMS (Twilio) for delivery confirmations and admin alerts"),

      h1("12. Legal & compliance notes"),
      bullet("Register with the Fundraising Regulator if collecting public donations at scale, and consider Charity Commission registration if operating as a charity rather than a CIC/community group"),
      bullet("UK GDPR / Data Protection Act 2018 compliance for all personal and health-adjacent data (situation/illness details count as special category data — extra care required)"),
      bullet("Terms of Service and a public Safeguarding Policy, linked from every request/referral form"),
      bullet("Food handling: partner businesses must meet Food Standards Agency requirements; the platform itself does not handle food"),
      bullet("Consider Welsh Language Standards compliance for a Cardiff public-facing service"),

      h1("13. Suggested roadmap"),
      numbered("Phase 0 (now): working prototype — demonstrate the flows to stakeholders and potential partners (this deliverable)."),
      numbered("Phase 1: pilot with 2–3 Cardiff cafés/restaurants and referrals from one partner organisation (e.g. Age Connects Cardiff & Vale), manual admin verification."),
      numbered("Phase 2: real backend, Stripe payments, automated notifications, 10–15 business partners, self-serve business sign-up."),
      numbered("Phase 3: scale across Cardiff neighbourhoods, bilingual site, integrate with Cardiff Council/NHS discharge referral pathways."),

      h1("14. About the accompanying prototype"),
      p("A working front-end prototype is included alongside this document: plain HTML, CSS, and JavaScript, no build tools required. It uses the browser's local storage as a stand-in database so you can submit a request, make a donation/booking, and watch the impact dashboard and business showcase update live. It implements the flows in Section 5 for demonstration purposes; it is not connected to real payments or a real database, which is expected for Phase 0."),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Cardiff-Community-Meals-Plan.docx", buf);
  console.log("written");
});
