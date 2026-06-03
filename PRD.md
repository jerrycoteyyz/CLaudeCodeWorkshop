# Coach Progress Tracker — Product Requirements Document

## Problem
Coaches (fitness, life, business) currently track client progress through scattered tools — spreadsheets, notes apps, DMs, and memory. There's no single place to log sessions, monitor trends, and share progress with clients. This creates missed milestones, inconsistent follow-up, and clients who feel unseen.

## Goals
- Give coaches a single place to log and review every client's progress
- Make it easy to spot trends and patterns across sessions
- Reduce admin time so coaches can focus on coaching

## Target Users
**Primary:** Independent coaches (fitness, life, business) managing 5–30 clients  
**Secondary:** Clients who want visibility into their own progress and milestones

## Scope

### In Scope
- Client roster management (add, edit, archive clients)
- Session logging (date, notes, metrics, mood/energy rating)
- Progress timeline view per client
- Milestone tracking (set goals, mark achieved)
- Simple dashboard showing recent activity across all clients
- Basic client-facing progress summary (shareable link or view)

### Out of Scope
- Payment processing or invoicing
- Video calls or messaging
- AI-generated coaching recommendations
- Mobile native app (web-first)
- Team/agency multi-coach support

## Success Criteria
- [ ] A coach can onboard a new client in under 2 minutes
- [ ] A coach can log a session in under 60 seconds
- [ ] A coach can pull up a client's full history in one click
- [ ] Clients can view their own progress without a login (shareable link)
- [ ] Zero data loss — all session logs are persisted reliably

## Risks
- **Adoption risk** — coaches already have habits (spreadsheets). Mitigation: make import easy, keep UI minimal.
- **Privacy risk** — client data is sensitive. Mitigation: access controls, no public data by default.
- **Scope creep** — coaches will ask for messaging, billing, etc. Mitigation: hard no in v1, clear roadmap.

## Open Questions
- Should clients have their own login, or is a shareable read-only link enough for v1?
- What metrics matter most across coach types (fitness vs life vs business)?
- Is offline access needed, or is always-online acceptable?
- Should session notes support rich text or plain text only?
