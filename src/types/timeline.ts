
import type { LucideProps } from 'lucide-react'; // More specific type for Lucide icons
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Define a type for Lucide icon components
export type LucideIconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export interface TimelineEvent {
  id: string;
  dateKey: string; // Key for translated date string
  titleKey: string; // Key for translated title
  descriptionKey: string; // Key for translated description
  iconName?: keyof typeof import('lucide-react'); // Strongly type icon names
  iconBgColor?: string; // Tailwind class for icon background, e.g., 'bg-primary/20'
  tags?: string[]; // Array of tag keys for translation or direct display
}
