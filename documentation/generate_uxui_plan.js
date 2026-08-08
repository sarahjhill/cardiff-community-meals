const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, LevelFormat, AlignmentType
} = require("docx");

const TABLE_WIDTH = 9360;

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 140 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } });
}
function p(text) {
  return new Paragraph({ children: [new TextRun({ text })], spacing: { after: 120 } });
}
function bullet(text, level = 0) {
  return new Paragraph({ text, numbering: { reference: "bullets", level }, spacing: { after: 60 } });
}
function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: opts.header ? { type: ShadingType.CLEAR, fill: "1E3A5F" } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      children: [new TextRun({ text, bold: !!opts.header, color: opts.header ? "FFFFFF" : undefined, size: 19 })],
    })],
  });
}
function phaseTable(rows) {
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: [4600, 2760, 2000],
    rows: [
      new TableRow({ children: [cell("Activities", { header: true, width: 4600 }), cell("Deliverables", { header: true, width: 2760 }), cell("Est. duration", { header: true, width: 2000 })] }),
      ...rows.map(r => new TableRow({ children: [cell(r[0], { width: 4600 }), cell(r[1], { width: 2760 }), cell(r[2], { width: 2000 })] })),
    ],
  });
}

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } } },
      ],
    }],
  },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } },
    },
    children: [
      new Paragraph({
        children: [new TextRun({ text: "Cardiff Community Meals", bold: true, size: 56, color: "1E3A5F" })],
        spacing: { after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "UX/UI Project Plan — from scratch to launch", italics: true, size: 24, color: "444444" })],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Prepared for Sarah  •  4 August 2026", size: 20, color: "888888" })],
        spacing: { after: 300 },
      }),
      p("This plan sequences the full design and delivery process for Cardiff Community Meals, from initial research through to public launch and beyond. Durations assume one small, focused team (roughly 1 designer, 1–2 developers, 1 project lead/trustee) working part-time alongside a community pilot — adjust up or down for team size. Phase 0 (the working prototype and planning documents) is already complete."),

      h1("Phase 0 — Prototype (complete)"),
      p("A working front-end prototype (HTML/CSS/JS on Bootstrap 5) and supporting planning documents already exist, covering the core flows: request/referral, donate & book, business showcase, impact tracking, and partner sign-up. This phase exists to pressure-test the concept with stakeholders before investing in full design and development."),
      bullet("Cardiff Community Meals — Platform Plan (site map, data model, tech stack, safeguarding)"),
      bullet("User Stories & Solutions"),
      bullet("Clickable prototype covering all core flows"),

      h1("Phase 1 — Discovery & Research"),
      phaseTable([
        [
          "Stakeholder interviews with potential referral partners (Age Connects Cardiff & Vale, Cardiff Council Meals on Wheels team, GP surgeries, hospital discharge coordinators). User interviews or short surveys with likely recipients, family referrers, and 3–5 local food businesses. Competitive/comparative review of existing services (Cardiff Council Meals on Wheels, Food Aid Referral, MyAid, ShareTheMeal). Accessibility needs-gathering specific to elderly and disabled users.",
          "Research findings summary; refined personas; accessibility requirements brief",
          "1.5–2 weeks",
        ],
        [
          "Define the problem statement and value proposition for each user type. Set success metrics (e.g. meals delivered/month, average time from request to first booking, business partner retention, donor repeat-donation rate).",
          "Problem statement; success metrics doc",
          "2–3 days",
        ],
      ]),

      h1("Phase 2 — Define & Strategise"),
      phaseTable([
        [
          "Finalise information architecture and full sitemap. Map end-to-end user journeys for each persona (requester, donor, business, admin), including edge cases such as a request that never gets funded, or a business that has to decline a booking.",
          "Sitemap; journey maps",
          "1 week",
        ],
        [
          "Content strategy: tone of voice, plain-language guidelines (important given the audience includes elderly and unwell users), and a decision on bilingual English/Cymraeg support for core pages.",
          "Content style guide; bilingual scope decision",
          "3–4 days",
        ],
      ]),

      h1("Phase 3 — Design"),
      phaseTable([
        [
          "Low-fidelity wireframes for the core flows: request/refer, donate & book, track help, business showcase, partner sign-up.",
          "Wireframe set (desktop + mobile)",
          "1 week",
        ],
        [
          "Design system: colour palette, type scale, spacing, and a reusable component library (buttons, form fields, status badges, progress bars, cards) — building on the navy/coral palette and Bootstrap foundation already established in the prototype.",
          "Design system / component library (e.g. in Figma)",
          "1–1.5 weeks",
        ],
        [
          "High-fidelity mockups for every key screen, desktop and mobile, including empty states, error states, and confirmation screens.",
          "High-fidelity mockups",
          "2 weeks",
        ],
        [
          "Accessibility design pass: WCAG 2.1 AA colour contrast, minimum font sizes, focus states, screen-reader labelling, and keyboard-only navigation — essential given elderly/disabled end users.",
          "Accessibility checklist applied to designs",
          "3–4 days (parallel)",
        ],
        [
          "Clickable prototype of the highest-risk flows (request submission with consent, donation and booking) for usability testing.",
          "Interactive prototype",
          "3–4 days",
        ],
      ]),

      h1("Phase 4 — Validate"),
      phaseTable([
        [
          "Usability testing with real target users — ideally recruited via a partner organisation such as Age Connects Cardiff & Vale — covering both older/disabled participants and family referrers. Separate short test with 2–3 prospective business partners on the sign-up and badge system.",
          "Usability test findings; prioritised fix list",
          "1–1.5 weeks",
        ],
        [
          "Safeguarding and legal review of the verification and consent flow with a trustee or data protection lead, checking against UK GDPR and the Data Protection Act 2018.",
          "Signed-off safeguarding flow",
          "3–5 days (parallel)",
        ],
        [
          "Iterate designs based on testing and review feedback.",
          "Revised, validated designs",
          "3–5 days",
        ],
      ]),

      h1("Phase 5 — Build"),
      phaseTable([
        [
          "Build the production front end from the validated designs and component library.",
          "Production front end",
          "2–3 weeks",
        ],
        [
          "Build backend/API and database (PostgreSQL), authentication (including phone verification for requesters), and the admin console for request review and platform oversight.",
          "Backend, database, admin console",
          "3–4 weeks",
        ],
        [
          "Integrate payments (Stripe Connect, so funds can route to business partners) and notifications (email + SMS for status updates).",
          "Payments live in test mode; notifications working",
          "1–1.5 weeks",
        ],
        [
          "Build the business partner portal (accept/decline bookings, update status, view history).",
          "Business portal",
          "1.5–2 weeks",
        ],
        [
          "QA: cross-browser and mobile testing, automated accessibility scanning (e.g. axe), and manual screen-reader testing of the request and donation flows.",
          "QA sign-off report",
          "1 week (parallel with build)",
        ],
      ]),

      h1("Phase 6 — Pilot"),
      phaseTable([
        [
          "Recruit a small pilot cohort: 2–3 Cardiff businesses and one referral partner organisation. Run a private beta limited to a small number of Cardiff postcodes, with manual admin verification of every request.",
          "Live pilot with real requests, donations, and deliveries",
          "3–4 weeks",
        ],
        [
          "Finalise legal/content pages (Terms of Service, Privacy Policy, Safeguarding Policy) and, if in scope, Welsh-language versions of core pages.",
          "Published legal pages; bilingual pages if scoped",
          "1 week (parallel)",
        ],
        [
          "Fix issues surfaced by real usage; refine copy, flows, and edge cases based on pilot feedback.",
          "Stabilised, pilot-tested product",
          "1–2 weeks",
        ],
      ]),

      h1("Phase 7 — Launch"),
      phaseTable([
        [
          "Prepare launch assets: social media content, a short explainer for local press, and a joint announcement with the pilot referral partner.",
          "Launch communications pack",
          "1 week (parallel)",
        ],
        [
          "Public launch across Cardiff. Open business partner sign-up beyond the pilot cohort. Stand up a basic support channel (email/phone) for issues.",
          "Live public platform",
          "Launch day",
        ],
      ]),

      h1("Phase 8 — Post-launch & iterate"),
      bullet("Monitor the Impact dashboard and success metrics weekly for the first month, then monthly."),
      bullet("Collect ongoing feedback from recipients, donors, and businesses (short surveys, review prompts)."),
      bullet("Run a lightweight safeguarding audit on a regular cadence (e.g. quarterly)."),
      bullet("Feed learnings into the wider roadmap — expanding to more Cardiff neighbourhoods, adding NHS/Council discharge integrations, and building out the bilingual Welsh experience, as set out in the original platform plan."),

      h1("Indicative total timeline"),
      p("Discovery through to public launch: roughly 14–18 weeks for a small team working part-time, assuming the pilot (Phase 6) runs for a full 3–4 week cycle before wider launch. This can compress significantly if the pilot is run informally alongside build, or extend if bilingual Welsh content and NHS/Council integrations are pulled into the initial launch scope rather than treated as later roadmap items."),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Cardiff-Community-Meals-UXUI-Project-Plan.docx", buf);
  console.log("written");
});
