import type { SkillCategory } from '@/types/skills';

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    titleKey: 'skills.categories.frontend', // Corresponds to translation key
    iconName: 'LayoutDashboard',
    skills: ["HTML5", "CSS3", "JavaScript", "JQuery", "Bootstrap", "TailwindCSS", "React", "Material UI", "Vue", "TypeScript", "Figma"],
  },
  {
    id: 'backend',
    titleKey: 'skills.categories.backend',
    iconName: 'Database',
    skills: ["Node.js", "Express", "PHP", "MySQL", "PostgreSQL", "Firebase", "Python", "Flask", "C++", "C#"],
  },
  {
    id: 'toolsAndConcepts',
    titleKey: 'skills.categories.toolsAndConcepts',
    iconName: 'Wrench',
    skills: ["Git", "Docker", "CI/CD", "Linux", "Google Cloud", "n8n", "Illustrator", "Metodologias Ágeis"],
  },
  {
    id: 'aiGenAi',
    titleKey: 'skills.categories.aiGenAi',
    iconName: 'Brain',
    skills: ["Genkit", "Prompt Engineering", "LLMs (Conceitos)", "Google AI Studio"],
  }
];
