export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface StudentProject {
  id: string;
  name: string;
  program: string;
  problem: string;
  mentor: string;
  outcome: string;
  skills: string[];
  image: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  ibCertifications: string;
  philosophy: string;
}

export interface LearningEnvironment {
  id: string;
  name: string;
  description: string;
  benefits: string;
  outcomes: string;
  icon: string;
}

export interface ActivityDetail {
  name: string;
  description: string;
  benefits: string;
  outcome: string;
}

export const SCHOOL_DATA = {
  name: "Mirai Experiential School",
  location: "Ghaziabad, National Capital Region (NCR), India",
  tagline: "Where Ideas Turn Into Action",
  subheading: "A Future-Ready International IB School Built Around Inquiry, Experience and Real-World Learning",
  trustIndicators: [
    { label: "Curriculum", value: "IB Candidate School" },
    { label: "Programmes", value: "Primary, Middle & Diploma Pathways" },
    { label: "Ratio", value: "1:8 Teacher-to-Student Ratio" },
    { label: "Innovation", value: "Mirai 4+1 Learning Model" },
    { label: "Signature", value: "Future Fridays Program" }
  ],
  whyChooseUs: [
    {
      title: "Future-Ready Education",
      description: "We prepare children for the economies of 2035 and beyond, integrating generative artificial intelligence, spatial computing, systems engineering, and ecological mindfulness directly into the traditional IB framework."
    },
    {
      title: "IB Curriculum",
      description: "Combining the rigorous standards of the International Baccalaureate with our custom hands-on engineering and design guidelines, fostering a deep global perspective."
    },
    {
      title: "4+1 Learning Model",
      description: "A transformative week structure: 4 days of rigorous, interdisciplinary core academic inquiry fused with 1 dedicated, uninterrupted day of real-world field-work, exploration, and mentorship."
    },
    {
      title: "Global Pathways",
      description: "Structured career development starting in middle school. Personalized portfolios, university masterclasses, and college counseling designed to place students in leading global universities."
    },
    {
      title: "Experiential Learning",
      description: "Ditching dry instruction for experiential labs. Chemistry is learned in modern hydroponics blocks; mathematics is applied in structural design; linguistics is discovered in cultural immersion."
    },
    {
      title: "Holistic Development",
      description: "We cultivate high emotional intelligence (EQ), physical fortitude, and creative fluency beside intellectual capacity, ensuring our graduates are multi-dimensional, resilient leaders."
    }
  ],
  fourPlusOneModel: {
    description: "Inspired by the Harvard FIELD Method, Google's 20% Innovation time, and the rigorous IB Inquiry Framework, the Mirai 4+1 Model ensures that 80% of our week is dedicated to deep, multi-sensory academic inquiry while 20% (Friday) is reserved entirely for hands-on, real-world application. Students do not just study theories; they build semester-long capstone projects guided by active industry mentors to deliver real-world outcomes.",
    timeline: [
      {
        day: "Monday",
        title: "Academic Foundations",
        description: "Focus on rigorous transdisciplinary inquiries, core mathematics, humanities, scientific concepts, and advanced literacy. Core subject concepts are mapped systematically against IB standards.",
        focus: "Core Concepts & Conceptual Framing",
        outcome: "Acquisition of foundational theory and analytical models."
      },
      {
        day: "Tuesday",
        title: "Inquiry Learning",
        description: "Deep-dive inquiry sessions. Students work across age-appropriate clusters to dissect global issues. Science labs, math inquiries, and language analyses collide around core questions.",
        focus: "Active Hypothesizing & Analysis",
        outcome: "Synthesis of scientific, historic, and creative theories."
      },
      {
        day: "Wednesday",
        title: "Collaboration & Synthesis",
        description: "Peer-led sessions where students co-create, challenge assumptions, and run structured debates. They work in our makerspace, testing mechanical models, writing code, or staging productions.",
        focus: "Co-Development & Prototyping",
        outcome: "Collaborative mockups, dynamic debates, and peer reviews."
      },
      {
        day: "Thursday",
        title: "Advanced Research",
        description: "Students refine their research questions, execute high-level literature reviews, and analyze data pools. Guided by faculty advisors, they construct rigorous academic portfolios.",
        focus: "Data Verification & Portfolio Prep",
        outcome: "Drafting of research summaries and academic portfolios."
      },
      {
        day: "Friday",
        title: "Future Fridays (Field Day)",
        description: "The entire school empties. Students disperse into partner research labs, tech facilities, art galleries, factories, and ecological reserves. No on-campus lectures. Pure active exploration and external mentorship.",
        focus: "Real-World Deployment & Inquiry-In-Action",
        outcome: "Semester-long Capstones under corporate and research mentors."
      }
    ]
  },
  whyIB: [
    {
      dimension: "Critical Thinking",
      ibApproach: "Students analyze complex issues through Multiple Perspectives (Theory of Knowledge). Rote memorization is replaced with evaluating bias, authority, and systemic structures.",
      traditionalApproach: "Heavy focus on lecture retention, standard mock examinations, and singular textbook answers that align with state boards.",
      impact: "Mirai grads score 45% higher on lateral thinking and independent critical audits."
    },
    {
      dimension: "Research Skills",
      ibApproach: "Students author a 4,000-word Extended Essay (EE) using primary source methodologies, advanced statistical analysis, citations, and university-grade literature review structures.",
      traditionalApproach: "Brief library assignments or pre-defined lab report templates with fixed outcomes; minimal self-directed academic writing.",
      impact: "Seamless transition to Ivy League and tier-1 international undergraduate research expectations."
    },
    {
      dimension: "Communication",
      ibApproach: "Compulsory presentation modules, internal scientific orals, bilingual mastery, and artistic representation of intellectual arguments.",
      traditionalApproach: "Passive classroom listening, written exams, and simple tests. Public speaking is treated as an optional extracurricular activity.",
      impact: "Confidence in boardroom negotiations, international symposiums, and collaborative project defenses."
    },
    {
      dimension: "Global Mindset",
      ibApproach: "Syllabi explore global socio-economic shifts, inter-country environmental impacts, and cultural anthropology, supplemented by compulsory service learning (CAS).",
      traditionalApproach: "Nationalistic or localized curricula with minimal focus on world histories, cross-border economics, or international ethics.",
      impact: "Graduates think fluidly across borders, ready for cross-cultural multinational leadership."
    },
    {
      dimension: "University Readiness",
      ibApproach: "Rigorous credit transfer, standardized internal assessments graded by global moderators, and complex workload balancing mimicking college life.",
      traditionalApproach: "Rote memorization for one-day entrance examinations, leading to high post-admission dropout or academic culture shock.",
      impact: "Mirai students enter university with up to 30 credit hours already completed, saving time and tuition."
    },
    {
      dimension: "Leadership",
      ibApproach: "Students initiate, resource, and manage their own community service projects, scientific innovations, and creative showcases. Faculty act as consulting mentors.",
      traditionalApproach: "Teacher-directed clubs, passive hierarchy structures, and standardized prefect systems with limited creative authority.",
      impact: "Active founders, social entrepreneurs, and deep technical innovators before graduation."
    }
  ],
  futureFridays: {
    description: "Our signature 'Future Fridays' program is designed to bridge the chasm between textbook theories and actual real-world operations. We believe learning is sterile if confined behind walls. Every single Friday, our students leave campus to work in professional, creative, and scientific ecosystems.",
    locations: [
      {
        facility: "Robotics Research Centers",
        activity: "Working alongside automotive and automation engineers in IMT Manesar, testing industrial robotic arms and kinematics.",
        benefit: "Practical applications of trigonometry, calculus, and C++ arrays.",
        outcome: "Student team rebuilt a light-payload sorting hand for a local cooperative packing center."
      },
      {
        facility: "Agri-Tech Labs",
        activity: "Partnering with soil scientists in sustainable cooperative farms to study hydroponic systems and closed-loop soil replenishment.",
        benefit: "Applying biological cellular models and chemistry pH curves to food systems.",
        outcome: "Optimized a solar-powered nutrient drip feed system that requires 40% less water."
      },
      {
        facility: "Art and Architecture Galleries",
        activity: "Spending intense modules with National Gallery curators and leading architectural restoration projects in historical Delhi monuments.",
        benefit: "Studying load distributions, spatial golden ratios, and cultural preservation pathways.",
        outcome: "A 3D spatial mapping app of historical step-wells published for public heritage tours."
      },
      {
        facility: "Industrial Production & Factories",
        activity: "Experiencing lean manufacturing pipelines at automated electronics assembly houses to learn design-for-manufacturing restrictions.",
        benefit: "Understanding operations, supply lines, environmental safety and thermal dissipation.",
        outcome: "Modified housing design for student air monitors to bypass complex plastic tooling."
      },
      {
        facility: "University Innovation Hubs",
        activity: "Co-working in prototyping laboratories with graduate scholars at premier institutions, developing experimental setups.",
        benefit: "Exposure to computational mechanics simulators, material testers, and deep coding.",
        outcome: "Created composite natural hemp-based biodegradable filters for city exhaust systems."
      },
      {
        facility: "Entrepreneurship & Venture Incubators",
        activity: "Attaining sessions on venture metrics, slide designing, seed financing, and pitching to local angel networks.",
        benefit: "Translating engineering projects into actual self-sustaining businesses and NGOs.",
        outcome: "Three studentcapstones received prototyping micro-grants of ₹1,50,000 each from NCR angels."
      }
    ]
  },
  studentProjects: [
    {
      id: "proj_1",
      name: "Tactile Navigation: Assistive Haptic Belt for Visually Impaired",
      program: "MYP Capstone Project (Grade 10)",
      problem: "Visually impaired individuals in urban Indian centers struggle to navigate unexpected construction, low-hanging signs, and erratic vehicular paths with simple white canes.",
      mentor: "Dr. Alok Agrawal, Senior Scientist, IIT Delhi Haptics Lab",
      outcome: "Designed, coded, and 3D-printed a lightweight multi-sensor haptic belt using ultrasonic radar transducers and micro-vibration motors. Achieved 94% obstacles avoidance accuracy in real trials.",
      skills: ["C++ Arduino", "3D Printing & CAD", "UX Research", "Materials Engineering"],
      image: "https://picsum.photos/seed/haptic/600/400"
    },
    {
      id: "proj_2",
      name: "Carbon-Negative Concrete: Recycled Agricultural Waste Composites",
      program: "DP Collaborative Sciences Project (Grade 12)",
      problem: "Traditional concrete contributes to 8% of carbon emissions while stubble burning in Haryana or Punjab drives seasonal hazardous air quality across northern Indian schools.",
      mentor: "Prof. Sunita Roy, Green Infrastructure Associate, TERI Delhi",
      outcome: "Created structural composite concrete blocks utilizing dense sugarcane bagasse ash and treated paddy straw fibers. Achieved compression strength metrics similar to grade M20 cement while locking away agricultural residue.",
      skills: ["Civil Engineering", "Spectroscopy Analysis", "Quantitative Research", "Sustainability Audits"],
      image: "https://picsum.photos/seed/greenconcrete/600/400"
    },
    {
      id: "proj_3",
      name: "Nirmal Jal: Low-Cost AI Micro-Filter for Urban Wastewater Channels",
      program: "DP Group 4 Sciences Project (Grade 11)",
      problem: "Untreated water from small urban clusters damages local groundwater systems and destroys urban lakes, yet commercial municipal grade treatment systems are slow or capital intensive.",
      mentor: "Ananya Mehta, Chief Hydrologist, NCR Clean Water Mission",
      outcome: "Invented an inline multi-stage gravity-driven filtration tube that couples activated bio-char with an ESP32 camera node. The node detects biological turbidity spikes via custom light-refraction models, signaling maintenance on local networks.",
      skills: ["IoT Architecture", "Turbidity Computations", "Fluid Dynamics", "Microfluidic Chemistry"],
      image: "https://picsum.photos/seed/cleanwater/600/400"
    }
  ],
  programmes: [
    {
      id: "eyp",
      title: "Early Years Programme (EYP)",
      age: "3 to 5 Years (Pre-K & K)",
      curriculum: "Reggio-Emilia Inspired play-based learning, integrated with IB PYP early inquiry steps. Structured around sensory stimulation, social co-existence, motor refinement, and creative immersion.",
      skills: ["Motor Coordination & Muscle Memory", "Emotional Self-Regulation", "Bilingual Auditory Foundations", "Basic Pattern and Logical Coding"],
      activities: ["Nature Exploration Trails", "Clay Sculpting and Pigment Labs", "Musical Storytelling Rings", "Foundational Coding Games"],
      outcomes: "Children entering Grade 1 possess high social adaptability, expressive vocabularies, and confidence, looking at lessons as fun challenges."
    },
    {
      id: "pyp",
      title: "Primary Years Programme (PYP)",
      age: "6 to 10 Years (Grades 1 to 5)",
      curriculum: "Rigorous IB PYP. Centered on 6 transdisciplinary themes: Who we are, Where we are in place and time, How we express ourselves, How the world works, How we organize ourselves, and Sharing the planet.",
      skills: ["Transdisciplinary Framing", "Inquiring Questions formulation", "Bilingual Literacy", "Mathematical Problem-Deconstruction"],
      activities: ["Micro-Ecosystem Hydroponics", "Cultural Anthropology Theater", "Mini-Makers Mechanical Builds", "Digital Media and Animation Lab"],
      outcomes: "Successful exhibition of the PYP Capstone, expressing research methodologies on complex socio-scientific concerns."
    },
    {
      id: "myp",
      title: "Middle Years Programme (MYP)",
      age: "11 to 15 Years (Grades 6 to 10)",
      curriculum: "Rigorous IB MYP framework. 8 foundational subjects with systemic cross-curricular links. Focuses on Global Contexts: Fairness and development, Identities and relationships, Scientific and technical innovation, and Orientation in space and time.",
      skills: ["Hypothesis Generation & Mathematical Proofs", "Coding API Integrations", "Scientific Report Formulation", "Literary Critique and Rhetorical Analysis"],
      activities: ["Competitive Robotics Leagues", "Model UN Symposia", "Local Watershed Field Chemistry", "Social Justice Documentaries"],
      outcomes: "Design, testing, and display of MYP Personal Projects with external jury mentors, showing high academic readiness for DP."
    },
    {
      id: "dp",
      title: "Diploma Programme (DP)",
      age: "16 to 18 Years (Grades 11 to 12)",
      curriculum: "The world's most rigorous pre-university curriculum. Core framework: Theory of Knowledge (TOK), Extended Essay (EE), and Creativity, Activity, Service (CAS). Six subjects selected from high-level domains (Higher Level/Standard Level).",
      skills: ["University-Grade Peer Review Research", "Statistical Regression Modelling", "Advanced Critical Epistemology", "Project Resource Procurement"],
      activities: ["Advanced Physics Synchrotron Simulations", "Ecology Conservation Summits", "Venture Incubations and NGO launches", "Inter-disciplinary Philosophical Colloquiums"],
      outcomes: "Comprehensive, publication-grade Extended Essay, high IB score profiles, and structured portfolio entries for global university admissions."
    }
  ],
  miraiJourney: [
    {
      stage: "Discover",
      focus: "Ages 3-8 (Introductory Years)",
      description: "Cultivating sensory awareness, continuous curiosity, and emotional vocabulary. Students learn by touching, building, breaking, and asking deep questions about light, nature, and community.",
      milestone: "Building confidence to express, question, and play in multiple mediums."
    },
    {
      stage: "Explore",
      focus: "Ages 9-12 (Middle Primary Years)",
      description: "Developing structured testing methods. Students shift from general questioning to framing hypotheses, using microscope slides, analyzing mathematical patterns, and understanding historical timelines.",
      milestone: "Primary PYP Exhibition showcasing independent inquiries."
    },
    {
      stage: "Create",
      focus: "Ages 13-15 (Innovative Middle Years)",
      description: "Students learn structural coding, hardware engineering, advanced literary synthesis, and historical audits. They combine scientific theories to solve tangible local challenges.",
      milestone: "Design, code, and test an advanced functional personal project prototype."
    },
    {
      stage: "Lead",
      focus: "Ages 16-18 (Mature Pre-University)",
      description: "Students publish academic research, coordinate regional campaigns, lead sports associations, manage community CAS initiatives, and pitch to external corporate partners.",
      milestone: "A 4,000-word EE and dynamic portfolios accepted in global Ivy League institutions."
    }
  ],
  faculty: {
    ratio: "1:8 Teacher-to-Student Ratio",
    development: "Compulsory annually: 120 hours of continuous professional training, including IB Advanced Workshops, Stanford design-thinking retreats, and social-emotional pastoral care certifications.",
    profiles: [
      {
        id: "fac_1",
        name: "Dr. Arundhati Roy Chowdhury",
        role: "Head of Sciences & DP Physics Lead",
        qualifications: "Ph.D. in Theoretical Physics, IISc Bangalore; PostDoc, University of Cambridge",
        experience: "16+ Years teaching standard IB HL Physics globally",
        ibCertifications: "IB Senior Examiner & Curriculum Review Team Member (Category 3)",
        philosophy: "Physics is not dry arithmetic; it is the poetry of physical forces. I help students see Maxwell's equations in the movement of wind, clouds, and cell phones."
      },
      {
        id: "fac_2",
        name: "Marcus Vance",
        role: "Head of Humanities, IB TOK Facilitator",
        qualifications: "M.A. in Philosophy & Socio-Economics, University of Oxford",
        experience: "12+ Years teaching in premium IB schools across London, Zurich, and Delhi",
        ibCertifications: "Certified TOK Evaluation Consultant (Category 3)",
        philosophy: "I want to dismantle certainty in our kids. To hold a global perspective, one must first master the art of questioning our own absolute baseline assumptions."
      },
      {
        id: "fac_3",
        name: "Priyanka Deshmukh",
        role: "Director of Digital Learning & Tech Integration",
        qualifications: "M.Tech in Computer Science & Robotics, IIT Bombay",
        experience: "9+ Years designing learning platforms, former Principal UX Architect at a top firm",
        ibCertifications: "IB Computer Science & Technology Design Coordinator",
        philosophy: "Modern code is an expressive brush, not just structural pipes. When children write clean algorithms, they are learning how to logically construct arguments."
      }
    ]
  },
  learningEnvironments: [
    {
      id: "env_1",
      name: "Integrated Sciences Synchrotron Lab",
      description: "A physics, chemistry, and biology super-lab equipped with spectrophotometers, computerized temperature gas-chromatography setups, and high-precision physical sensors.",
      benefits: "Allows simultaneous macro-fluidic and microscopic research. No physical boundaries between scientific disciplines.",
      outcomes: "Students analyze complex real samples of Delhi NCR air, designing actual microparticle-separation templates.",
      icon: "Beaker"
    },
    {
      id: "env_2",
      name: "Mirai Innovation & Maker Space",
      description: "Equipped with advanced multi-axis CNC machines, dual-laser cutters, modern SLA 3D printers, and robust heavy material working stations.",
      benefits: "Brings CAD and material-strength theories into actual physical structures. Encourages active prototyping.",
      outcomes: "Built durable, custom modular educational toys gifted to local community-run preschools.",
      icon: "Cpu"
    },
    {
      id: "env_3",
      name: "AI & Computational Robotics Lab",
      description: "Dedicated cluster with GPU-accelerated computing nodes, ROS (Robot Operating System) testbeds, spatial AR/VR headsets, and edge compute microcontrollers.",
      benefits: "Exposes students to real machine intelligence, neural networks, computer vision, and spatial user interactions.",
      outcomes: "Coded a custom localized camera node that detects plastic waste in green planters automatically.",
      icon: "Workflow"
    },
    {
      id: "env_4",
      name: "Fine Arts, Ceramic & Design Studios",
      description: "Spacious studio with high ceilings, plenty of north-facing natural light, fully functional potter's wheels, high-fire ceramic kilns, and professional printmaking tables.",
      benefits: "Engages children in fine spatial tactile creation, tactile sensitivity, and historic craft processes.",
      outcomes: "Organized a student-curated arts auction that raised ₹3,20,000 for local wildlife sanctuaries.",
      icon: "Palette"
    },
    {
      id: "env_5",
      name: "Acoustic Music & Digital Recording Room",
      description: "Soundproofed rooms featuring traditional acoustic instruments (sitar, table, piano) alongside modern MIDI stations, multi-track mixers, and DAW suites.",
      benefits: "Combines classical music compositions with digital acoustics, sound engineering, and creative spatial audio.",
      outcomes: "Students recorded, mastered, and published an independent conceptual EP on digital platforms.",
      icon: "Music"
    },
    {
      id: "env_6",
      name: "The Copernicus Library & Media Commons",
      description: "A vast multi-level media resource center hosting 28,000+ physical volumes, rich peer-reviewed JSTOR/IEEE journal access, quiet reading pods, and recording spaces.",
      benefits: "Sparks passion for advanced multidisciplinary research. Teaches kids how to separate credible peer-reviewed studies from general internet noise.",
      outcomes: "Successful self-published student newsletter printed on recycled paper every month.",
      icon: "BookOpen"
    }
  ],
  sportsWellness: {
    description: "At Mirai, physical development is not seen as an optional break from learning; it is treated as a fundamental pillar of neural development and resilience. Our athletic programs emphasize scientific metrics, cooperative play, and permanent wellness habits.",
    activities: [
      {
        name: "Olympic Standard Football Pitch",
        description: "Full-size FIFA-certified turf with sub-surface water drainage and floodlights, hosting state-level tournaments.",
        benefits: "Builds cardiovascular stamina, rapid team communication, spatial strategy, and explosive acceleration profiles.",
        outcome: "Mirai Varsity Football team won the Delhi Regional IB Cup back-to-back."
      },
      {
        name: "Heated Indoor Swimming Pool",
        description: "An Olympic size six-lane indoor pool with continuous temperature regulation, automated ozone filtration, and professional life-safety systems.",
        benefits: "Teaches total skeletal coordination, high breath regulation, cardiac resilience, and vital water-safety survival skills.",
        outcome: "Every student must achieve basic lifeguard survival swimming benchmarks before Grade 5."
      },
      {
        name: "Synthetic Tennis & Basketball Courts",
        description: "Multiple high-grade shock-absorbent courts certified for youth competitions, complete with computerized ball return launchers.",
        benefits: "Fosters rapid visual reactions, hand-eye coordination agility, and split-second spatial problem-solving.",
        outcome: "Host to the National All-India School Tennis Invitationals."
      },
      {
        name: "Professional Turf Cricket Ground",
        description: "Lush outfield with multiple clay pitches, professional bowling nets, and automated swing trainers.",
        benefits: "Balances long-term situational concentration, intense focus under pressure, throw mechanics, and spatial athletic positioning.",
        outcome: "Coached by former regional Ranji academy staff with structured talent pathways."
      },
      {
        name: "Prana Yoga & Meditation Shala",
        description: "A high-ceilinged timber-framed meditation studio featuring natural cork flooring and a silent rock garden outlook.",
        benefits: "Cultivates focus, manages test pressure, develops deep diaphragmatic breathing, and reinforces emotional self-mastery.",
        outcome: "Compulsory 15-minute daily morning mindfulness integration across all grades."
      }
    ]
  },
  artsCreativity: [
    {
      name: "Classical & Contemporary Music",
      description: "Mastery of instruments ranging from traditional Indian classical (Sitar, Tabla) to Western Orchestral (Violin, Flute) alongside digital sound synthesis models.",
      benefits: "Improves math processing pathways, structural auditing, and patience through practice."
    },
    {
      name: "Experimental Drama & Theater Arts",
      description: "Compulsory performance programs where students write original screenplays, direct peers, construct sets, and manage theatrical lights.",
      benefits: "Forces radical empathy, narrative construction, and dynamic collaborative coordination under headlights."
    },
    {
       name: "Visual Arts & Clay Sculpting",
       description: "Fine visual inquiry using oil paints, charcoal sketching, structural sculpture modeling, and firing original clay creations.",
       benefits: "Sharpens fine spatial motor pathways, deep concentration, and non-verbal conceptual expression."
    },
    {
       name: "Film Making & Spatial Digital Cinematography",
       description: "Scriptwriting, operating modern mirrorless cameras, setting high-contrast lighting arrays, and editing in DaVinci Resolve.",
       benefits: "Exposes students to industry-standard visual design pipelines, sound layering, and digital storytelling."
    }
  ],
  coCurricular: [
    {
      name: "Model United Nations (MUN)",
      description: "Simulating international diplomatic boards, drafting global policy whitepapers, debating border protocols, and building strategic alliances.",
      benefits: "Polishes formal speech, deep geo-political understanding, and negotiation compromises."
    },
    {
      name: "Y-Combinator style Entrepreneurship Club",
      description: "Students pitch original startup mockups to tech founders. They draft detailed business canvases, run user acquisition tests, and pitch prototypes.",
      benefits: "Teaches financial literacy, pricing models, seed equity, dynamic pitch construction, and testing assumptions."
    },
    {
      name: "Computational Coding & AI Club",
      description: "Building neural networks, coding microcontrollers, and creating server-side apps. Students compete in national school hackathons.",
      benefits: "Logical arguments, algorithmic safety, rapid software debugging, and machine intelligence models."
    },
    {
      name: "Ecological Conservation & Environment Club",
      description: "Running the on-campus bio-gas recycling pipelines, monitoring local groundwater tables, and coordinating regional reforestation programs.",
      benefits: "Teaches ecological systems-thinking, bio-density calculations, and practical community initiatives."
    },
    {
      name: "Model Rocketry & STEM Club",
      description: "Designing solid-fuel model rockets, predicting atmospheric wind drag, printing aerodynamic nose cones, and launching payloads.",
      benefits: "Brings advanced physics equations, aerodynamics, and telemetry data collection alive."
    }
  ],
  boarding: {
    description: "Boarding at Mirai is designed as a structured ecosystem that balances intense study with deep familial warmth, fostering critical life skills of self-organization, emotional independence, and collaborative harmony.",
    housing: "Twin-sharing micro-suites with custom ergonomic workspaces, individual temperature regulation, deep pine-wood custom layouts, and highly secure personal safes.",
    dining: "Scientifically structured organic menus curated by pediatric clinical nutritionists. Zero ultra-processed foods. Traditional whole grains, fresh farm greens, home-style slow-cooked legumes, and diverse international rotations.",
    routine: [
      { time: "06:00 AM", task: "Surya Namaskar & Mindful Breathing in Shala" },
      { time: "06:30 AM", task: "Vigorous Fitness / Swimming / Field Run" },
      { time: "07:15 AM", task: "Surgical Hygiene and Suite Assembly" },
      { time: "07:45 AM", task: "Nutrient-Dense Farm-to-Table Breakfast" },
      { time: "08:15 AM", task: "School Day Begins (Academic inquiry and projects)" },
      { time: "03:30 PM", task: "Varsity Sports / Performance Arts and Maker Labs" },
      { time: "05:00 PM", task: "Afternoon Refreshments & Relaxed Commons Socializing" },
      { time: "06:00 PM", task: "Faculty-Supervised Evening Prep (Deep homework and EE research review)" },
      { time: "08:00 PM", task: "Chef's Curated Dinner Buffet & Floor Assembly dialogue" },
      { time: "09:00 PM", task: "Leisure (Bilingual reading, board games, stargazing)" },
      { time: "09:45 PM", task: "Digital Curfew (Devices secured in charging boxes)" },
      { time: "10:15 PM", task: "Lights Out (Acoustic relaxation tones)" }
    ]
  },
  universityPathways: {
    overview: "Our comprehensive, four-year structured college counselling begins early in Grade 9, crafting specialized strategic portfolios rather than simple boilerplate testing profiles.",
    metrics: [
      { label: "Top-50 Global Admissions", value: "94%" },
      { label: "Ivy League Placements", value: "18%" },
      { label: "Average Scholarship Secured", value: "₹38,00,000" },
      { label: "Countries Placed In", value: "12+" }
    ],
    pillars: [
      {
        title: "Dossier & Portfolio Cultivation",
        description: "We help students organize their research capstones, patented IoT designs, published poetry books, or national sports trophies into specialized digital portfolios that stand out in competitive admission pools."
      },
      {
        title: "Mock Admissions Reviews",
        description: "Providing direct simulated interviews with our active network of international admissions professionals and seasoned alumni from Oxford, Harvard, and Stanford."
      },
      {
        title: "Standardized Testing Strategy",
        description: "Highly customized SAT/ACT preparations, advanced English literature tests, and subject test integrations without interfering with key IB internal assessments."
      }
    ],
    universities: [
      "Harvard University", "Stanford University", "University of Oxford", "University of Cambridge",
      "Massachusetts Institute of Technology", "Yale University", "Imperial College London",
      "National University of Singapore", "Olin College of Engineering", "University of Toronto",
      "UCLA", "University of Chicago", "Ashoka University"
    ]
  },
  faq: [
    {
      id: "faq_1",
      category: "Admissions & Fees",
      question: "Is Mirai Experiential School an authorized IB World School?",
      answer: "Mirai Experiential School is a candidate school for the International Baccalaureate (IB) Primary Years Programme, Middle Years Programme, and Diploma Programme. Candidate schools are pursuing authorization to become official IB World Schools, ensuring high standards of educational quality and professional teacher training from day one."
    },
    {
      id: "faq_2",
      category: "Academic Rigor",
      question: "How does the '4+1' model work without falling behind on the standard IB curriculum?",
      answer: "By consolidating lecture slots, removing redundant administrative filler, and utilizing highly optimized, transdisciplinary learning modules, we cover the core academic syllabus in 4 days (Monday to Thursday). Friday field sessions do not ignore the syllabus; they actively apply it. For example, biology coursework is applied in organic labs, and geometry is practiced in maker workshops on Fridays, cementing the curriculum far better than cramming."
    },
    {
      id: "faq_3",
      category: "Admissions & Fees",
      question: "What is the fee structure and are there scholarships available?",
      answer: "Our fees reflect our world-class, high-resource infrastructure (advanced robotics modules, heated pools, PhD faculty, and Friday travel logistics). Direct day school fees range from ₹6,50,000 to ₹9,20,000 per annum depending on the grade, inclusive of all lab resources and meals. Outstanding candidates in academics, sports, and green technologies can apply for 'Homi Bhabha & Mirai Merit Scholarships' which offer up to 75% tuition waivers."
    },
    {
      id: "faq_4",
      category: "Campus & Logistics",
      question: "Do you offer transportation for day scholars, and how is it monitored?",
      answer: "Yes, we operate safe, high-end air-conditioned transport vans spanning Ghaziabad, Delhi, and Noida. Every single vehicle features live GPS vehicle tracking, multi-point interior CCTV feeds accessible to parents in real-time, Speed-governors limited strictly to 40 km/h, and a trained adult female attendant present on every route."
    },
    {
      id: "faq_5",
      category: "Boarding & Pastoral Care",
      question: "What is the minimum age for full-boarding admissions?",
      answer: "Our boarding suite is built to support students from Grade 4 onwards (9 years old). At this stage, house parents focus on self-reliance routines (hygiene, work planning, and collaborative sharing) under a highly nurturing, home-away-from-home pastoral structure."
    },
    {
      id: "faq_6",
      category: "Safety & Security",
      question: "How is campus security and visitor management handled?",
      answer: "We deploy an advanced triple-gate, military-grade card entry system coupled with real-time AI computer vision that cross-references visitor IDs immediately against police files. No unrecognized person is ever permitted inside our gates without a double digital signature from their respective host department."
    },
    {
      id: "faq_7",
      category: "Academic Rigor",
      question: "What is the teacher-student ratio, and why is it so high?",
      answer: "Our baseline across all grades is an exceptional 1:8 ratio. This enables individualized scientific project tracking, custom counseling, daily portfolio critiques, and small group seminars, mimicking the university tutorial system."
    },
    {
      id: "faq_8",
      category: "Academic Rigor",
      question: "Will my child struggle to transition to national boards (CBSE/ICSE) for competitive Indian exams like JEE/NEET?",
      answer: "Absolutely not. In fact, our conceptual scientific modeling and physics inquiry build a deeper foundational intuition that is ideal for solving complex exam questions. To support interested parents, we operate specialized after-school concept alignment modules for JEE/NEET in partnership with premier engineering veterans."
    },
    {
      id: "faq_9",
      category: "Academic Rigor",
      question: "What language pathways do you offer at Mirai?",
      answer: "Our medium of instruction is English. Recognizing the massive power of multilingualism, we offer Hindi and Sanskrit (as local language options) beside Mandarin, French, Spanish, and German as core IB Language Acquisition subjects."
    },
    {
      id: "faq_10",
      category: "Boarding & Pastoral Care",
      question: "How do boarders stay in touch with parents?",
      answer: "We mandate strict digital curfews to protect sleep and study. However, boarders are encouraged to call parents via dedicated audio/video lounges for up to 30 minutes every Wednesday evening and Saturday/Sunday afternoon."
    },
    {
      id: "faq_11",
      category: "Campus & Logistics",
      question: "What is your policy on meals and nutrition?",
      answer: "Zero ultra-processed or chemical-dyed foods are allowed on campus. Our menus are 100% organic, seasonal, and sourced from certified partners. We cater seamlessly to specialized dietary requirements, lactose intolerances, and severe nut allergies."
    },
    {
      id: "faq_12",
      category: "Co-Curricular & Arts",
      question: "Is sports participation compulsory for all students?",
      answer: "Yes, every student must actively engage in at least 4 hours of weekly physical fitness or team sports, with daily personalized metrics monitored in our health lockers. We emphasize stamina and lifetime wellness over raw competitive stress."
    },
    {
      id: "faq_13",
      category: "Faculty & Training",
      question: "Are your teachers certified by the IB directly?",
      answer: "Every single teacher joins our campus having completed official advanced IB professional development workshops. Over 30% of our lead faculty also act as certified IB examiners, giving us deep insights into global assessment criteria."
    },
    {
      id: "faq_14",
      category: "Safety & Security",
      question: "How do you handle medical emergencies on campus?",
      answer: "We host a fully equipped, 24/7 medical response center staffed by senior trauma nurses and a consulting pediatrician. We preserve our own state-of-the-art ambulance with life support on campus, and have direct priority partnerships with leading tertiary care hospitals located within a 4-minute radius."
    },
    {
      id: "faq_15",
      category: "Academic Rigor",
      question: "How do you integrate generative AI into real-world schoolwork?",
      answer: "Instead of banning AI tools, we teach students how to treat them as collaborative brainstorm partners. Students are taught prompt engineering, mathematical algorithm limitations, verification pipelines, and crucial academic ethics."
    },
    {
      id: "faq_16",
      category: "Admissions & Fees",
      question: "What is the admissions criteria and application process?",
      answer: "We look for potential, high curiosity, emotional resilience, and alignment with our hands-on vision. Admission requires a clean student portfolio submission, an analytical thinking evaluation (rather than a traditional written test), and an interaction with our educators."
    },
    {
      id: "faq_17",
      category: "Co-Curricular & Arts",
      question: "Do you have options for creative writing, cinematography, and photography?",
      answer: "Yes, our creative media arts streams are led by industry-active filmmakers and published authors. Students operate dual-laser camera rigs, high-end mixers, and editing programs as part of their standard projects."
    },
    {
      id: "faq_18",
      category: "Boarding & Pastoral Care",
      question: "How clean are the student residential spaces, and who cleans them?",
      answer: "Our professional sanitation team maintains absolute, hospital-grade sterile cleanliness across all residences daily. However, students are expected to make their own beds and preserve their workspaces to build life organization habits."
    },
    {
      id: "faq_19",
      category: "Campus & Logistics",
      question: "Do you have air conditioning and high air filtration systems across campus?",
      answer: "Yes. Recognizing seasonal pollution in Delhi NCR, our entire school is sealed with heavy double-glazed panels and runs on centralized commercial HVAC arrays equipped with multi-stage HEPA filters, keeping indoor PM2.5 metrics consistently under 15."
    },
    {
      id: "faq_20",
      category: "Safety & Security",
      question: "Do you run safety checks on your non-teaching staff?",
      answer: "Yes, comprehensive triple-point background verifications, biometric checks, and regular mental assessments are compulsory for all administrative and operational support partners prior to campus clearance."
    },
    {
      id: "faq_21",
      category: "Academic Rigor",
      question: "How do students secure corporate internships through Mirai?",
      answer: "Through our parent organization and signature Friday mentors, students in Grade 11 and 12 are matched with summer programs at leading technology labs, ecological bureaus, and design firms in India and Singapore."
    },
    {
      id: "faq_22",
      category: "Academic Rigor",
      question: "What are 'semester-long capstones' and when do they start?",
      answer: "Beginning in Grade 5, students work on open-ended group capstones tackling local challenges (e.g., wastewater, packaging, or heritage restoration). They define problems, build prototypes, and defend their results before external juries."
    },
    {
      id: "faq_23",
      category: "Admissions & Fees",
      question: "Can we visit the campus on weekends?",
      answer: "Yes, our Admissions Concierge conducts custom campus tours and engineering lab showcases every Saturday from 09:30 AM to 04:00 PM, subject to prior booking."
    },
    {
      id: "faq_24",
      category: "Boarding & Pastoral Care",
      question: "What happens on weekends for boarders?",
      answer: "Weekends balance rich rest with structured activity: expert masterclasses, astronomical observations in our observatory pool, culinary baking challenges, local cycle tours, and standard theater trips."
    },
    {
      id: "faq_25",
      category: "Academic Rigor",
      question: "How do we register as external mentors?",
      answer: "We invite scientists, entrepreneurs, architects, and experts of any discipline. Interested mentors can register using our corporate outreach portal under 'Future Fridays' to inspire the next generation."
    }
  ],
  safety: [
    { title: "Smart-AI Continuous CCTV", text: "24/7 high-resolution digital cameras equipped with real-time boundary intrusion and erratic crowd motion detection alerts, blanketing 100% of campus public areas." },
    { title: "Double-Encrypt Transport Tracking", text: "Encrypted student transport logs showing exact bus times, camera feeds, speed compliance logs, and boarding scans broadcast directly to parents." },
    { title: "Ozone Sealed Medical Zone", text: "Dedicated clinical infrastructure with an oxygen reserve stack, and direct Priority Green Corridors to nearby multi-specialty hospitals." },
    { title: "Triple-Surgical Background Audits", text: "Verified criminal history checks, and continuous psychological screening audits for all auxiliary transport, security, and dining team mates." },
    { title: "Smart Emergency Alarms", text: "Direct, integrated emergency response alerts directly linked with Ghaziabad district services and municipal response nodes." },
    { title: "Military Grade Card Security", text: "Closed RFID badges showing real-time location. No entry or exit without verified check-in, keeping campus 100% safe." }
  ],
  admissions: [
    {
      step: 1,
      title: "Inquiry Submission",
      description: "Submit a simple inquiry through our digital admissions portal. State your child's age, academic focus, and interest. Receive our extensive academic prospectus and a personal call from our counselor within 2 hours."
    },
    {
      step: 2,
      title: "Campus & Lab Tour",
      description: "Book an exclusive scheduled tour of our modern Haryana campus. Experience our maker space, chemistry spectrophotometers, heated ozone pool, and sit with active faculty."
    },
    {
      step: 3,
      title: "Curiosity & Think Assessment",
      description: "No memorization tests. The applicant participates in a collaborative hands-on makerspace team solve and a conversation evaluating analytical curiosity, teamwork, and spatial thinking."
    },
    {
      step: 4,
      title: "Formal Offer",
      description: "The admissions committee reviews the applicant's thinking metrics, school portfolios, and educator notes. Offers are dispatched via secure email portal within 48 hours."
    },
    {
      step: 5,
      title: "Enrolment & Mentorship Alignment",
      description: "Secure your place by completing standard credentials and registration. Meet with our counselors to align academic pathways, sports focus, and early Future Friday mentorship goals."
    }
  ]
};
