export const profile = {
  name: "Piyush Mandal",
  email: "piyushmandal0018@gmail.com",
  phone: "+91 98356 12855",
  github: "https://github.com/piyush-0018",
  linkedin: "https://www.linkedin.com/in/piyush-mandal-5b9b44261/",
  portrait: "/piyush-portrait.png",
};

export const skillSyncUrl = "https://skillsync-piyush.onrender.com/interviews";

export const projects = [
  {
    name: "SkillSync",
    url: skillSyncUrl,
    linkLabel: "Open SkillSync",
    category: "Full-stack & AI",
    status: "Completed",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React.js",
      "REST APIs",
      "AI/LLM APIs",
    ],
    description:
      "A full-stack career-preparation platform for résumé analysis, job matching and mock interviews.",
    detail:
      "Includes a career assistant grounded in résumé and job data, saved skill-gap comparisons, and spoken video interview practice.",
  },
  {
    name: "Health Care Website",
    url: null,
    linkLabel: null,
    category: "Full-stack development",
    status: null,
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    description:
      "A responsive healthcare platform featuring doctor profiles, appointment booking, patient records and feedback.",
    detail:
      "Implemented backend functionality for user authentication, data validation and secure access control.",
  },
  {
    name: "YouTube Clone",
    url: null,
    linkLabel: null,
    category: "Web development",
    status: null,
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "React Router",
      "Node.js",
      "Express.js",
    ],
    description:
      "A responsive YouTube-style interface built with Flexbox, CSS Grid and media queries.",
    detail:
      "Used React Router for client-side navigation and structured the interface with reusable components.",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript"],
  "Web development": ["HTML5", "CSS3", "React.js", "FastAPI", "REST APIs"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB"],
  "Core CS": ["Object-Oriented Programming", "Data Structures & Algorithms"],
  AI: ["LLM APIs", "Prompt Engineering", "AI Application Development"],
  "Tools & workflow": ["Git", "GitHub", "VS Code", "Agile & Scrum Basics"],
};

export const achievements = [
  {
    title: "AIMA SMG",
    detail: "3rd at State Level · National Runner-Up",
    date: "March 2026",
  },
  { title: "RIT College Hackathon", detail: "Runner-Up", date: "April 2025" },
];

export const certifications = [
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia · Forage",
    date: "July 2025",
  },
  { title: "MongoDB Aggregation", issuer: "MongoDB", date: "March 2024" },
  {
    title: "C Programming",
    issuer: "Spoken Tutorial Project, IIT Bombay",
    date: null,
  },
  { title: "Web Development Boot Camp", issuer: "Explorin", date: null },
];

export const facts = {
  summary:
    "Piyush Mandal is a Computer Science undergraduate with practical experience in frontend and full-stack development. He works with Python, JavaScript, React.js and REST APIs, with working knowledge of PostgreSQL, MongoDB and AI/LLM integration.",
  projects:
    "His projects include SkillSync, a completed AI-oriented full-stack platform; a Health Care Website; and a YouTube Clone.",
  skills:
    "His languages are Python, Java, C++, C, JavaScript and TypeScript. His web and database skills include HTML5, CSS3, React.js, FastAPI, REST APIs, PostgreSQL, MySQL and MongoDB. He also works with LLM APIs and prompt engineering, and has a foundation in OOP and Data Structures & Algorithms.",
  skillsync: `SkillSync is a completed full-stack career-preparation platform built with Python, FastAPI, PostgreSQL, React.js and AI/LLM APIs. It supports résumé analysis, job matching, a career assistant grounded in user data, and spoken video mock interviews. Open SkillSync: ${skillSyncUrl}.`,
  healthcare:
    "His Health Care Website uses React.js, Node.js, Express.js and MongoDB. It includes doctor profiles, appointment booking, patient records and feedback, with backend authentication, data validation and secure access control.",
  youtube:
    "His YouTube Clone is a responsive video-platform interface using HTML5, CSS3, JavaScript, React.js, React Router, Node.js and Express.js. He used Flexbox, CSS Grid and media queries, and built reusable components with client-side routing.",
  experience:
    "Piyush was a remote Web Development Intern at CodSoft in 2025. He worked on responsive HTML, CSS and JavaScript interfaces, refined reusable UI structures, and used Git-based workflows for version control and project organization.",
  education:
    "He is pursuing a B.Tech in Computer Science & Engineering at Roorkee Institute of Technology, from August 2023 to June 2027.",
  achievements:
    "In March 2026, Piyush ranked 3rd at State Level and finished Runner-Up nationally in AIMA SMG. He was also Runner-Up at the RIT College Hackathon in April 2025.",
  certifications:
    "His certifications include the Deloitte Australia Data Analytics Job Simulation through Forage (July 2025), MongoDB Aggregation (March 2024), C Programming from the Spoken Tutorial Project at IIT Bombay, and Explorin’s Web Development Boot Camp.",
  contact: `You can reach Piyush at ${profile.email} or ${profile.phone}. His GitHub is ${profile.github} and his LinkedIn is ${profile.linkedin}.`,
  location:
    "Piyush is from Dhanbad, Jharkhand, India. He studies at Roorkee Institute of Technology in Roorkee, Uttarakhand.",
  workflow:
    "Piyush uses Git, GitHub and VS Code. His résumé lists Agile & Scrum Basics, Object-Oriented Programming, and Data Structures & Algorithms.",
};
export const unknownAnswer = `I don’t have that information in Piyush’s résumé. Please contact him at ${profile.email} or through LinkedIn for more details.`;
