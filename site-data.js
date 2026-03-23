window.siteData = {
  page: {
    language: "en",
    title: "Junhwan Heo",
    description: "Personal academic homepage of Junhwan Heo.",
  },
  profile: {
    eyebrow: "",
    name: "Junhwan Heo",
    role: "Undergraduate Student in Data Science",
    bio: "",
    location: "Seoul, Republic of Korea",
    affiliation: "Korea University",
    email: "junhwan26@korea.ac.kr",
    photo: "IMG_4909.JPG",
    photoAlt: "Portrait of Junhwan Heo",
    initials: "JH",
    primaryLinks: [
      {
        label: "CV",
        href: "https://github.com/junhwan26/junhwan26/blob/main/CV.pdf",
        style: "primary",
        icon: "file",
      },
      {
        label: "Email",
        href: "mailto:junhwan26@korea.ac.kr",
        style: "secondary",
        icon: "mail",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/junhwan-heo-970024367/",
        style: "secondary",
        icon: "linkedin",
      },
    ],
    socialLinks: [],
  },
  intro: {
    headline: "",
    paragraphs: [
      "My recent work spans computer vision, multimodal reasoning, and language model systems, with research experience at KAIST AI and Korea University.",
    ],
    focusItems: [],
  },
  education: [
    {
      title: "Korea University",
      institution: "B.S. in Data Science",
      period: "Mar 2021 - Present",
      description: "GPA: 4.22/4.5 (Major GPA: 4.25/4.5)",
    },
    {
      title: "Gwangju Science Academy for the Gifted",
      institution: "High School Diploma",
      period: "Mar 2018 - Feb 2021",
      description: "Specialized secondary education program for gifted students in science and mathematics.",
    },
  ],
  experience: [
    {
      title: "Undergraduate Research Intern (KAIRI)",
      organization: "CVLAB, KAIST AI · Advisor: Professor Seungryong Kim",
      period: "Jun 2026 - Present",
      highlights: [
        "Investigating training-free referring video object segmentation, focusing on how object-level tracks support spatio-temporal reasoning under complex language queries.",
        "Exploring agentic integration of SAM3 and multimodal LLMs through iterative concept extraction and spatio-temporal pruning over candidate object tracks.",
        "Conducting benchmark and ablation analyses on MeViS, ReVOS, and ReasonVOS to validate training-free performance and the contribution of iterative pruning and temporal scope control.",
      ],
      tags: ["Computer Vision", "RVOS", "Multimodal AI"],
    },
    {
      title: "Undergraduate Research Intern",
      organization: "Universal Transfer Learning Lab, Korea University · Advisor: Professor Donghyun Kim",
      period: "Jun 2025 - Dec 2025",
      highlights: [
        "Investigated data quality bottlenecks in scene graph generation, with emphasis on long-tailed predicate bias and the trade-off between tail-class coverage and semantic validity.",
        "Characterized failure modes in data augmentation and relabeling pipelines, including distribution shift, hallucinated relations, and noisy grounding.",
        "Explored VLM/LLM-based label refinement and diffusion-based synthetic data generation to improve relational supervision and long-tailed relation coverage.",
      ],
      tags: ["Scene Graph Generation", "VLM/LLM", "Data Quality"],
    },
  ],
  publications: [
    {
      title: "AgentRVOS: Reasoning Over Object Tracks for Zero-Shot Referring Video Object Segmentation",
      authors: "Woojeong Jin*, Jaeho Lee*, Heeseong Shin, Seungho Jang, Junhwan Heo, Seungryong Kim",
      venue: "Under Review (ECCV)",
      period: "2026",
      description: "A work on reasoning over object tracks for zero-shot referring video object segmentation.",
    },
  ],
  projects: [
    {
      title: "Hierarchy-Constrained Product Text Classification",
      subtitle: "DATA304 Final Project Competition",
      period: "2025",
      description: "Built a fully unsupervised, hierarchy-constrained product categorization pipeline over a 531-node taxonomy.",
      highlights: [
        "Used Sentence-BERT embeddings, GPT-generated synthetic path-conditioned reviews, TF-IDF keyword enrichment, Cross-Encoder reranking, and GAT-based self-training with path projection.",
        "Ranked 1st among individual submissions in the DATA304 final project competition.",
      ],
      tags: ["Python", "PyTorch", "Sentence-Transformers"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/junhwan26/20252R0136DATA30400",
        },
      ],
    },
    {
      title: "Lookback Lens and LAG Integration",
      subtitle: "",
      period: "2025",
      description: "Designed a RELF decoding framework that combines retrieval-augmented generation with Lookback Lens for factuality control in small language models.",
      highlights: [
        "Ran experiments on the Natural Questions Open dataset with the LLaMA-2-7B model to evaluate hallucination and factual accuracy.",
      ],
      tags: ["Python", "Transformers", "FAISS", "LangChain"],
    },
    {
      title: "Lecture Review Clustering",
      subtitle: "",
      period: "2022",
      description: "Collected and clustered university lecture reviews from KLUE based on content similarity and sentiment patterns.",
      highlights: [
        "Crawled and cleaned review data using BeautifulSoup.",
        "Applied KMeans clustering to organize similar lecture feedback.",
      ],
      tags: ["Python", "scikit-learn", "BeautifulSoup"],
    },
    {
      title: "Public Mask Inventory Mobile App",
      subtitle: "",
      period: "2020",
      description: "Developed a Kotlin-based Android application that visualized nearby mask stock levels using public APIs.",
      tags: ["Kotlin", "Android", "REST API"],
    },
    {
      title: "Deep Learning-based Missing Value Imputation for Air Quality Data",
      subtitle: "",
      period: "2019",
      description: "Conducted an advanced research project on imputing missing values in air quality and meteorological datasets to improve environmental monitoring reliability.",
      tags: ["Python", "PyTorch", "scikit-learn"],
    },
  ],
  otherExperience: [
    {
      title: "Military Service, Republic of Korea Air Force, 17th Fighter Wing",
      subtitle: "Information Systems Specialist",
      period: "Apr 2023 - Jan 2025",
      highlights: [
        "Managed and maintained the Air Force internal network and intranet systems (AFCCS).",
        "Operated and monitored mission-critical servers and communication infrastructure.",
        "Collaborated with IT officers to ensure cybersecurity compliance and system stability.",
      ],
    },
  ],
  skills: [
    {
      title: "Languages",
      description: "Python, C++, C, SQL, R, Kotlin",
    },
    {
      title: "ML / DL",
      description: "PyTorch, TensorFlow",
    },
    {
      title: "Certifications",
      description: "SQL Developer (SQLD), Craftsman Programming",
    },
  ],
  contact: {
    text: "",
    emailLabel: "",
    emailHref: "",
  },
};
