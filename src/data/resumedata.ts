export const site = {
  name: "Dhawal Panchal",
  email: "panchaldhawal128@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhawalpanchalcloud/",
  github: "https://github.com/dhawalpanchal1997",
  resumeUrl: "https://drive.google.com/file/d/1HS6EfCswNnT9Ux05Qv2zswYtM_2bRmcY/view?usp=sharing",
  location: "Dallas, TX • Open to Relocate",
}

export const hero = {
  subheadline:
    "I design agentic workflows, scalable APIs, and full-stack platforms that ship reliably—focused on latency, quality, and real-world impact.",
}

export const starScenarios = [
  {
    id: "01",
    employer: "Kaya Global",
    year: "2025",
    title: "Parallelized GenAI Test Generation",
    situation:
      "A user-story-to-test-case workflow needed 15–20 minutes to generate 30–40 test cases with only 30–40% coverage, while each LLM call consumed about 8K tokens.",
    task:
      "Improve coverage, speed, and cost efficiency without losing traceability.",
    action:
      "I redesigned the flow into smaller stages, generated role-based acceptance criteria in one pass, and used an async fan-out/fan-in pattern so scenarios produced test cases in parallel instead of sequentially.",
    result:
      "Turnaround dropped to 1–2 minutes, coverage rose to 85–90%, and token usage fell from about 8K to 2K per call.",
    impact: "85–90% coverage",
  },
  {
    id: "02",
    employer: "Accenture",
    year: "2019–2022",
    title: "Scaled Zephyr Ingestion Across Millions of Records",
    situation:
      "The Zephyr integration had to synchronize deeply hierarchical data from 5–10 REST and ZQL endpoints across 15+ projects over a six-month window.",
    task:
      "Build an ingestion layer that could handle 1–2 million records without throttling APIs or slowing downstream reporting.",
    action:
      "I built an asynchronous ingestion framework with aiohttp and asyncio, added batched concurrent fetching, reused shared HTTP sessions, and leaned on high-volume ZQL queries to reduce unnecessary endpoint calls.",
    result:
      "The integration synchronized 1–2 million records reliably, reduced fetch latency, lowered API overhead, and created a stable base for analytics and traceability at scale.",
    impact: "1–2M records synced",
  },
  {
    id: "03",
    employer: "Accenture",
    year: "2019–2022",
    title: "Improved Test Data Integrity Across Zephyr and Jira",
    situation:
      "Zephyr and Jira payloads arrived with 50+ nested structures and inconsistent fields, making synchronized test data noisy and hard to trust for reporting.",
    task:
      "Ensure the integration produced clean, meaningful data for downstream analytics and lifecycle tracking.",
    action:
      "I analyzed both payloads, filtered low-value attributes, mapped the fields that mattered for integrity and linkage, and built in-app analytics to expose sync quality, coverage, and traceability gaps.",
    result:
      "The integration became a practical TDLC enabler for 50+ testing teams, improving traceability and giving teams cleaner data for decisions and reporting.",
    impact: "50+ teams supported",
  },
  {
    id: "04",
    employer: "Kaya Global",
    year: "2025",
    title: "Drove Adoption of GenAI Automation Workflows",
    situation:
      "Automation testers were hesitant to adopt the GenAI platform because their release process depended on established NIST and Dyna BDD workflows and multiple intermediate artifacts.",
    task:
      "Win stakeholder trust without disrupting delivery timelines or forcing teams to abandon the tools and outputs they depended on.",
    action:
      "I partnered directly with testers, captured their non-negotiable workflow needs, mirrored core NIST and Dyna BDD capabilities inside the GenAI platform, and added AI-assisted model comparison and merge support.",
    result:
      "The platform gained adoption across 50+ testers, cut manual artifact preparation by 40–50%, and improved model comparison and merge efficiency by 60%.",
    impact: "40–50% less manual effort",
  },
  {
    id: "05",
    employer: "Kaya Global",
    year: "2025",
    title: "Built RAG Pipelines for Complex Enterprise Context",
    situation:
      "AI workflows needed reliable context from large, unstructured enterprise assets including model files, code, PDFs, Word docs, spreadsheets, Jira attachments, local storage, and Git repositories.",
    task:
      "Give the LLM high-quality, grounded context so downstream generation stayed accurate and domain-aware instead of generic or hallucinatory.",
    action:
      "I created format-specific RAG and ingestion pipelines with tailored chunking, embeddings, retrieval, cleaning, categorization, and relationship preservation across linked enterprise artifacts.",
    result:
      "Output quality improved by 80–90%, and the platform became reliable enough to support large documents, multi-sheet spreadsheets, and cross-linked project data in production workflows.",
    impact: "80–90% quality lift",
  },
]

