export const site = {
  name: "Dhawal Panchal",
  email: "panchaldhawal128@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhawalpanchalcloud/",
  github: "https://github.com/dhawalpanchal1997",
  resumeUrl: "https://drive.google.com/file/d/1Nd-gR8JWL15bWm3REAaTbD2YREHwYuea/view?usp=sharing",
  location: "Dallas, TX • Open to Relocate",
}

export const hero = {
  headline: "AI Engineer building production-grade GenAI systems.",
  subheadline:
    "I design agentic workflows, scalable APIs, and full-stack platforms that ship reliably—focused on latency, quality, and real-world impact.",
  tags: ["GenAI", "Agentic Systems", "RAG/MCP", "Full-Stack", "Cloud"],
}

export const starScenarios = [
  {
    id: "01",
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

export const about = [
    "I’m a technologist at heart who thrives on turning complex ideas into practical solutions. My career has taken me from hands-on development to leading collaborative teams, all unified by a common thread: a desire to use technology to improve how people work and live.",
    "I’m particularly drawn to the intersection of artificial intelligence and human-centered design. Whether I’m building scalable applications or coordinating multidisciplinary projects, I focus on creating systems that are not only powerful, but intuitive and accessible. Along the way, I’ve discovered that my greatest strengths lie in communication—translating technical concepts into clear language, aligning stakeholders on a shared vision, and encouraging innovation through teamwork.",
    "Outside of coding and project planning, you’ll often find me exploring new ideas through research and community involvement. I believe continuous learning and diverse perspectives are key to staying at the forefront of an evolving industry. If you’re passionate about thoughtful technology and its potential to create positive impact.",
    ]

export const experience = [
  {
    role: "Software Engineer – GenAI",
    company: "Kaya Global, Inc",
    location: "Dallas, TX",
    duration: "Feb 2025 – Present",
    focus: "Production GenAI platforms and agentic workflow systems",
    highlights: ["Agentic AI", "RAG + MCP", "FastAPI", "GCP Cloud Run"],
    points: [
    "Architected a scalable full-stack platform using React/Next.js, Python microservices, and PostgreSQL (relational + vector).",
    "Ensured secure, enterprise-grade operations and support for concurrent workloads within the platform architecture.",
    "Developed agentic AI workflows with custom tools, RAG and MCP client–server integrations, and human-in-the-loop controls, enabling safe autonomous execution and dynamic orchestration at scale.",
    "Optimized LLM request architecture by decomposing monolithic prompts into parallel, asynchronous workflows, reducing response latency from minutes to seconds while improving output quality.",
    "Built production-grade generative AI systems that transformed product requirements into structured user stories and test cases using LangChain, CrewAI, and Pydantic, backed by high-performance vector retrieval with FAISS, Astra DB, and pgvector.",
    "Delivered ML and AI capabilities as RESTful APIs using FastAPI, containerized with Docker, and deployed on GCP Cloud Run, with automated CI/CD via Cloud Build and integrated API documentation.",
    "Engineered scalable ETL/ELT pipelines to ingest VM logs and relational data into BigQuery, accelerating data readiness for ML training and inference by 35% and enabling deployment of 2 new models."
],
  },
  {
    role: "Software Developer",
    company: "Community School of the Arts Foundation",
    location: "Remote",
    duration: "Aug 2024 – Feb 2025",
    focus: "Full-stack delivery, secure auth, and team execution",
    highlights: ["Scrum Delivery", "OAuth2 + JWT", "AWS Lambda", "Stripe"],
    points: [
    "Served as Scrum Master for cross-functional teams, facilitating sprint ceremonies and removing blockers to improve sprint velocity by ~25%, increase on-time delivery by 20%+, and enhance team predictability across releases.",
    "Architected and implemented a secure authentication and user-management framework using OAuth2 with JWT-based access control, enabling full user traceability, role-based access, and security across a across a full-stack web platform.",
    "Built event-driven AWS Lambda pipelines to process Stripe webhooks, persisting validated transactions in Amazon RDS and enabling near real-time analytics and reporting for payment operations."
],
  },
  {
    role: "Application Development Analyst",
    company: "Accenture",
    location: "Mumbai, India",
    duration: "Jul 2019 – Jul 2022",
    focus: "Enterprise integrations, analytics pipelines, and delivery operations",
    highlights: ["Jira + Zephyr", "OpenShift", "CI/CD", "Database Scaling"],
    points: [
    "Collaborated with stakeholders and senior consultants to define project scope, technical specifications, and solution designs, accelerating delivery timelines by 20% through structured planning, tracking, and execution in Jira.",
    "Designed and implemented an enterprise-wide test lifecycle analytics pipeline by integrating Jira and Zephyr via Fast API services, enabling end-to-end TDLC/SDLC visibility and improving cross-team productivity through actionable defect and workload insights adopted across multiple teams.",
    "Owned deployment and delivery workflows by managing Git/Bitbucket source control and containerized releases on Red Hat OpenShift, authoring YAML manifests to enable CI/CD pipelines, reduce deployment failures by 30%, and improve release turnaround time by 25%",
    "Designed and optimized scalable database architecture and implementing efficient connection pooling strategies to support 3× higher concurrency, improve query performance by ~35%, and enhance data reliability across enterprise applications."
],
  },
]

export const skills = {
  "Programming & Frameworks": ["Python", "React", "Next.js", "Node.js", "REST APIs", "Microservices"],
  "AI & GenAI": ["Prompt & Context Engineering", "RAG", "MCP", "Agentic Workflows", "Human-in-the-Loop"],
  "Cloud & DevOps": ["Docker", "Kubernetes", "AWS", "OpenShift", "Jenkins", "Harness", "Bitbucket Pipelines"],
  "Databases": ["PostgreSQL", "MySQL", "MS SQL Server", "AWS RDS"],
}
