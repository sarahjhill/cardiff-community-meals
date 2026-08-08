const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat
} = require("docx");

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 140 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 220, after: 100 } });
}
function story(text) {
  return new Paragraph({
    children: [new TextRun({ text: "Story: ", bold: true, color: "1E3A5F" }), new TextRun({ text })],
    spacing: { before: 160, after: 40 },
  });
}
function solution(text) {
  return new Paragraph({
    children: [new TextRun({ text: "Solution: ", bold: true, color: "E5502F" }), new TextRun({ text })],
    spacing: { after: 40 },
    indent: { left: 0 },
  });
}
function personaIntro(text) {
  return new Paragraph({ children: [new TextRun({ text, italics: true, color: "444444" })], spacing: { after: 200 } });
}

const doc = new Document({
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
        children: [new TextRun({ text: "User Stories & Solutions", italics: true, size: 24, color: "444444" })],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Prepared for Sarah  •  4 August 2026", size: 20, color: "888888" })],
        spacing: { after: 300 },
      }),
      new Paragraph({
        text: "Each story below reflects a real need identified for one of the platform's five user types. Every story is paired with the specific feature — already built in the working prototype, or planned for the production build — that addresses it.",
        spacing: { after: 300 },
      }),

      // ===== REQUESTER / REFERRER =====
      h1("1. Requester / Referrer"),
      personaIntro("The person needing meals, or whoever is submitting the request on their behalf (self, family, neighbour, or professional)."),

      story("As someone recovering from illness, I want to request meal support for myself, so that I don't have to cook while I'm unwell."),
      solution("The Request Help page offers a direct self-referral option — no professional or family involvement required."),

      story("As a family member, I want to refer a relative who's just left hospital, so that they get meals without having to navigate the process themselves."),
      solution("The request form includes a \"Family member\" referrer type. Third-party referrals are flagged for admin confirmation with the recipient before publishing, protecting against unwanted or mistaken referrals."),

      story("As a referrer, I want to specify dietary needs and allergies, so the meals I arrange are safe to eat."),
      solution("A dedicated dietary needs/allergies field on the request form is passed through to whichever business prepares the meal."),

      story("As a requester, I want reassurance that my personal details won't be exposed publicly, so that I feel safe asking for help."),
      solution("Public request cards show only a first name and general area (e.g. \"Margaret, Cathays\") — never a surname or exact address. A consent checkbox is required before submission, and full address/contact details are only ever shared with the business fulfilling the booking."),

      story("As a requester or referrer, I want to track progress after submitting a request, so I know when a meal is actually coming."),
      solution("The Track Help page shows a live status pipeline — Open for donations → Fully booked → Being prepared → Delivered — for every request, with a reference ID given at submission."),

      story("As a GP, hospital discharge team, or social worker, I want a quick, trustworthy way to refer patients, so vulnerable people get support immediately after discharge."),
      solution("A \"Professional referral\" option exists on the request form today; the roadmap (Phase 3) plans direct integration with Cardiff Council and NHS discharge pathways so professionals can refer without leaving their own systems."),

      // ===== DONOR =====
      h1("2. Donor"),
      personaIntro("Community members who fund meals, one-off or ongoing."),

      story("As a community member, I want to see real people who need help nearby, so my donation feels tangible rather than abstract."),
      solution("The Donate & Book a Meal page lists anonymised, verified open requests with area, situation, dietary needs, and a live funding progress bar."),

      story("As a donor, I want to choose exactly how many meals I fund, so I can give within my own budget."),
      solution("Preset tiers (1 meal / 5 meals / 10 meals) plus a custom amount option, priced against Cardiff Council's own Meals on Wheels benchmark (~£7/meal)."),

      story("As a donor, I want to pick which local business cooks the meal, so I can support a business I already know and like."),
      solution("A business selector on the donation form lets donors choose a specific partner, or opt to \"let the platform match a nearby business.\""),

      story("As a donor, I want to send an encouraging message with my donation, so the recipient feels cared for, not just fed."),
      solution("An optional message field is delivered anonymously alongside the meal."),

      story("As a donor, I want proof that my meal actually reached someone, so I trust my money was well spent."),
      solution("Every donation is tracked from Booked → Prepared → Delivered on the Track Help page; the production build adds automated email confirmations at each stage."),

      story("As a donor, I want to see the platform's overall impact before I commit, so I feel confident it's a legitimate, effective cause."),
      solution("The public Impact dashboard shows total meals delivered, funds raised, people helped, and a business leaderboard — updated in real time."),

      // ===== BUSINESS PARTNER =====
      h1("3. Business Partner"),
      personaIntro("Cardiff cafés, restaurants, and caterers who cook and deliver the meals."),

      story("As a local café owner, I want to be publicly showcased for helping the community, so I get recognition and new customers."),
      solution("The Business Partners page gives every approved partner a public profile: cuisine, hygiene rating, delivery type, and a running meals-delivered count."),

      story("As a business, I want a simple, low-effort way to apply and get listed, so I don't need technical skill to take part."),
      solution("A short Partner Sign-Up form; in production this triggers an admin review, including verification of the business's current Food Standards Agency hygiene rating, before the profile goes live."),

      story("As a business, I want clear delivery details and dietary requirements before I start cooking, so I prepare the right meal safely."),
      solution("Booking details — dietary needs, delivery notes, timing — are captured at the point of donation; the production roadmap adds a dedicated business portal with real-time booking notifications."),

      story("As a business, I want recognition that grows with my contribution, so I'm motivated to keep taking part."),
      solution("Bronze / Silver / Gold \"Community Kitchen\" badges are awarded automatically based on cumulative meals delivered, shown on the public showcase."),

      story("As a business, I want an easy way to update a meal's status as I prepare and deliver it, so donors and admins can see progress without chasing me."),
      solution("The Track Help page includes one-tap status controls (Mark prepared / Mark delivered) in the prototype; production replaces this with a proper business-facing portal."),

      // ===== ADMIN / MODERATOR =====
      h1("4. Admin / Moderator"),
      personaIntro("The trustee or staff member responsible for safeguarding and platform oversight — the most safety-critical role on the site."),

      story("As an admin, I want to review every request before it goes public, so vulnerable people are never listed without proper consent."),
      solution("No request reaches the Donate & Book page without admin approval in the production design (the prototype auto-approves, purely to demonstrate the end-to-end flow)."),

      story("As an admin, I want to verify third-party referrals directly with the recipient, so requests can't be submitted maliciously or by mistake."),
      solution("The referral verification step (Section 6 of the platform plan) requires a confirmation call for family/neighbour referrals, or a recognised source (GP, hospital, Age Connects Cardiff & Vale) for professional referrals."),

      story("As an admin, I want a single place to see all requests, donations, and businesses, so I can manage the platform and catch problems early."),
      solution("The Track Help page provides this view today at prototype scale; the production build adds a dedicated admin console with filtering, exports, and reporting."),

      story("As an admin, I want a clear way to escalate a welfare concern spotted during a delivery, so the platform protects people beyond just feeding them."),
      solution("A documented escalation path to Cardiff Council Adult Services is described on the How It Works / Safeguarding page and is a required part of admin onboarding."),

      // ===== VISITOR =====
      h1("5. Visitor (general public)"),
      personaIntro("Anyone landing on the site who hasn't yet decided to donate, request, or partner."),

      story("As a first-time visitor, I want to understand how the platform works before committing to anything, so I trust it enough to act."),
      solution("The How It Works page lays out the three-step process, the safeguarding approach, and answers common questions before asking for any commitment."),

      story("As a visitor, I want reassurance this isn't a scam, so I feel safe entering payment or personal details."),
      solution("A transparent, real-time Impact dashboard, a public Business Partners showcase, an explicit safeguarding statement, and a direct comparison to Cardiff Council's own Meals on Wheels service all build credibility before any commitment is asked."),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Cardiff-Community-Meals-User-Stories.docx", buf);
  console.log("written");
});
