# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> E2E Verification >> Viewport 1280x800 - Check overflow and GA4
- Location: e2e.spec.ts:13:5

# Error details

```
Error: expect(received).not.toBeNull()

Received: null
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - link "Skip to content":
      - /url: "#main-content"
    - generic: DW
    - navigation [ref=e4]:
      - generic [ref=e5]:
        - button "Danco Analytics" [ref=e6] [cursor=pointer]:
          - generic [ref=e10]:
            - text: Danco
            - generic [ref=e11]: Analytics
        - generic [ref=e12]:
          - button "Home" [ref=e13]
          - button "About" [ref=e15]
          - button "Case Studies" [ref=e16]
          - button "Services" [ref=e17]
          - button "Projects" [ref=e18]
          - button "Research" [ref=e19]
          - button "Analytics" [ref=e20]
          - button "GitHub" [ref=e21]
        - generic [ref=e22]:
          - button "Open command menu" [ref=e23]:
            - generic [ref=e24]: ⌘K
            - generic [ref=e25]: Menu
          - button "Toggle theme" [ref=e26]
          - button "Hire Us" [ref=e33]
    - main [ref=e36]:
      - generic [ref=e37]:
        - generic [ref=e38]:
          - generic [ref=e39]:
            - generic [ref=e40]: Nairobi, Kenya · Founded 2023 · Pan-African AI
            - heading "We Build Systems. for Africa's Future." [level=1] [ref=e46]: We Build Systems.▋for Africa's Future.
            - paragraph [ref=e47]: Danco Analytics helps African teams ship production ML and data products in weeks. We turn messy operational data into models, dashboards, and automated systems with measurable impact.
            - generic [ref=e48]:
              - button "See Case Studies" [ref=e49]
              - button "Start a Project" [ref=e52]
              - link "Download Resume" [ref=e56] [cursor=pointer]:
                - /url: /assets/resume/Danco-Analytics-Resume.pdf
            - generic [ref=e60]:
              - generic [ref=e61]: 8+ Projects Shipped
              - generic [ref=e63]: MSc Research — ML & AI
              - generic [ref=e67]: Hospital-Grade IT Systems
              - generic [ref=e72]: ORCID Verified Researcher
          - generic [ref=e79]:
            - generic [ref=e81]:
              - text: DEMO
              - generic [ref=e83]: ·
              - text: System Snapshot Panel
            - generic [ref=e86]: Illustrative system snapshot (sample values)
            - generic [ref=e87]:
              - generic [ref=e88]: Product Request load
              - generic [ref=e91]:
                - generic [ref=e92]:
                  - generic [ref=e93]: Model Accuracy
                  - generic [ref=e94]: 94.2%
                - generic [ref=e95]:
                  - generic [ref=e96]: Active Products
                  - generic [ref=e97]: "6"
              - generic [ref=e98]: Models running · Nairobi time 18:34
        - generic [ref=e100]:
          - generic [ref=e101]: ⌘K
          - generic [ref=e102]: Command Menu
        - generic [ref=e103]: Scroll to explore
      - generic [ref=e108]:
        - generic [ref=e109]: THE CO-OPERATIVE UNIVERSITY OF KENYA
        - generic [ref=e111]: ZETECH UNIVERSITY
        - generic [ref=e113]: MORINGA SCHOOL
        - generic [ref=e115]: AGRITECH KENYA
        - generic [ref=e117]: COUNTY HOSPITAL SECTOR
        - generic [ref=e119]: KENYA POWER LABS
        - generic [ref=e121]: THE CO-OPERATIVE UNIVERSITY OF KENYA
        - generic [ref=e123]: ZETECH UNIVERSITY
        - generic [ref=e125]: MORINGA SCHOOL
        - generic [ref=e127]: AGRITECH KENYA
        - generic [ref=e129]: COUNTY HOSPITAL SECTOR
        - generic [ref=e131]: KENYA POWER LABS
        - generic [ref=e133]: THE CO-OPERATIVE UNIVERSITY OF KENYA
        - generic [ref=e135]: ZETECH UNIVERSITY
        - generic [ref=e137]: MORINGA SCHOOL
        - generic [ref=e139]: AGRITECH KENYA
        - generic [ref=e141]: COUNTY HOSPITAL SECTOR
        - generic [ref=e143]: KENYA POWER LABS
      - generic [ref=e146]:
        - generic [ref=e147]:
          - generic [ref=e148]: The Origin Story
          - heading "From Webuye to the Frontier of African AI." [level=2] [ref=e149]
          - paragraph [ref=e150]: Every great company begins with a single, stubborn decision to build.
        - generic [ref=e151]:
          - paragraph [ref=e152]: "\"It started not with venture capital or a polished pitch deck — but with a second-hand laptop, a Safaricom data bundle, and a burning question: 'Why do African markets have to accept solutions built for someone else's problems?'\""
          - paragraph [ref=e153]: "Daniel Wanjala Machimbo grew up in Webuye, Bungoma — a vibrant town in Western Kenya where ambition and hustle are survival skills. He didn't come from a tech family. But he had something more valuable: an obsession with understanding how systems work, and an unshakeable belief that data could fix things."
        - generic [ref=e156]:
          - generic [ref=e163]:
            - generic: "2015"
            - generic [ref=e164]:
              - generic [ref=e165]: "[2015]"
              - heading "WEBUYE ACK PRIMARY" [level=3] [ref=e166]
              - paragraph [ref=e167]: Completed primary education at Webuye ACK Primary. The foundation of discipline and academic rigor took root here.
              - blockquote [ref=e168]: "\"Education wasn't just a path; it was a promise.\""
          - generic [ref=e174]:
            - generic: "2018"
            - generic [ref=e175]:
              - generic [ref=e176]: "[2018]"
              - heading "ST. ANTHONY HIGH SCHOOL, KITALE" [level=3] [ref=e177]
              - paragraph [ref=e178]: Completed secondary education, sharpening leadership, discipline, and resilience that would shape the next academic steps.
              - blockquote [ref=e179]: "\"I saw a dataset of Kenyan crop failures and thought: someone should have predicted this. I decided that someone would be me.\""
          - generic [ref=e186]:
            - generic: "2018"
            - generic [ref=e187]:
              - generic [ref=e188]: "[2018–2022]"
              - heading "ZETECH UNIVERSITY, RUIRU" [level=3] [ref=e189]
              - paragraph [ref=e190]: BSc Information Technology. Deep dive into software systems, data, and engineering fundamentals that paved the way for applied AI.
              - blockquote [ref=e191]: "\"I realized data science wasn't just a career — it was a lens.\""
          - generic [ref=e198]:
            - generic: "2023"
            - generic [ref=e199]:
              - generic [ref=e200]: "[2023]"
              - heading "MORINGA SCHOOL, NAIROBI" [level=3] [ref=e201]
              - paragraph [ref=e202]: Completed a Distinction Certificate in Data Science & Machine Learning. Production-grade projects sharpened the move from analysis to deployable models.
              - blockquote [ref=e203]: "\"Moringa didn't just teach me to code. It taught me to ship.\""
          - generic [ref=e211]:
            - generic: "2023"
            - generic [ref=e212]:
              - generic [ref=e213]: "[2023]"
              - heading "HOSPITAL SYSTEMS & THE REAL WORLD" [level=3] [ref=e214]
              - paragraph [ref=e215]: Works across Webuye County Hospital as Senior IT Consultant and Kingdom Faith-based Hospital as Machine Learning Engineer. Focus areas include patient-inflow forecasting, clinical screening, and anomaly detection. Discovers what "uptime means life" feels like.
              - blockquote [ref=e216]: "\"Healthcare data taught me that bad data systems don't just cost money. They cost lives.\""
          - generic [ref=e225]:
            - generic: "2023"
            - generic [ref=e226]:
              - generic [ref=e227]: "[2023]"
              - heading "DANCO ANALYTICS IS BORN" [level=3] [ref=e228]
              - paragraph [ref=e229]: "From a small desk in Ruiru, Daniel registers Danco Analytics. Vision: build AI-powered products for African markets that global SaaS ignores. First project: Plant Disease Detection AI (Capstone Lazarus)."
              - blockquote [ref=e230]: "\"I named the company after myself — Wanjala → Wan → Dan. Danco. It was personal. It still is.\""
          - generic [ref=e237]:
            - generic: "2024"
            - generic [ref=e238]:
              - generic [ref=e239]: "[2024]"
              - heading "THE PORTFOLIO EXPANDS" [level=3] [ref=e240]
              - paragraph [ref=e241]: "NyumbaIQ launches. PesaLens: personal finance intelligence for the M-Pesa generation. InvoiceKE, CViQ, MediShift, AgriAI Kenya — all shipping. GDP Forecast Model for Kenya published on GitHub."
          - generic [ref=e247]:
            - generic: "2024"
            - generic [ref=e248]:
              - generic [ref=e249]: "[2024–2026]"
              - heading "MSc RESEARCH & SCALE" [level=3] [ref=e250]
              - paragraph [ref=e251]: Enrolls in MSc Data Science & Machine Learning at The Co-operative University of Kenya (Sep 2024–Apr 2026). Since June 2024, works as Machine Learning Engineer at Danco Analytics, Nairobi, while advancing research on electricity theft detection under severe class imbalance.
              - blockquote [ref=e252]: "\"The mission has never been clearer.\""
      - generic [ref=e254]:
        - generic [ref=e255]:
          - generic [ref=e256]: The Founder
          - heading "Daniel Wanjala Machimbo" [level=2] [ref=e257]
          - paragraph [ref=e258]: Data Scientist · ML Researcher · Full-Stack Engineer · IT Consultant
        - generic [ref=e259]:
          - generic [ref=e261]:
            - generic [ref=e262]:
              - img "Daniel Wanjala Machimbo - Machine Learning Engineer at Danco Analytics" [ref=e264]
              - generic [ref=e265]: Available for Projects
            - generic [ref=e268]: 📍 Webuye, Bungoma · Nairobi, Kenya
            - generic [ref=e269]:
              - generic [ref=e270]: MSc Data Science & ML — The Co-operative University of Kenya (Sep 2024–Apr 2026)
              - generic [ref=e275]: BSc — Zetech University Kenya (completed Nov 2022)
              - generic [ref=e280]: Distinction Certificate, Data Science & ML — Moringa School (2023)
              - generic [ref=e285]: Machine Learning Engineer — Kingdom Faith-based Hospital (Jan 2023–present)
            - generic [ref=e290]:
              - link "GitHub profile" [ref=e291] [cursor=pointer]:
                - /url: https://github.com/MadScie254
              - link "LinkedIn profile" [ref=e295] [cursor=pointer]:
                - /url: https://www.linkedin.com/in/daniel-wanjala-machimbo-msc-912b8b17b
              - link "Portfolio" [ref=e300] [cursor=pointer]:
                - /url: https://danco-analytics.github.io/Portifolio/
            - generic [ref=e301]:
              - link "Download CV (PDF)" [ref=e302] [cursor=pointer]:
                - /url: /assets/resume/Danco-Analytics-Resume.pdf
              - link "View Photo Asset" [ref=e306] [cursor=pointer]:
                - /url: /assets/photo/profile.jpg
          - generic [ref=e307]:
            - generic [ref=e308]:
              - paragraph [ref=e309]: I'm a data scientist and engineer who grew up in Webuye, Bungoma. I founded Danco Analytics in 2023 because I was tired of watching African markets settle for SaaS products designed for San Francisco problems. I've managed IT systems for hospitals where electricity blackouts were life-threatening. I've trained ML models on datasets that barely had 500 rows. I know how to make things work with what you have.
              - paragraph [ref=e310]: "In my recent engagements, I have focused on solving complex challenges through data and engineering:"
              - list [ref=e311]:
                - listitem [ref=e312]:
                  - strong [ref=e313]: Architected a real estate SaaS platform,
                  - text: streamlining property management and increasing automated rent collection efficiency by 20%.
                - listitem [ref=e314]:
                  - strong [ref=e315]: Engineered hospital IT automation systems,
                  - text: reducing manual reporting and data processing time by 60% while maintaining critical uptime.
                - listitem [ref=e316]:
                  - strong [ref=e317]: Led a data science team
                  - text: to build an agricultural computer vision model, successfully classifying plant diseases from mobile photos with an accuracy exceeding 94%.
              - paragraph [ref=e318]: Today I research electricity theft detection at postgraduate level, ship full-stack SaaS products, and take on consulting engagements for organizations that want to turn their data into something real. I believe Africa doesn't need to wait for Silicon Valley to solve African problems.
            - generic [ref=e319]:
              - generic [ref=e320]: Skill Matrix
              - generic [ref=e324]:
                - generic [ref=e325]:
                  - generic [ref=e326]: LANGUAGES
                  - generic [ref=e327]:
                    - generic [ref=e328]: Python
                    - generic [ref=e329]: SQL
                    - generic [ref=e330]: R
                    - generic [ref=e331]: JavaScript
                    - generic [ref=e332]: TypeScript
                    - generic [ref=e333]: HTML/CSS
                - generic [ref=e334]:
                  - generic [ref=e335]: ML/AI
                  - generic [ref=e336]:
                    - generic [ref=e337]: TensorFlow
                    - generic [ref=e338]: PyTorch
                    - generic [ref=e339]: Scikit-learn
                    - generic [ref=e340]: XGBoost
                    - generic [ref=e341]: Keras
                    - generic [ref=e342]: OpenCV
                - generic [ref=e343]:
                  - generic [ref=e344]: DATA
                  - generic [ref=e345]:
                    - generic [ref=e346]: Pandas
                    - generic [ref=e347]: NumPy
                    - generic [ref=e348]: Matplotlib
                    - generic [ref=e349]: Seaborn
                    - generic [ref=e350]: Plotly
                    - generic [ref=e351]: Tableau
                - generic [ref=e352]:
                  - generic [ref=e353]: WEB
                  - generic [ref=e354]:
                    - generic [ref=e355]: React
                    - generic [ref=e356]: Django
                    - generic [ref=e357]: FastAPI
                    - generic [ref=e358]: Supabase
                    - generic [ref=e359]: PostgreSQL
                    - generic [ref=e360]: REST APIs
                - generic [ref=e361]:
                  - generic [ref=e362]: CLOUD
                  - generic [ref=e363]:
                    - generic [ref=e364]: Google Cloud
                    - generic [ref=e365]: AWS
                    - generic [ref=e366]: Docker
                    - generic [ref=e367]: Linux
                    - generic [ref=e368]: Git
                    - generic [ref=e369]: CI/CD
                - generic [ref=e370]:
                  - generic [ref=e371]: KENYAN STACK
                  - generic [ref=e372]:
                    - generic [ref=e373]: Safaricom Daraja API
                    - generic [ref=e374]: M-Pesa Integration
                    - generic [ref=e375]: KRA iTax
                    - generic [ref=e376]: KPLC data
                - generic [ref=e377]:
                  - generic [ref=e378]: TOOLS
                  - generic [ref=e379]:
                    - generic [ref=e380]: VS Code
                    - generic [ref=e381]: Jupyter
                    - generic [ref=e382]: GSAP
                    - generic [ref=e383]: Figma
                    - generic [ref=e384]: Microsoft 365
                    - generic [ref=e385]: OSINT
      - generic [ref=e387]:
        - generic [ref=e388]:
          - generic [ref=e389]:
            - generic [ref=e390]: Case Studies
            - heading "Proof of Impact." [level=2] [ref=e391]
            - paragraph [ref=e392]: Measurable outcomes across utilities, real estate, and healthcare.
          - link "Start a similar build" [ref=e393] [cursor=pointer]:
            - /url: "#contact"
        - generic [ref=e397]:
          - article [ref=e398]:
            - img "Smart Grid theft detection dashboard showing automated triage workflows" [ref=e401]
            - generic [ref=e403]:
              - generic [ref=e404]:
                - heading "Smart Grid Theft Detection" [level=3] [ref=e405]
                - generic [ref=e406]:
                  - generic [ref=e407]:
                    - heading "01. The Problem" [level=4] [ref=e408]
                    - paragraph [ref=e409]: Utility teams faced delayed non-technical loss detection and manual triage cycles that slowed response time.
                  - generic [ref=e410]:
                    - heading "02. Approach" [level=4] [ref=e411]
                    - paragraph [ref=e412]: Deployed an ensemble model with automated triage workflows to flag high-risk cases for investigation.
                  - generic [ref=e413]:
                    - heading "03. Result" [level=4] [ref=e414]
                    - paragraph [ref=e415]: Investigation cycles became faster and incident prioritization more consistent across teams.
                  - generic [ref=e416]:
                    - heading "04. Proof" [level=4] [ref=e417]
                    - paragraph [ref=e418]: "TODO: Add verified model accuracy and investigation cycle reduction."
              - generic [ref=e419]:
                - generic [ref=e420]: XGBoost
                - generic [ref=e421]: SMOTE+ENN
                - generic [ref=e422]: FastAPI
                - generic [ref=e423]: PostgreSQL
          - article [ref=e424]:
            - img "NyumbaIQ rent collection dashboard showing M-Pesa reconciliation" [ref=e427]
            - generic [ref=e429]:
              - generic [ref=e430]:
                - heading "Real Estate Automation Suite" [level=3] [ref=e431]
                - generic [ref=e432]:
                  - generic [ref=e433]:
                    - heading "01. The Problem" [level=4] [ref=e434]
                    - paragraph [ref=e435]: Property managers were operating fragmented workflows for collections, onboarding, and reporting.
                  - generic [ref=e436]:
                    - heading "02. Approach" [level=4] [ref=e437]
                    - paragraph [ref=e438]: Built a multi-tenant SaaS platform with M-Pesa integration and centralized operational dashboards.
                  - generic [ref=e439]:
                    - heading "03. Result" [level=4] [ref=e440]
                    - paragraph [ref=e441]: Teams reduced manual operational overhead and improved day-to-day visibility across portfolios.
                  - generic [ref=e442]:
                    - heading "04. Proof" [level=4] [ref=e443]
                    - paragraph [ref=e444]: "TODO: Add verified collection lift and manual reporting reduction figures."
              - generic [ref=e445]:
                - generic [ref=e446]: React
                - generic [ref=e447]: Supabase
                - generic [ref=e448]: M-Pesa
                - generic [ref=e449]: Recharts
          - article [ref=e450]:
            - img "Hospital IT automation dashboard showing compliance and reporting metrics" [ref=e453]
            - generic [ref=e455]:
              - generic [ref=e456]:
                - heading "Hospital IT Automation" [level=3] [ref=e457]
                - generic [ref=e458]:
                  - generic [ref=e459]:
                    - heading "01. The Problem" [level=4] [ref=e460]
                    - paragraph [ref=e461]: Hospital reporting, inventory, and compliance workflows were heavily manual and vulnerable to downtime.
                  - generic [ref=e462]:
                    - heading "02. Approach" [level=4] [ref=e463]
                    - paragraph [ref=e464]: Implemented automation workflows and reliability-first operations support across facility systems.
                  - generic [ref=e465]:
                    - heading "03. Result" [level=4] [ref=e466]
                    - paragraph [ref=e467]: Operations became more predictable, with reduced manual effort in critical reporting and compliance tasks.
                  - generic [ref=e468]:
                    - heading "04. Proof" [level=4] [ref=e469]
                    - paragraph [ref=e470]: "TODO: Add validated uptime and time-saved metrics from operations logs."
              - generic [ref=e471]:
                - generic [ref=e472]: Python
                - generic [ref=e473]: Power BI
                - generic [ref=e474]: Linux
                - generic [ref=e475]: CI/CD
      - generic [ref=e477]:
        - generic [ref=e478]:
          - generic [ref=e479]: Methodology
          - heading "Strategic Systems Engineering" [level=2] [ref=e480]
        - generic [ref=e481]:
          - generic [ref=e485]:
            - generic: "01"
            - heading "Data Gathering & EDA" [level=3] [ref=e490]
            - paragraph [ref=e491]: We dive deep into your raw data. Finding patterns, addressing imbalances, and cleaning noise. If the data is bad, the model is bad. We fix the data first.
          - generic [ref=e495]:
            - generic: "02"
            - heading "Model Training" [level=3] [ref=e509]
            - paragraph [ref=e510]: Selecting the right architecture—from XGBoost for tabular data to CNNs for agriculture. We prioritize robust, performant models that run efficiently on constrained infrastructure.
          - generic [ref=e514]:
            - generic: "03"
            - heading "Deployment & Integration" [level=3] [ref=e521]
            - paragraph [ref=e522]: A notebook is not a product. We wrap models in fast APIs (FastAPI/Django) and integrate them into production-ready web apps or M-Pesa capable USSD systems.
          - generic [ref=e524]:
            - generic: "04"
            - heading "Infrastructure Auditing" [level=3] [ref=e528]
            - paragraph [ref=e529]: Ensuring your environment is secure, scalable, and resilient against power outages. We set up CI/CD, backup strategies, and continuous monitoring.
      - generic [ref=e531]:
        - generic [ref=e532]:
          - generic [ref=e533]: What We Build
          - heading "Three Pillars. Infinite Applications." [level=2] [ref=e534]
          - paragraph [ref=e535]: Every engagement is shaped around your specific African market context.
        - generic [ref=e536]:
          - tablist "Service offers" [ref=e537]:
            - tab "Audit" [selected] [ref=e538]
            - tab "MVP Sprint" [ref=e539]
            - tab "Production Build" [ref=e540]
            - tab "Retainer" [ref=e541]
          - tabpanel "Audit" [ref=e542]:
            - generic [ref=e544]:
              - generic [ref=e545]:
                - heading "Audit" [level=3] [ref=e551]
                - generic [ref=e552]: Typical Scope
                - generic [ref=e553]: 1-2 weeks
                - paragraph [ref=e554]: A fixed-scope diagnostic of your data, product, and infrastructure with prioritized recommendations you can execute immediately.
              - generic [ref=e555]:
                - generic [ref=e556]:
                  - generic [ref=e557]: Deliverables
                  - list [ref=e558]:
                    - listitem [ref=e559]:
                      - generic [ref=e560]: •
                      - text: Current-state architecture review
                    - listitem [ref=e561]:
                      - generic [ref=e562]: •
                      - text: Data quality and pipeline health findings
                    - listitem [ref=e563]:
                      - generic [ref=e564]: •
                      - text: Risk and opportunity scorecard
                    - listitem [ref=e565]:
                      - generic [ref=e566]: •
                      - text: Prioritized implementation roadmap
                    - listitem [ref=e567]:
                      - generic [ref=e568]: •
                      - text: Executive readout and Q&A
                - generic [ref=e569]:
                  - generic [ref=e570]: Tech Stack
                  - generic [ref=e571]:
                    - generic [ref=e572]: Discovery
                    - generic [ref=e573]: Systems Audit
                    - generic [ref=e574]: Data QA
                    - generic [ref=e575]: Roadmapping
      - generic [ref=e577]:
        - generic [ref=e578]:
          - generic [ref=e579]: Live Demo
          - heading "Data in Motion" [level=2] [ref=e580]
          - paragraph [ref=e581]: Interactive visualizations demonstrating model outputs and dataset analysis.
        - generic [ref=e582]:
          - generic [ref=e583]:
            - button [pressed] [ref=e584]:
              - heading "Macroeconomic Forecasting" [level=3] [ref=e585]
              - paragraph [ref=e586]: Random Forest predictions for Kenya's GDP growth utilizing CBK exchange rates and historical data.
            - button [ref=e587]:
              - heading "Class Imbalance Analysis" [level=3] [ref=e588]
              - paragraph [ref=e589]: Visualizing the severe minority class distribution in the SGCC electricity theft dataset (SMOTE application).
          - generic [ref=e591]:
            - generic [ref=e592]:
              - heading "Kenya GDP Growth (%)" [level=4] [ref=e593]
              - generic [ref=e594]:
                - generic [ref=e595]: Actual
                - generic [ref=e597]: Predicted
            - application [ref=e601]:
              - generic [ref=e636]:
                - generic [ref=e637]:
                  - generic [ref=e638]: "2018"
                  - generic [ref=e640]: "2019"
                  - generic [ref=e642]: "2020"
                  - generic [ref=e644]: "2021"
                  - generic [ref=e646]: "2022"
                  - generic [ref=e648]: "2023"
                  - generic [ref=e650]: "2024"
                  - generic [ref=e652]: "2025"
                - generic [ref=e654]:
                  - generic [ref=e655]: "-3"
                  - generic [ref=e657]: "0"
                  - generic [ref=e659]: "3"
                  - generic [ref=e661]: "6"
                  - generic [ref=e663]: "9"
      - generic [ref=e666]:
        - generic [ref=e667]:
          - generic [ref=e668]: Projects Showcase
          - heading "Built for Africa. Ready to Scale." [level=2] [ref=e669]
          - paragraph [ref=e670]: A selection of production-grade projects solving real-world challenges. Click any project to view its deep-dive case study.
        - generic [ref=e671]:
          - button "NyumbaIQ View full case study NyumbaIQ Live AI-powered real estate management for Kenyan landlords & agents A full-stack SaaS platform with multi-role portals for Admins, Landlords, Agents, and Tenants. Features M-Pesa rent collection via Safaricom Daraja API, AI-powered property insights through the Anthropic API, automated lease management, and Kenya-specific compliance features. Analyze Case Study" [ref=e672] [cursor=pointer]:
            - generic [ref=e674]:
              - generic [ref=e675]: NyumbaIQ
              - generic [ref=e676]: View full case study
            - generic [ref=e677]:
              - generic [ref=e678]:
                - heading "NyumbaIQ" [level=3] [ref=e679]
                - generic [ref=e680]: Live
              - paragraph [ref=e681]: AI-powered real estate management for Kenyan landlords & agents
              - paragraph [ref=e682]: A full-stack SaaS platform with multi-role portals for Admins, Landlords, Agents, and Tenants. Features M-Pesa rent collection via Safaricom Daraja API, AI-powered property insights through the Anthropic API, automated lease management, and Kenya-specific compliance features.
              - generic [ref=e683]: Analyze Case Study
          - button "AgriAI Kenya View full case study AgriAI Kenya Beta Plant disease detection AI for Kenyan smallholder farmers A computer vision system that identifies crop diseases from smartphone photographs using deep learning. Built collaboratively as a capstone project at Moringa School, it uses CNNs trained on African agricultural disease datasets to give farmers actionable diagnostics in seconds — no agronomist required. Analyze Case Study" [ref=e688] [cursor=pointer]:
            - generic [ref=e690]:
              - generic [ref=e691]: AgriAI Kenya
              - generic [ref=e692]: View full case study
            - generic [ref=e693]:
              - generic [ref=e694]:
                - heading "AgriAI Kenya" [level=3] [ref=e695]
                - generic [ref=e696]: Beta
              - paragraph [ref=e697]: Plant disease detection AI for Kenyan smallholder farmers
              - paragraph [ref=e698]: A computer vision system that identifies crop diseases from smartphone photographs using deep learning. Built collaboratively as a capstone project at Moringa School, it uses CNNs trained on African agricultural disease datasets to give farmers actionable diagnostics in seconds — no agronomist required.
              - generic [ref=e699]: Analyze Case Study
          - button "InvestWise Predictor View full case study InvestWise Predictor Beta ML-powered investment intelligence for the Kenyan market A cutting-edge investment advisory tool that analyzes CBK exchange rates, inflation data, NSE equity performance, and macroeconomic indicators to generate predictive investment signals for Kenyan investors. Trained on 10+ years of Kenyan financial data. Analyze Case Study" [ref=e704] [cursor=pointer]:
            - generic [ref=e706]:
              - generic [ref=e707]: InvestWise Predictor
              - generic [ref=e708]: View full case study
            - generic [ref=e709]:
              - generic [ref=e710]:
                - heading "InvestWise Predictor" [level=3] [ref=e711]
                - generic [ref=e712]: Beta
              - paragraph [ref=e713]: ML-powered investment intelligence for the Kenyan market
              - paragraph [ref=e714]: A cutting-edge investment advisory tool that analyzes CBK exchange rates, inflation data, NSE equity performance, and macroeconomic indicators to generate predictive investment signals for Kenyan investors. Trained on 10+ years of Kenyan financial data.
              - generic [ref=e715]: Analyze Case Study
          - button "PesaLens View full case study PesaLens Beta Personal finance intelligence for the M-Pesa generation M-Pesa statement analysis, automatic expense categorization, spending pattern visualization, and AI-powered savings coaching — built specifically for how Kenyans actually manage money. Because Mint was never built for you. Analyze Case Study" [ref=e720] [cursor=pointer]:
            - generic [ref=e722]:
              - generic [ref=e723]: PesaLens
              - generic [ref=e724]: View full case study
            - generic [ref=e725]:
              - generic [ref=e726]:
                - heading "PesaLens" [level=3] [ref=e727]
                - generic [ref=e728]: Beta
              - paragraph [ref=e729]: Personal finance intelligence for the M-Pesa generation
              - paragraph [ref=e730]: M-Pesa statement analysis, automatic expense categorization, spending pattern visualization, and AI-powered savings coaching — built specifically for how Kenyans actually manage money. Because Mint was never built for you.
              - generic [ref=e731]: Analyze Case Study
          - button "MediShift View full case study MediShift In Dev Healthcare workforce management for Kenyan hospitals Shift scheduling, workforce analytics, and staff management platform designed for the realities of Kenyan county hospitals and private facilities — including multi-department rostering, compliance reporting, and mobile-first staff self-service. Analyze Case Study" [ref=e736] [cursor=pointer]:
            - generic [ref=e738]:
              - generic [ref=e739]: MediShift
              - generic [ref=e740]: View full case study
            - generic [ref=e741]:
              - generic [ref=e742]:
                - heading "MediShift" [level=3] [ref=e743]
                - generic [ref=e744]: In Dev
              - paragraph [ref=e745]: Healthcare workforce management for Kenyan hospitals
              - paragraph [ref=e746]: Shift scheduling, workforce analytics, and staff management platform designed for the realities of Kenyan county hospitals and private facilities — including multi-department rostering, compliance reporting, and mobile-first staff self-service.
              - generic [ref=e747]: Analyze Case Study
          - button "InvoiceKE View full case study InvoiceKE In Dev KRA-compliant invoicing for Kenyan SMEs Automated ETR receipts, VAT computation, M-Pesa payment tracking, and KRA iTax integration — everything a Kenyan SME needs to invoice, get paid, and stay tax-compliant without an accountant on speed dial. Analyze Case Study" [ref=e752] [cursor=pointer]:
            - generic [ref=e754]:
              - generic [ref=e755]: InvoiceKE
              - generic [ref=e756]: View full case study
            - generic [ref=e757]:
              - generic [ref=e758]:
                - heading "InvoiceKE" [level=3] [ref=e759]
                - generic [ref=e760]: In Dev
              - paragraph [ref=e761]: KRA-compliant invoicing for Kenyan SMEs
              - paragraph [ref=e762]: Automated ETR receipts, VAT computation, M-Pesa payment tracking, and KRA iTax integration — everything a Kenyan SME needs to invoice, get paid, and stay tax-compliant without an accountant on speed dial.
              - generic [ref=e763]: Analyze Case Study
      - generic [ref=e769]:
        - generic [ref=e770]:
          - generic [ref=e771]:
            - generic [ref=e772]: Open Source
            - heading "The Work Speaks for Itself." [level=2] [ref=e776]
            - paragraph [ref=e777]: Production ML pipelines, economic models, and AI systems — all on GitHub.
          - generic [ref=e778]:
            - link "@MadScie254" [ref=e779] [cursor=pointer]:
              - /url: https://github.com/MadScie254
            - link "@Danco-Analytics" [ref=e780] [cursor=pointer]:
              - /url: https://github.com/Danco-Analytics
        - generic [ref=e781]:
          - generic [ref=e782]:
            - link "Capstone-Lazarus" [ref=e784] [cursor=pointer]:
              - /url: https://github.com/MadScie254/Capstone-Lazarus
            - paragraph [ref=e785]: Plant disease detection system using CNNs and image processing.
            - generic [ref=e786]:
              - generic [ref=e787]: Jupyter Notebook
              - link "View" [ref=e789] [cursor=pointer]:
                - /url: https://github.com/MadScie254/Capstone-Lazarus
          - generic [ref=e793]:
            - link "Invest-wise" [ref=e795] [cursor=pointer]:
              - /url: https://github.com/MadScie254/Invest-wise
            - paragraph [ref=e796]: ML investment advisory for the Kenyan market. CBK data + NSE analysis.
            - generic [ref=e797]:
              - generic [ref=e798]: Python
              - link "View" [ref=e800] [cursor=pointer]:
                - /url: https://github.com/MadScie254/Invest-wise
          - generic [ref=e804]:
            - link "Phase-3-project-modelling" [ref=e806] [cursor=pointer]:
              - /url: https://github.com/MadScie254/Phase-3-project-modelling
            - paragraph [ref=e807]: "Kenya GDP growth prediction using Random Forest + HistGradientBoosting. Features: CBK exchange rates, inflation data, historical GDP."
            - generic [ref=e808]:
              - generic [ref=e809]: Jupyter Notebook
              - link "View" [ref=e811] [cursor=pointer]:
                - /url: https://github.com/MadScie254/Phase-3-project-modelling
          - generic [ref=e815]:
            - link "ad-click-predictor" [ref=e817] [cursor=pointer]:
              - /url: https://github.com/MadScie254/ad-click-predictor
            - paragraph [ref=e818]: "\"Life-changing project\" — ad click prediction ML pipeline."
            - generic [ref=e819]:
              - generic [ref=e820]: Jupyter Notebook
              - link "View" [ref=e822] [cursor=pointer]:
                - /url: https://github.com/MadScie254/ad-click-predictor
          - generic [ref=e826]:
            - link "gdp_forcast_sample" [ref=e828] [cursor=pointer]:
              - /url: https://github.com/MadScie254/gdp_forcast_sample
            - paragraph [ref=e829]: Kenya GDP forecast over time — economic modelling template.
            - generic [ref=e830]:
              - generic [ref=e831]: Jupyter Notebook
              - link "View" [ref=e833] [cursor=pointer]:
                - /url: https://github.com/MadScie254/gdp_forcast_sample
          - generic [ref=e837]:
            - link "Danco-Analytics/R_Presentation" [ref=e839] [cursor=pointer]:
              - /url: https://github.com/Danco-Analytics/R_Presentation
            - paragraph [ref=e840]: MSc coursework R statistical analysis & presentation. Academic research output.
            - generic [ref=e841]:
              - generic [ref=e842]: HTML
              - link "View" [ref=e844] [cursor=pointer]:
                - /url: https://github.com/Danco-Analytics/R_Presentation
        - link "Browse All Repositories on GitHub" [ref=e849] [cursor=pointer]:
          - /url: https://github.com/MadScie254
      - generic [ref=e857]:
        - generic [ref=e858]:
          - generic [ref=e859]: Writing & Speaking
          - paragraph [ref=e860]: Explore research, articles, and talks in one place.
        - button "Open Insights Hub" [ref=e861]
      - generic [ref=e863]:
        - generic [ref=e864]:
          - generic [ref=e865]: Recognition & Certifications
          - heading "Validated Excellence." [level=2] [ref=e869]
          - paragraph [ref=e870]: Building things that solve real problems gets noticed.
        - generic [ref=e871]:
          - generic [ref=e872]:
            - generic [ref=e881]: "2023"
            - heading "Best Machine Learning Project" [level=3] [ref=e882]
            - generic [ref=e883]: Zetech Innovation Fair
            - paragraph [ref=e884]: Awarded for AgriAI Kenya, demonstrating early blight detection with offline capabilities.
          - generic [ref=e885]:
            - generic [ref=e890]: "2024"
            - heading "Top 10 Innovator" [level=3] [ref=e891]
            - generic [ref=e892]: Kenya National Tech Challenge
            - paragraph [ref=e893]: Recognized for building the PesaLens transaction parser addressing local financial literacy.
          - generic [ref=e894]:
            - generic [ref=e900]: "2023"
            - heading "Certified Cloud Architect" [level=3] [ref=e901]
            - generic [ref=e902]: Google Cloud / AWS
            - paragraph [ref=e903]: Professional certification validating expertise in designing highly available infrastructure.
      - generic [ref=e904]:
        - generic [ref=e905]:
          - generic [ref=e906]: What People Say
          - heading "Trusted by organizations that can't afford to get it wrong." [level=2] [ref=e907]
        - generic [ref=e910]:
          - group "1 / 4" [ref=e911]:
            - generic [ref=e912]:
              - blockquote [ref=e924]: "\"Daniel built our entire patient records management system from scratch. It went live in 6 weeks and has been running without failure for 8 months. He understood our constraints — limited bandwidth, frequent power outages. He built for Kenya, not for Silicon Valley.\""
              - generic [ref=e928]:
                - generic [ref=e929]: Wekesa Simiyu
                - generic [ref=e930]: County Hospital, Western Kenya
          - group "2 / 4" [ref=e931]:
            - generic [ref=e932]:
              - blockquote [ref=e944]: "\"The GDP forecasting model Daniel delivered gave our research team a 12-month lead on macroeconomic trend signals. Technically excellent, and he explained the methodology so we could trust the outputs.\""
              - generic [ref=e948]:
                - generic [ref=e949]: Amina Nafula
                - generic [ref=e950]: East African Policy Institute
          - group "3 / 4" [ref=e951]:
            - generic [ref=e952]:
              - blockquote [ref=e964]: "\"Finally, a tech partner who doesn't need me to explain why M-Pesa matters. NyumbaIQ has transformed how we manage our 40-unit portfolio.\""
              - generic [ref=e968]:
                - generic [ref=e969]: Kamau Njoroge
                - generic [ref=e970]: Nairobi
          - group "4 / 4" [ref=e971]:
            - generic [ref=e972]:
              - blockquote [ref=e984]: "\"His expertise in Machine Learning is exceptional. He was able to take our messy agricultural datasets and turn them into a clear, performant computer vision model.\""
              - generic [ref=e988]:
                - generic [ref=e989]: Lead Agronomist
                - generic [ref=e990]: AgriTech NGO
      - generic [ref=e992]:
        - generic [ref=e993]:
          - generic [ref=e994]: Let's Build
          - heading "Ready to make your data work harder?" [level=2] [ref=e995]
          - paragraph [ref=e996]: Based in Nairobi. Working globally. Always building.
        - generic [ref=e997]:
          - generic [ref=e999]:
            - generic [ref=e1000]:
              - generic [ref=e1001]:
                - text: Name
                - textbox "Name" [ref=e1002]
              - generic [ref=e1003]:
                - text: Email
                - textbox "Email" [ref=e1004]
            - generic [ref=e1005]:
              - text: Company / Organization
              - textbox "Company / Organization" [ref=e1006]
            - generic [ref=e1007]:
              - text: Project Type
              - combobox "Project Type" [ref=e1008]:
                - option "AI/ML Model" [selected]
                - option "SaaS Product"
                - option "IT Consulting"
                - option "Research Collaboration"
                - option "Other"
            - generic [ref=e1009]:
              - text: Message
              - textbox "Message" [ref=e1010]
            - button "Send Message" [ref=e1011]
          - generic [ref=e1015]:
            - generic [ref=e1018]:
              - generic [ref=e1019]: AVAILABLE FOR NEW PROJECTS
              - generic [ref=e1021]: "Accepting: Q3 2026 engagements"
              - generic [ref=e1022]: "Preferred: ML · SaaS · Research"
            - generic [ref=e1023]:
              - generic [ref=e1029]:
                - generic [ref=e1030]: Email
                - link "danielwanjalamachimbo@gmail.com" [ref=e1031] [cursor=pointer]:
                  - /url: mailto:danielwanjalamachimbo@gmail.com
              - generic [ref=e1036]:
                - generic [ref=e1037]: Phone
                - link "+254 742 007 277" [ref=e1038] [cursor=pointer]:
                  - /url: tel:+254742007277
              - generic [ref=e1044]:
                - generic [ref=e1045]: Location
                - generic [ref=e1046]: Ruiru / Nairobi, Kenya 🇰🇪
              - generic [ref=e1052]:
                - generic [ref=e1053]: Timezone
                - generic [ref=e1054]: East Africa Time (UTC+3)
            - generic [ref=e1055]:
              - generic [ref=e1056]: Connect
              - generic [ref=e1057]:
                - link "GitHub profile" [ref=e1058] [cursor=pointer]:
                  - /url: https://github.com/MadScie254
                - link "LinkedIn profile" [ref=e1062] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/daniel-wanjala-machimbo-msc-912b8b17b
                - link "DEV.to profile" [ref=e1067] [cursor=pointer]:
                  - /url: https://dev.to/wanjala
                  - text: DEV.to
                - link "ORCID profile" [ref=e1068] [cursor=pointer]:
                  - /url: https://orcid.org/0009-0005-1979-8555
                  - text: ORCID
      - generic [ref=e1070]:
        - generic [ref=e1071]:
          - generic [ref=e1072]:
            - generic [ref=e1077]:
              - text: Danco
              - generic [ref=e1078]: Analytics
            - paragraph [ref=e1079]: Building Africa's intelligent future, one dataset at a time.
          - generic [ref=e1080]:
            - heading "Quick Links" [level=4] [ref=e1081]
            - list [ref=e1082]:
              - listitem [ref=e1083]:
                - button "Home" [ref=e1084]
              - listitem [ref=e1085]:
                - button "About" [ref=e1086]
              - listitem [ref=e1087]:
                - button "Case Studies" [ref=e1088]
              - listitem [ref=e1089]:
                - button "Services" [ref=e1090]
              - listitem [ref=e1091]:
                - button "Projects" [ref=e1092]
              - listitem [ref=e1093]:
                - button "Research" [ref=e1094]
              - listitem [ref=e1095]:
                - button "Contact" [ref=e1096]
          - generic [ref=e1097]:
            - heading "Newsletter" [level=4] [ref=e1098]
            - paragraph [ref=e1099]: Insights directly to your inbox. No spam.
            - generic [ref=e1100]:
              - textbox "Email address" [ref=e1101]
              - button "Subscribe" [ref=e1102]
            - generic [ref=e1103]:
              - text: "Privacy: analytics only load after consent and anonymize IPs."
              - button "Manage cookies" [ref=e1104]
        - generic [ref=e1105]:
          - generic [ref=e1106]: © 2026 Danco Analytics. All rights reserved.
          - generic [ref=e1107]:
            - generic [ref=e1108]: Based in Nairobi, Kenya 🇰🇪
            - generic [ref=e1109]: ·
            - link "github.com/MadScie254" [ref=e1110] [cursor=pointer]:
              - /url: https://github.com/MadScie254
    - region "Notifications alt+T"
  - generic [ref=e1111]: "-3"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const viewports = [
  4  |   { width: 375, height: 812 },   // mobile
  5  |   { width: 390, height: 844 },   // mobile
  6  |   { width: 768, height: 1024 },  // tablet
  7  |   { width: 1280, height: 800 },  // laptop
  8  |   { width: 1536, height: 960 }   // desktop
  9  | ];
  10 | 
  11 | test.describe('E2E Verification', () => {
  12 |   viewports.forEach((vp) => {
  13 |     test(`Viewport ${vp.width}x${vp.height} - Check overflow and GA4`, async ({ page }) => {
  14 |       await page.setViewportSize(vp);
  15 |       const url = process.env.URL || 'http://localhost:8787/';
  16 |       
  17 |       // Navigate to the page
  18 |       await page.goto(url);
  19 |       
  20 |       // 1. Check for horizontal overflow
  21 |       const hasOverflow = await page.evaluate(() => {
  22 |         return document.documentElement.scrollWidth > window.innerWidth;
  23 |       });
  24 |       expect(hasOverflow).toBeFalsy();
  25 | 
  26 |       // 2. Take a screenshot
  27 |       await page.screenshot({ path: `screenshots/home-${vp.width}x${vp.height}.png`, fullPage: true });
  28 | 
  29 |       // 3. Test GA4 script behavior
  30 |       let ga4Loader = await page.$('#ga4-loader');
  31 |       expect(ga4Loader).toBeNull(); // Should not exist before consent
  32 | 
  33 |       // Accept cookies
  34 |       const acceptBtn = await page.getByText('Accept', { exact: true });
  35 |       if (await acceptBtn.isVisible()) {
  36 |         await acceptBtn.click();
  37 |       }
  38 | 
  39 |       // Check GA4 script is injected after accept
  40 |       await page.waitForTimeout(1000); // give it a moment to inject
  41 |       ga4Loader = await page.$('#ga4-loader');
> 42 |       expect(ga4Loader).not.toBeNull(); // Should exist now
     |                             ^ Error: expect(received).not.toBeNull()
  43 |     });
  44 |   });
  45 | 
  46 |   test('Contact Form E2E', async ({ page }) => {
  47 |     const url = process.env.URL || 'http://localhost:8787/';
  48 |     await page.goto(url);
  49 | 
  50 |     // Fill form
  51 |     await page.getByPlaceholder('John Doe').fill('Playwright Test');
  52 |     await page.getByPlaceholder('john@company.com').fill('test@playwright.dev');
  53 |     await page.getByPlaceholder('Tell us about your project...').fill('This is a test message from Playwright E2E.');
  54 |     
  55 |     // Submit
  56 |     const submitBtn = await page.getByRole('button', { name: /Send Message/i });
  57 |     await submitBtn.click();
  58 | 
  59 |     // Verify success toast (assuming sonner or similar creates a success message)
  60 |     const successToast = await page.getByText('Message sent successfully!');
  61 |     await expect(successToast).toBeVisible();
  62 | 
  63 |     // Verify no navigation happened (still on same page)
  64 |     expect(page.url().replace(/\/$/, '')).toBe(url.replace(/\/$/, ''));
  65 |   });
  66 | });
  67 | 
```