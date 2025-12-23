import { db } from './index';
import { projects, experiences, achievements } from './schema';

const seed = async () => {
  console.log('Seeding database...');

  // Projects
  await db.insert(projects).values([
    {
      title: 'Analytics Dashboard',
      description: 'A comprehensive data visualization platform with real-time analytics and intuitive user interface.',
      image: '/assets/project-1.jpg',
      tags: ['React', 'TypeScript', 'D3.js'],
      link: '#',
    },
    {
      title: 'Luxury E-Commerce',
      description: 'Premium shopping experience for high-end fashion brands with seamless checkout flow.',
      image: '/assets/project-2.jpg',
      tags: ['Next.js', 'Stripe', 'Prisma'],
      link: '#',
    },
    {
      title: 'Creative Agency',
      description: 'Bold and expressive portfolio website featuring dynamic animations and immersive storytelling.',
      image: '/assets/project-3.jpg',
      tags: ['React', 'GSAP', 'Three.js'],
      link: '#',
    },
  ]);

  // Experiences
  await db.insert(experiences).values([
    {
      year: '2023',
      command: 'senior-developer',
      title: 'Senior Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      description: 'Leading frontend architecture and mentoring junior developers. Building scalable design systems and driving technical decisions across multiple product teams.',
      output: [
        'Led team of 8 engineers',
        'Shipped 12 major features',
        'Reduced load time by 40%',
      ],
      skills: ['React', 'TypeScript', 'System Design', 'Leadership'],
    },
    {
      year: '2022',
      command: 'lead-engineer',
      title: 'Lead Engineer',
      company: 'Digital Products Co.',
      location: 'New York, NY',
      description: 'Spearheaded product development for fintech solutions. Managed cross-functional teams and delivered enterprise-grade applications.',
      output: [
        'Managed $2M project budget',
        'Built payment processing system',
        'Achieved 99.9% uptime',
      ],
      skills: ['Node.js', 'AWS', 'PostgreSQL', 'Team Lead'],
    },
    {
      year: '2021',
      command: 'fullstack-dev',
      title: 'Full Stack Developer',
      company: 'Digital Agency Co.',
      location: 'Austin, TX',
      description: 'Built scalable applications for enterprise clients. Implemented CI/CD pipelines and optimized database performance for high-traffic systems.',
      output: [
        'Delivered 20+ client projects',
        'Automated deployment pipeline',
        'Improved API response by 60%',
      ],
      skills: ['Full Stack', 'Docker', 'CI/CD', 'MongoDB'],
    },
    {
      year: '2019',
      command: 'frontend-dev',
      title: 'Frontend Developer',
      company: 'Startup Labs',
      location: 'Remote',
      description: 'Developed user interfaces for early-stage products. Collaborated closely with designers to ship pixel-perfect, accessible experiences.',
      output: [
        'Built 5 MVPs from scratch',
        'Established component library',
        'Improved accessibility score to 98',
      ],
      skills: ['React', 'CSS', 'Figma', 'A11y'],
    },
    {
      year: '2018',
      command: 'init',
      title: 'Junior Developer',
      company: 'Web Solutions',
      location: 'Boston, MA',
      description: 'Started journey in web development and design. Learned fundamentals of modern JavaScript, responsive design, and version control.',
      output: [
        'Completed 100+ code reviews',
        'First production deployment',
        'Mentored by senior engineers',
      ],
      skills: ['JavaScript', 'HTML/CSS', 'Git', 'Agile'],
    },
  ]);

  // Achievements
  await db.insert(achievements).values([
    {
      title: "1st Place Hackathon",
      event: "National Space Code 2023",
      description: "Secured the top spot in the National Space Code Hackathon by developing an innovative cargo tracking algorithm.",
      date: "2023-11-15",
      image: '/assets/project-1.jpg',
      rank: "Winner",
      tier: "gold"
    },
    {
      title: "Best UI/UX Design",
      event: "Interstellar Design Challenge",
      description: "Awarded for creating the most intuitive and accessible navigation interface for courier drones.",
      date: "2023-08-20",
      image: '/assets/project-2.jpg',
      rank: "Special Award",
      tier: "special"
    },
    {
      title: "Algorithm Finalist",
      event: "Galactic Optimization Cup",
      description: "Reached the final round in a competitive algorithm contest focused on fuel efficiency and route planning.",
      date: "2024-01-10",
      image: '/assets/project-3.jpg',
      rank: "Top 10 Finalist",
      tier: "bronze"
    },
    {
      title: "Open Source Hero",
      event: "GitHub Universe",
      description: "Recognized for significant contributions to open source space navigation libraries.",
      date: "2024-02-15",
      image: '/assets/project-1.jpg',
      rank: "Community Choice",
      tier: "special"
    },
    {
      title: "Fastest Deployment",
      event: "DevOps Speed Run",
      description: "Set a new record for automated deployment pipelines in a zero-gravity simulation environment.",
      date: "2024-03-01",
      image: '/assets/project-2.jpg',
      rank: "Speed Record",
      tier: "silver"
    },
    {
      title: "Security Guardian",
      event: "Cyber Defense Initiative",
      description: "Identified and patched critical vulnerabilities in the station's communication protocols.",
      date: "2024-04-12",
      image: '/assets/project-3.jpg',
      rank: "Security Award",
      tier: "silver"
    },
  ]);

  console.log('Seeding completed!');
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
