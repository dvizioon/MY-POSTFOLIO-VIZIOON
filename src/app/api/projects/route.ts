
import { NextResponse } from 'next/server';
import { projects as projectData } from '@/data/projects';
import type { Project } from '@/types/project';

export async function GET() {
  // In a real app, you might fetch this from a DB or other source
  // For now, we're returning the static data
  const projects: Project[] = projectData;
  
  // Simulate a small delay like a real API call
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(projects);
}
