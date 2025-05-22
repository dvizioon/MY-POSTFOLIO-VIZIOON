import type { LucideIcon } from 'lucide-react';

// Define a type for Lucide icon names that we expect to use
// This helps with type safety when mapping string names to components.
// Add more icon names here as needed for your skills categories.
export type SkillCategoryIconName = 
  | 'LayoutDashboard' 
  | 'Database' 
  | 'Wrench' 
  | 'Brain'
  | 'Code'; // Example, if you had a 'Code' icon

export interface Skill {
  name: string;
  // Add more properties to a skill if needed, e.g., proficiency level
}

export interface SkillCategory {
  id: string; // Unique ID for the category
  titleKey: string; // Key for translated category title (e.g., "skills.categories.frontend")
  iconName: SkillCategoryIconName; // Name of the Lucide icon
  skills: string[]; // Array of skill names
}