export const experience = [
  {
    role: "Senior Software Engineer – AI/ML",
    company: "Kaya Global, Inc",
    location: "Dallas, TX",
    duration: "Sep 2026 – Present",
    focus: "Agentic onboarding, hiring, and enterprise-assistant platforms",
    highlights: ["Agentic AI", "RAG + Multi-Agent", "Zoho APIs", "FastAPI + Next.js"],
    points: [
      "Engineered an Agentic Onboarding Platform using Python, FastAPI, and Next.js, automating employee provisioning and training workflows to reduce onboarding time by 40%.",
      "Designed an AI Hiring Assistant leveraging RAG and multi-agent orchestration to evaluate candidate profiles, run contextual match scoring against job specs, and accelerate shortlisting.",
      "Developed a General-Purpose Enterprise AI Assistant integrated with internal and Zoho APIs to automate daily employee workflows, including leave applications, payslip retrieval, and policy Q&A.",
      "Built a Centralized Knowledge Hub and launchpad, managing internal applications and their docs, structured onboarding training modules, and dynamic AI-powered FAQs.",
      "Integrated Zoho Timesheets API to create real-time time-tracker compliance dashboards and automated audit reporting across internal engineering teams.",
    ],
  },
  {
    role: "Software Engineer – AI/ML",
    company: "Kaya Global, Inc",
    location: "Dallas, TX",
    duration: "Feb 2025 – Sep 2026",
    focus: "Enterprise AI intelligence platform: multi-agent workflows and RAG ingestion",
    highlights: ["Supervisor–Worker Agents", "RAG Ingestion", "pgvector", "SLM Fine-Tuning"],
    points: [
      "Built an enterprise AI intelligence platform using multi-agent orchestration, RAG pipelines, LLM workflows, and AI-native backend architecture.",
      "Created an account dossier generation workflow for sales teams using Supervisor–Worker agents, routing research tasks across company overview, IT landscape, AI agenda, executive signals, and final dossier synthesis.",
      "Built RAG ingestion pipelines for PDFs, DOCX, Excel/CSV, images, JSON, Java, model files, and feature files using parsing, OCR, chunking, embeddings, metadata enrichment, and pgvector retrieval.",
      "Supported SLM fine-tuning through dataset preparation, synthetic instruction data generation, prompt-response cleanup, validation set design, and base-vs-tuned model evaluation.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Citi",
    location: "Irving, TX",
    duration: "Mar 2025 – Mar 2026",
    focus: "AI test intelligence platform for enterprise QA",
    highlights: ["LangGraph", "FastAPI", "pgvector Hybrid Search", "Async Fan-out/Fan-in"],
    points: [
      "Architected an enterprise-grade AI test intelligence platform using LLMs, LangGraph, FastAPI, pgvector, and Next.js to modernize end-to-end software testing workflows.",
      "Engineered GenAI pipelines converting Jira, Zephyr, and PRDs into structured Gherkin test cases; re-architected to async fan-out/fan-in processing, cutting generation time from 20 mins to 2 mins and boosting coverage to 90%.",
      "Built multi-format RAG pipelines (PDFs, code, sheets) using OCR, semantic chunking, and pgvector hybrid search to deliver highly contextual test scenarios.",
      "Developed async FastAPI microservices featuring CDC-based data sync, task orchestration, and real-time observability to handle high-volume Jira and Zephyr data ingestion.",
      "Specialized in multi-provider LLM routing, structured output validation, database optimization, and scalable AI-driven QA automation.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Community School of the Arts Foundation",
    location: "Dallas, TX",
    duration: "Aug 2024 – Feb 2025",
    focus: "Full-stack event, user, and payment platform for an education nonprofit",
    highlights: ["Full-Stack", "RBAC", "Payments", "API Contracts"],
    points: [
      "Built a full-stack web application for an education nonprofit, streamlining event registration, user management, and digital payment workflows.",
      "Engineered role-based authentication (RBAC) and access controls across frontend interfaces and backend APIs for admins, staff, and end users.",
      "Implemented reusable components, structured API contracts, and scalable database schemas to replace manual event operations and boost reliability.",
      "Managed end-to-end SDLC execution—from requirements and UI/API development to payment gateway integration, deployment support, and technical documentation.",
    ],
  },
  {
    role: "Application Developer",
    company: "Accenture",
    location: "Mumbai, India",
    duration: "Sep 2021 – Jul 2022",
    focus: "CRM modules and approval workflows for regulated energy and insurance clients",
    highlights: ["CRM Modules", "Approval Workflows", "Backend APIs", "Production Support"],
    points: [
      "Engineered custom CRM modules, insurance forms, and approval workflows for regulated energy and insurance sector clients.",
      "Built business logic, backend API integrations, and database layer enhancements to support policy processing and customer operations.",
      "Partnered with enterprise stakeholders to convert business requirements into technical solutions, boosting overall workflow efficiency.",
      "Provided end-to-end SDLC support across debugging, testing, release deployment, and production defect resolution.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Accenture",
    location: "Mumbai, India",
    duration: "Jul 2019 – Sep 2021",
    focus: "Core application modules, backend services, and RESTful APIs",
    highlights: ["Full SDLC", "RESTful APIs", "Stored Procedures", "Unit Testing"],
    points: [
      "Built and maintained core application modules, backend services, and user interfaces across the full software development lifecycle.",
      "Collaborated with senior engineers to write clean, tested, and maintainable code for feature enhancements and bug fixes.",
      "Developed database queries, stored procedures, and RESTful APIs to ensure reliable data flow and system stability.",
      "Participated in code reviews, daily standups, and unit testing to improve software quality and reduce production defects.",
    ],
  },
]

export const education = [
  {
    degree: "MSc Information Technology and Management",
    school: "University of Texas at Dallas",
    period: "Aug 2022 – Aug 2024",
    honors: "Scholar with High Distinction",
  },
  {
    degree: "BTech Electronics and Telecommunications",
    school: "KJ Somaiya College of Engineering, Vidyavihar",
    period: "Aug 2015 – Mar 2019",
  },
]
