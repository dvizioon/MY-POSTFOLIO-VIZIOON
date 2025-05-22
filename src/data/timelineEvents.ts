
import type { TimelineEvent } from '@/types/timeline';

export const timelineEventsData: TimelineEvent[] = [
  {
    id: '1',
    dateKey: 'timeline.event1.date',
    titleKey: 'timeline.event1.title',
    descriptionKey: 'timeline.event1.description',
    iconName: 'Milestone',
    iconBgColor: 'bg-primary', // Changed to solid primary
    tags: ['Dev', 'Learning', 'Self-Taught'],
  },
  {
    id: '2',
    dateKey: 'timeline.event2.date',
    titleKey: 'timeline.event2.title',
    descriptionKey: 'timeline.event2.description',
    iconName: 'Rocket',
    iconBgColor: 'bg-accent', // Changed to solid accent
    tags: ['Launch', 'PortfolioV1', 'PHP'],
  },
  {
    id: '3',
    dateKey: 'timeline.event3.date',
    titleKey: 'timeline.event3.title',
    descriptionKey: 'timeline.event3.description',
    iconName: 'Lightbulb',
    iconBgColor: 'bg-secondary', // Changed to solid secondary
    tags: ['AI', 'Genkit', 'NextJS', 'Freelance'],
  },
  {
    id: '4',
    dateKey: 'timeline.event4.date',
    titleKey: 'timeline.event4.title',
    descriptionKey: 'timeline.event4.description',
    iconName: 'Award',
    iconBgColor: 'bg-primary', // Changed to solid primary (can vary per event)
    tags: ['Challenge', 'Recognition'],
  },
];

