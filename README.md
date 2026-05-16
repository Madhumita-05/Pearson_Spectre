<div align="center">

```
███████╗██████╗ ███████╗ ██████╗████████╗██████╗ ███████╗
██╔════╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝
███████╗██████╔╝█████╗  ██║        ██║   ██████╔╝█████╗  
╚════██║██╔═══╝ ██╔══╝  ██║        ██║   ██╔══██╗██╔══╝  
███████║██║     ███████╗╚██████╗   ██║   ██║  ██║███████╗
╚══════╝╚═╝     ╚══════╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝
```

### PEARSON SPECTRE - Autonomous AI Contract Compliance Intelligence

**ANVIL Hackathon · Problem Statement 03 · Team Glitchy Girls**

---

![Pipeline](https://img.shields.io/badge/Pipeline-6_Agents-8B5CF6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjIgMjIgMTcuNTIgMjIgMTIgMTcuNTIgMiAxMiAyWk0xMiAyMEM3LjU5IDIwIDQgMTYuNDEgNCAxMlM3LjU5IDQgMTIgNFMyMCA3LjU5IDIwIDEyIDE2LjQxIDIwIDEyIDIwWk0xMiA2QzkuNzkgNiA4IDcuNzkgOCAxMFMxMC43OSAxNCAxMyAxNFY0SDEyVjZaIi8+PC9zdmc+)
![Framework](https://img.shields.io/badge/Orchestration-LangGraph-10B981?style=for-the-badge)
![LLM](https://img.shields.io/badge/LLM-Gemini_1.5_Flash_+_Pro-F59E0B?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-FastAPI_+_asyncio-3B82F6?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Next.js_14-F9FAFB?style=for-the-badge)
![Observability](https://img.shields.io/badge/Observability-Omium_SDK-EF4444?style=for-the-badge)

</div>

---

## The Problem

> *"It's 1 AM. Your team just signed a SaaS vendor agreement before a product launch. Buried in clause 14.3: unlimited data sub-processing rights. Eighteen months later, during Series A due diligence, that clause cost three weeks of legal back-and-forth and nearly killed the round."*

This story is real. Under India's **DPDP Act 2023** — in full enforcement since 2024 — that same clause is now a statutory liability of up to ₹250 crore. The problem is structural, urgent, and unsolved at scale.

| Pain Point | What It Costs |
|---|---|
| **Manual clause-by-clause review** | 3–5 days per contract. Violations missed under volume. Legal teams burn time on mechanical work, not judgment. |
| **No live regulation monitoring** | Amendments to the DPDP Act or new RBI circulars go untracked. Contracts compliant last month may not be today. |
| **No traceable audit trail** | When regulators investigate, the organisation cannot demonstrate what was reviewed, by whom, with what knowledge, or when. |
| **Redline bottleneck** | Flagging a bad clause is half the work. Drafting a compliant replacement requires a lawyer. That loop takes weeks. |

**Spectre** is the system that closes this gap — autonomously, in under 45 seconds, without a lawyer in the loop at any stage.

---

## What Spectre Does

A contract PDF goes in. On the other side:

- ✅ Every clause classified against DPDP Act 2023, GDPR, and RBI guidelines
- ✅ Legal-grade redline rewrites for every at-risk clause
- ✅ A GitHub PR opened with the full diff as the body
- ✅ A Slack alert fired to the team channel
- ✅ The live frontend dashboard updated via SSE

**The user's only action: clicking upload.**

---

## Architecture

Spectre is built on **LangGraph** — a stateful directed acyclic graph where each node is an autonomous async Python function operating on a shared typed state object (`SpectreState`, a Python `TypedDict`). No global variables. No shared mutable state. Each agent receives exactly the state it needs and returns an updated state. The graph enforces execution order, parallelism, and retry logic structurally — not procedurally.

```
                         ┌─────────────────────────────────┐
                         │         CONTRACT PDF            │
                         │         (user upload)           │
                         └──────────────┬──────────────────┘
                                        │
                                        ▼
                         ┌─────────────────────────────────┐
                         │      AGENT 1 — INGEST           │
                         │  Validate · Store · SSE fire    │
                         └──────────────┬──────────────────┘
                                        │
                          ┌─────────────┴─────────────┐
                          │    PARALLEL FAN-OUT        │
                          ▼                            ▼
           ┌──────────────────────┐    ┌──────────────────────────┐
           │  AGENT 2A            │    │  AGENT 2B                │
           │  EXTRACTION          │    │  RESEARCH                │
           │  pdfplumber →        │    │  Load DPDP + GDPR + RBI  │
           │  ClauseManifest      │    │  + live web search       │
           └──────────┬───────────┘    └────────────┬─────────────┘
                      │                             │
                      └─────────────┬───────────────┘
                                    │  (both must resolve)
                                    ▼
                         ┌─────────────────────────────────┐
                         │    AGENT 3 — RISK CLASSIFIER    │
                         │  Gemini 1.5 Flash · XML output  │
                         │  severity · confidence · cite   │
                         └──────────────┬──────────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │  confidence < 0.72 ?       │
                          │  ┌─── YES ──┐             │
                          │  │          │             │
                          │  ▼          │             │
                          │ Enrich   loop back        │
                          │ prompt   (max 2x)         │
                          └──────────────┬────────────┘
                                         │ NO (all confident)
                                         ▼
                         ┌─────────────────────────────────┐
                         │    AGENT 5 — REDLINE            │
                         │  Gemini 1.5 Pro                 │
                         │  medium / high / violation only │
                         │  original · replacement · cite  │
                         └──────────────┬──────────────────┘
                                        │
                     ┌──────────────────┼──────────────────┐
                     │                  │                  │
                     ▼                  ▼                  ▼
           ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
           │  GitHub PR   │   │  Slack Alert │   │  SSE → UI    │
           │  redline     │   │  3-line sum  │   │  workflow    │
           │  diff body   │   │  + PR link   │   │  complete    │
           └──────────────┘   └──────────────┘   └──────────────┘
                                (all three fire concurrently)
```

---

## The Six Agents

### `01` · Ingest Agent
*Entry point — PDF validation and storage*

Validates the uploaded file, assigns a `contract_id`, persists the reference to SQLite via `aiosqlite`, and fires the first SSE event to the frontend. Independently, a `feedparser` poller runs every 30 minutes against DPDP/GDPR RSS feeds — any new regulatory update triggers automatic re-analysis of every contract in the vault without user initiation.

**Tools:** `aiosqlite` · Python file I/O · SSE event emission via `asyncio.Queue`

---

### `02` · Extraction + Research
*True parallelism — the only fan-out in the graph*

LangGraph fans into two concurrent branches at exactly this point.

**Extraction** runs `pdfplumber` and produces a typed `ClauseManifest` — structured objects carrying clause text, inferred category, page number, and section reference.

**Research** simultaneously loads the local regulation JSON corpora and issues targeted web searches for live regulatory guidance.

Both branches must resolve before the graph continues. Neither waits for the other.

**Tools:** `pdfplumber` · Custom clause splitter · Category heuristics (regex pattern library) · Local JSON corpora · `httpx` web search · `feedparser` RSS polling

---

### `03` · Risk Classifier
*Core compliance intelligence*

Receives the `ClauseManifest` and `RegulationSnapshot`. Calls **Gemini 1.5 Flash** with structured XML prompts — every output field is wrapped in semantic tags and parsed deterministically with Python's `xml.etree`. No regex. No JSON. Each clause receives:

- A severity label: `compliant` / `low` / `medium` / `high` / `violation`
- A confidence score: `0.0` → `1.0`
- A regulation citation: act, section, sub-clause

**Tools:** Gemini 1.5 Flash API · `xml.etree` XML parser · Confidence scorer

---

### `04` · Reflection Loop
*Self-correction via conditional edge*

A LangGraph conditional edge evaluates every classified clause. If `confidence < 0.72`, the graph does not discard the result or escalate to a human. It re-fetches the specific regulation section most semantically relevant to that clause — retrieved during the Research phase — enriches the classifier prompt, and re-runs classification. Maximum two retries per clause. The loop targets only the ambiguous subset, not the full manifest, keeping latency low.

**Tools:** LangGraph conditional edge · Targeted corpus retrieval · Prompt enrichment

---

### `05` · Redline Agent
*Selective legal drafting*

Only activates for clauses scored `medium`, `high`, or `violation`. Produces three outputs per flagged clause:

1. The original problematic text
2. A proposed compliant replacement drafted to match contract register
3. The full regulation citation including act, section, and sub-clause

Output is a structured diff object that feeds directly into the GitHub PR body.

**Tools:** Gemini 1.5 Pro · Structured diff builder

---

### `06` · Reporter Agent
*Concurrent external outputs*

Three `asyncio` tasks fire simultaneously — none depends on the others:

- **GitHub PR** — opens with the full redline diff as body and a severity label in the title
- **Slack webhook** — posts a three-line summary with finding counts and a PR link
- **SSE event** — marks the workflow complete on the frontend dashboard

**Tools:** `PyGithub` (PR creation + branch management) · Slack webhooks via `httpx` · SSE manager

---

## Regulation Corpus

Three JSON rule files load at startup. No network call is needed for classification — the corpora live on disk and are loaded into the LangGraph state during the Research phase.

| File | Framework | Key Rules Covered |
|---|---|---|
| `dpdp_rules.json` | DPDP Act 2023 | §4 lawful processing · §6 consent · §8 retention & data quality · §9 children's data · §11 right to access · §17 cross-border transfer |
| `gdpr_rules.json` | GDPR (EU) | Art.5 principles · Art.6 lawful basis · Art.13 transparency · Art.17 right to erasure · Art.28 processor obligations · Art.46 transfer safeguards |
| `rbi_rules.json` | RBI Guidelines | DPSS-Circular-2018 data localisation · KYC Master Direction 5-year retention · NBFC Outsourcing Guidelines 2022 |

---

## What Makes It Actually Autonomous

Most "agentic" systems are LLM calls wrapped in a for-loop — a human still decides what to run, when to run it, and what to do with the output. Spectre's autonomy is architectural.

### 1 · Self-Correcting Classification

The reflection loop is not a retry on error — it is a deliberate re-evaluation on uncertainty. When the classifier returns confidence below `0.72`, the LangGraph conditional edge re-fetches the exact regulation section most semantically relevant to that clause, enriches the classifier prompt with it, and re-runs. The system improves its own context before committing a finding. Maximum two retries. Targets only the ambiguous subset.

### 2 · Trigger-Based Re-Analysis Without User Initiation

When `feedparser` detects a new DPDP or GDPR entry in the regulation RSS feed, Spectre does not wait for a user to re-upload contracts. It automatically re-runs the full six-agent pipeline against every contract in the SQLite vault. If a clause that previously scored `compliant` now scores `violation` under the new rule version, a new GitHub PR opens and a Slack alert fires — without any human action.

### 3 · Structured Outputs Enable Programmatic Decision-Making

Spectre never parses prose from the LLM. Every output is structured XML:

```xml
<severity>violation</severity>
<confidence>0.91</confidence>
<regulation_cite>DPDP §8(3)</regulation_cite>
<clause_id>C014</clause_id>
```

Parsed by `xml.etree` in three lines of Python. The graph acts on LLM output programmatically the instant it arrives: invoke the Redline agent only if severity is `medium` or above; skip it entirely if `compliant`; open a GitHub PR only if at least one `violation` is found. No human reads the text before action is taken.

### 4 · End-to-End Side-Effect Chain

```
PDF upload
  → pdfplumber extracts every clause into a typed manifest
    → research agent loads three regulation corpora concurrently
      → classifier scores every clause, self-corrects the uncertain ones
        → redline agent drafts replacement text for every violation
          → GitHub PR opens with the full redline diff
            → Slack message fires to the team channel
              → frontend marks workflow complete via SSE
```

The user's only action: clicking upload. Every downstream decision is made by the graph.

### 5 · Dual-Layer Validation — LLM + Heuristics

The system is designed to distrust its own LLM output. The heuristics engine (`heuristics.py`) runs a pattern-matching scan against the regulation corpus independently of Gemini — **13 compiled regex patterns** covering sub-processor rights, consent language, retention clauses, cross-border transfer, automated decision-making, and audit rights.

If Gemini misses an `unlimited sub-processor` clause, the heuristic engine catches it. If the heuristic matches but confidence is low, the reflection loop re-runs the LLM with enriched context. The two layers act as mutual validation — the system cannot be silently wrong.

---

## Measured Performance

| Metric | Value |
|---|---|
| PDF → Slack alert | **< 45 seconds** on a 20-clause contract |
| Regulation update → re-analysis PR | **< 30 minutes** (feedparser polling interval) |
| Human decisions inside the pipeline | **Zero** |
| Failure modes caught automatically | Low-confidence clauses (reflection) · LLM misses (heuristics) · PDF parse errors (`SpectreAgentError` + `safe_node` wrapper) |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **AI / LLM** | Gemini 1.5 Flash + Pro | Classification (Flash) · Redline drafting (Pro) |
| **Orchestration** | LangGraph (async) | Stateful agent graph · conditional edges · parallel fan-out |
| **PDF Parsing** | pdfplumber | Text extraction → typed `ClauseManifest` |
| **Backend** | FastAPI + asyncio | REST API · SSE stream · background task management |
| **Database** | SQLite + aiosqlite | Contract store · workflow runs · audit log |
| **Frontend** | Next.js 14 + Tailwind CSS | Live dashboard · SSE listener · workflow timeline |
| **Outputs** | PyGithub · Slack webhooks | PR creation · team notifications |
| **Observability** | Omium SDK | Trace spans per agent node · latency + retry tracking |

---

## Prompt Strategy

Every LLM call uses structured XML output format. Parsed by Python's built-in `xml.etree` — zero regex, zero JSON parsing failures.

```python
# Classifier prompt (simplified)
prompt = f"""
Analyse this contract clause against the regulation rules below.

<clause>{clause_text}</clause>
<regulations>{regulation_snapshot}</regulations>

Respond ONLY in this format:
<result>
  <clause_id>{clause_id}</clause_id>
  <severity>compliant|low|medium|high|violation</severity>
  <confidence>0.00-1.00</confidence>
  <regulation_cite>Act · Section · Sub-clause</regulation_cite>
  <explanation>one sentence</explanation>
</result>
"""

# Deterministic parse — no regex, no JSON
root = ET.fromstring(response_text)
severity   = root.findtext("severity")
confidence = float(root.findtext("confidence"))
reg_cite   = root.findtext("regulation_cite")
```

The classifier can act on LLM output programmatically the instant it arrives: open a PR if severity is `violation`, skip the Redline agent if severity is `compliant`.

---

## Observability — Omium SDK

Every LangGraph node is wrapped in an Omium SDK trace span. The Omium dashboard shows the full execution tree in real time:

- Latency per agent node
- Input/output payloads
- Retry counts from the reflection loop
- Exception traces from `safe_node` wrappers

```python
# Every agent node wrapped identically
async with omium_span(trace_id, run_id, "risk_classifier", attributes={"clauses": len(clauses)}):
    result = await classify_clauses(clause_manifest, regulation_snapshot)
```

During the demo, the frontend shows the live workflow timeline via SSE. The Omium panel shows the agent internals simultaneously. Judges see both **what happened** and **why** — including which clauses triggered the reflection loop and how confidence shifted after re-evaluation.

---

## Project Structure

```
spectre/
│
├── backend/                          # FastAPI application
│   ├── main.py                       # Entry point · CORS · lifespan hooks
│   ├── app/
│   │   ├── agents/
│   │   │   ├── orchestrator.py       # LangGraph graph definition
│   │   │   ├── extraction_agent.py   # pdfplumber → ClauseManifest
│   │   │   ├── research_agent.py     # Regulation corpus + web search
│   │   │   ├── classifier_agent.py   # Gemini 1.5 Flash + XML parser
│   │   │   ├── redline_agent.py      # Gemini 1.5 Pro + diff builder
│   │   │   └── gemini_client.py      # Shared Gemini client wrapper
│   │   ├── api/routes/
│   │   │   ├── contracts.py          # Upload · list · delete
│   │   │   ├── workflows.py          # Run list · tasks · findings
│   │   │   ├── events.py             # SSE global + per-run streams
│   │   │   ├── analytics.py          # Dashboard stats · risk trends
│   │   │   ├── traces.py             # Omium trace viewer
│   │   │   ├── regulations.py        # Regulation events · manual poll
│   │   │   ├── notifications.py      # Notification log · audit trail
│   │   │   ├── auth.py               # JWT login · /me
│   │   │   └── users.py              # User management
│   │   ├── core/
│   │   │   ├── config.py             # Pydantic settings from .env
│   │   │   ├── sse.py                # SSE manager · asyncio.Queue
│   │   │   ├── omium.py              # Omium SDK span wrapper
│   │   │   └── security.py           # JWT encode/decode
│   │   ├── db/
│   │   │   ├── database.py           # aiosqlite init · schema creation
│   │   │   └── seed.py               # Demo users · sample data
│   │   └── services/
│   │       ├── auth_service.py       # get_current_user · require_roles
│   │       ├── notification_service.py # Slack webhook · GitHub PR
│   │       ├── regulation_service.py # feedparser RSS poller
│   │       └── audit_service.py      # Audit log writes
│   ├── data/regulations/
│   │   ├── dpdp_rules.json           # DPDP Act 2023 rule corpus
│   │   ├── gdpr_rules.json           # GDPR rule corpus
│   │   └── rbi_rules.json            # RBI guidelines corpus
│   └── requirements.txt
│
└── frontend/                         # Next.js 14 application
    ├── app/
    │   ├── page.tsx                  # Dashboard — live stats + activity
    │   ├── upload/page.tsx           # Contract upload + drag-drop
    │   ├── workflows/
    │   │   ├── page.tsx              # All workflow runs
    │   │   └── [id]/page.tsx         # Live run detail + SSE timeline
    │   ├── vault/page.tsx            # Contract vault + findings
    │   ├── risk/page.tsx             # Risk analysis + severity charts
    │   ├── feed/page.tsx             # Regulation feed + events
    │   ├── traces/page.tsx           # Omium trace viewer
    │   ├── settings/page.tsx         # System settings
    │   └── login/page.tsx            # JWT authentication
    ├── components/
    │   ├── sidebar.tsx               # Navigation
    │   ├── top-bar.tsx               # Page header
    │   ├── recent-workflows.tsx      # Dashboard widget — live API
    │   ├── live-activity.tsx         # Dashboard widget — SSE feed
    │   └── ui-components.tsx         # GlassCard · Badge · Button · StatCard
    └── lib/
        ├── api.ts                    # Central API client — all fetch calls
        └── auth-context.tsx          # AuthProvider · useAuth hook
```

---

## Running the System

### Prerequisites

```bash
# Python 3.11+
# Node.js 18+
# A Gemini API key (required)
```

### 1 · Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# → Set GEMINI_API_KEY (required)
# → Set GITHUB_TOKEN + GITHUB_REPO (optional, for PR creation)
# → Set SLACK_WEBHOOK_URL (optional, for Slack alerts)

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend seeds the database with demo users on first run:

| Email | Password | Role |
|---|---|---|
| `admin@spectre.ai` | `admin123` | admin |
| `legal@spectre.ai` | `legal123` | legal |

### 2 · Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the dev server
npm run dev
```

Frontend runs at **http://localhost:3000**

### 3 · Run the Full Flow

```
1. Open http://localhost:3000 and log in
2. Go to Upload Contract
3. Drop any PDF vendor agreement
4. Watch the live SSE timeline on the workflow detail page
5. When complete — check GitHub for the opened PR
6. Check Slack for the three-line summary alert
7. Check Omium dashboard for the full trace graph
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Gemini API key — used by Classifier and Redline agents |
| `SECRET_KEY` | ✅ Yes | JWT signing secret |
| `GITHUB_TOKEN` | Optional | Personal access token with `repo:write` — enables PR creation |
| `GITHUB_REPO` | Optional | `owner/repo` — target repository for compliance PRs |
| `SLACK_WEBHOOK_URL` | Optional | Incoming webhook URL — enables Slack alerts |
| `DATABASE_URL` | Auto | `sqlite+aiosqlite:///./anvil.db` (default) |
| `UPLOAD_DIR` | Auto | `./uploads` (default) |

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | JWT login |
| `GET` | `/api/auth/me` | Current user |
| `POST` | `/api/contracts/upload` | Upload PDF → triggers pipeline |
| `GET` | `/api/contracts/` | List all contracts |
| `GET` | `/api/contracts/{id}/findings` | Findings for a contract |
| `GET` | `/api/workflows/` | All workflow runs |
| `GET` | `/api/workflows/{id}/tasks` | Agent task breakdown |
| `GET` | `/api/workflows/{id}/findings` | Findings for a run |
| `GET` | `/api/events/stream` | Global SSE stream |
| `GET` | `/api/events/stream/{run_id}` | Per-run SSE stream |
| `GET` | `/api/analytics/dashboard` | Dashboard stats |
| `GET` | `/api/analytics/risk-trends` | Severity distribution |
| `GET` | `/api/analytics/activity-feed` | Recent activity events |
| `GET` | `/api/traces/` | All Omium traces |
| `GET` | `/api/traces/{trace_id}` | Spans for a trace |
| `GET` | `/api/regulations/events` | Regulation update log |
| `POST` | `/api/regulations/poll` | Manually trigger regulation poll |

Interactive docs available at **http://localhost:8000/docs**

---

<div align="center">

**SPECTRE · ANVIL Hackathon  · Problem Statement 03 · Team Glitchy Girls**

*PDF to Slack alert in under 45 seconds. Human decisions inside the pipeline: zero.*

</div>
