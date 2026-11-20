# Missing Client Inputs

This document tracks items that need to be supplied or confirmed by Brandit, strictly adhering to Section 13 of the **Brandit Website Development Brief** and the client written update (2026-11-19).

In line with **Rule 1** (*Do NOT invent facts about the client's business*), elements lacking verified real values are either hidden or rendered with approved placeholders until supplied by Brandit.

---

## 1. Confirmed Not Yet Available (Client Update 2026-11-19)
- **Public Email Address** (`confirmed-not-yet-available`): Does not exist yet. Per client instruction, shown nowhere (nav, footer, contact page, final CTA line, JSON-LD, metadata). Form submissions are stored in the admin Submissions Inbox only; if `CONTACT_RECIPIENT_EMAIL` env var is configured, email notifications are routed to it.
- **Office Address** (`confirmed-not-yet-available`): None. Brandit operates as a distributed agency forged in the UAE. No physical office address or location row is displayed anywhere.

---

## 2. Section 13 Brief Requirements (Items Brandit Will Supply / Confirm)

1. **Brandit Logo Files & Brand Assets**
   - Vector / SVG and high-resolution PNG variations of the `brandit.` wordmark and symbol.

2. **Texture Sample & Final Design Reference Notes**
   - Background texture/grain reference sample to give depth to monochrome surfaces.

3. **Founder Photo & Profile URLs**
   - High-resolution founder portrait for Umar Farooq (Founder & CEO).
   - Official personal Instagram and LinkedIn URLs for the founder section.

4. **Discovery-Call Booking URL or Preferred Contact Workflow**
   - Dedicated external booking destination (e.g. Cal.com / Calendly / HubSpot link) or confirmation to route exclusively through the `/contact` form and WhatsApp hotline.

5. **Approved Client Logos**
   - Vector/SVG or clean PNG logos for the trust strip: `fäm Properties`, `DXB Interact`, `fäm Luxe`, `Louis Aesthetic`.

6. **Portfolio Media for the 10 Cards**
   - `confirmed-not-yet-available`: media for the 10 `/our-work` cards. Until supplied, cards use neutral 16:9 monochrome blocks.
   - High-resolution 16:9 images/videos and descriptive alt text for the 10 homepage/portfolio systems:
     1. fäm Properties
     2. Founder Personal Brand
     3. DXB Interact
     4. fäm Luxe
     5. Aesthetic Clinics
     6. Salons & Beauty
     7. Developers & Off-Plan
     8. Luxury Supercars
     9. Holiday Homes
     10. Personal Brands & Influencers

7. **Case-Study Copy & Approved Performance Data**
   - Verified case studies, client permissions, background, challenges, strategies, execution deliverables, and approved metrics/results. (No invented metrics or unverified client stories).

8. **Testimonial Quotes, Client Names/Titles & Company Logos**
   - Approved quotes, client names, job titles, and company logos for the 3 testimonial cards.

9. **Studio Photos, Facility Details & Exact Equipment Inventory**
   - Real photography of the studio facility, cyclorama wall, acoustic setups, and lighting grid.
   - Confirmed equipment inventory list across the 12 categories (`Camera Department`, `Lensing`, `Monitoring & Wireless Video`, `Lighting - Continuous`, `Lighting - Strobe`, `Light Shaping & Modifiers`, `Camera Support`, `Grip Department`, `Audio`, `Studio Operations`, `Power & Electrical`, `Data & Server`).

10. **Careers Vacancies, Job Descriptions & Application Workflow**
    - Active job vacancies, job descriptions, requirements, and designated application reviewer.

11. **Final Domain & Hosting Details**
    - Production domain DNS assignment, production hosting environment configuration, and SSL provisioning.
