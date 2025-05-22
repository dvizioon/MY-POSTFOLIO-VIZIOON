import { NextResponse } from 'next/server';
import { skillsData } from '@/data/skills';
import type { SkillCategory } from '@/types/skills';

export async function GET() {
  // In a real app, you might fetch this from a DB or other source
  const skills: SkillCategory[] = skillsData;
  
  // Simulate a small delay like a real API call
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json(skills);
}
