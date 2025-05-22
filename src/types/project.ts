
export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  link?: string; // Live demo link
  repositoryUrl?: string; // Link to code repository
  technologies?: string[]; // Technologies used
  createdAt: string; // Format: YYYY-MM-DD - Made non-optional for heatmap
};
