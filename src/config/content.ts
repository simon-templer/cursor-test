export const content = {
  hero: {
    name: "Hi, I'm John Doe",
    title: "Full Stack Developer",
    description: "I design and code beautifully simple things, and I love what I do. Just simple like that!",
    image: "/images/hero-image.jpg",
    resumeLink: "/downloads/resume_v1.pdf",
    downloadFilename: "John_Doe_Resume.pdf"
  },
  about: {
    title: "About Me",
    description: "I'm a passionate Full Stack Developer with a strong foundation in web technologies. I love creating beautiful and functional applications that solve real-world problems.",
    image: "/images/about-image.png"
  },
  skills: {
    title: "My Skills",
    items: [
      {
        name: "Frontend Development",
        description: "React, Next.js, TypeScript, HTML, CSS",
        icon: "💻"
      },
      {
        name: "Backend Development",
        description: "Node.js, Express, Python, Django",
        icon: "⚙️"
      },
      {
        name: "Database",
        description: "MongoDB, PostgreSQL, MySQL",
        icon: "🗄️"
      },
      {
        name: "DevOps",
        description: "Docker, AWS, CI/CD",
        icon: "🚀"
      }
    ]
  },
  projects: [
    {
      title: "E-Commerce Platform",
      timeframe: "Jan 2023 - Dec 2023",
      role: "Lead Fullstack Developer",
      description: "Developed a scalable e-commerce platform supporting thousands of concurrent users, with real-time inventory, payment integration, and an admin dashboard. Implemented authentication, product management, and order processing workflows.",
      technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Stripe API", "TailwindCSS"]
    },
    {
      title: "Project Management SaaS",
      timeframe: "Mar 2022 - Nov 2022",
      role: "Fullstack Developer",
      description: "Built a SaaS project management tool for teams, featuring kanban boards, real-time collaboration, notifications, and analytics. Focused on robust backend APIs, secure authentication, and a responsive UI.",
      technologies: ["React", "Next.js", "PostgreSQL", "Prisma", "Socket.io", "TypeScript", "Chakra UI"]
    },
    {
      title: "Social Media Analytics Dashboard",
      timeframe: "May 2021 - Feb 2022",
      role: "Fullstack Developer",
      description: "Created a dashboard for tracking and visualizing social media metrics across multiple platforms. Integrated third-party APIs, built custom data visualizations, and implemented user authentication and role-based access.",
      technologies: ["Vue.js", "Node.js", "Express", "D3.js", "MySQL", "JWT"]
    },
    {
      title: "Remote Learning Platform",
      timeframe: "Aug 2020 - Apr 2021",
      role: "Fullstack Developer",
      description: "Engineered a remote learning platform with live video classes, assignments, and student-teacher messaging. Focused on real-time features, secure file uploads, and a mobile-friendly interface.",
      technologies: ["React", "Next.js", "Firebase", "WebRTC", "Material-UI", "Cloud Functions"]
    }
  ],
  contact: {
    title: "Get In Touch",
    description: "Feel free to reach out to me for any questions or opportunities!",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA"
  }
} 