
'use server';
/**
 * @fileOverview A simple AI agent for the DVIION portfolio.
 *
 * - askDvizioonAgent - A function that handles user interaction with the agent.
 * - DvizioonAgentInput - The input type for the askDvizioonAgent function.
 * - DvizioonAgentOutput - The return type for the askDvizioonAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { projects as projectData } from '@/data/projects'; // Import project data
import type { Project } from '@/types/project';

const DvizioonAgentInputSchema = z.object({
  userMessage: z.string().describe('The message from the user to the agent.'),
  currentLanguage: z.enum(['pt', 'en']).describe('The current language setting of the website (pt or en). The agent should respond in this language.'),
});
export type DvizioonAgentInput = z.infer<typeof DvizioonAgentInputSchema>;

const DvizioonAgentOutputSchema = z.object({
  agentResponse: z.string().describe('The agent\'s response to the user in Markdown format and in the specified currentLanguage.'),
});
export type DvizioonAgentOutput = z.infer<typeof DvizioonAgentOutputSchema>;

// Schema for the project details tool
const ProjectDetailsToolInputSchema = z.object({
  projectName: z.string().describe("The name of the project the user is asking about. Try to match it closely with project titles available if the user provides a partial name."),
});

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().describe("A detailed description of the project."),
  imageUrl: z.string(),
  dataAiHint: z.string(),
  link: z.string().optional().describe("URL to the live demo of the project, if available."),
  repositoryUrl: z.string().optional().describe("URL to the source code repository (e.g., GitHub), if available."),
  technologies: z.array(z.string()).optional().describe("A list of technologies used in the project."),
  createdAt: z.string().describe("The creation date of the project in YYYY-MM-DD format."),
});

const ProjectDetailsToolOutputSchema = z.object({
  found: z.boolean().describe("Whether the project was found."),
  details: ProjectSchema.optional().describe("The details of the project if found. Includes title, description, technologies, links, and creation date."),
  message: z.string().optional().describe("A message if the project was not found or other relevant info, like if a partial match was found."),
});

// Tool to get project details
const getProjectDetailsTool = ai.defineTool(
  {
    name: 'getProjectDetailsTool',
    description: 'Fetches details for a specific project from the portfolio if the user asks about one. Use this to provide comprehensive information about a project.',
    inputSchema: ProjectDetailsToolInputSchema,
    outputSchema: ProjectDetailsToolOutputSchema,
  },
  async (input) => {
    const projectNameToFind = input.projectName.toLowerCase().trim();
    const project = projectData.find(p => p.title.toLowerCase().trim() === projectNameToFind);

    if (project) {
      return {
        found: true,
        details: project,
      };
    } else {
      // Try a partial match if no exact match
      const partialMatch = projectData.find(p => p.title.toLowerCase().includes(projectNameToFind));
      if (partialMatch) {
        return {
          found: true,
          details: partialMatch,
          message: `Found a close match: ${partialMatch.title}.` // Provide feedback about partial match
        }
      }
      return {
        found: false,
        message: `I couldn't find specific details for a project titled "${input.projectName}". You can see all available projects in the portfolio section.`,
      };
    }
  }
);


export async function askDvizioonAgent(input: DvizioonAgentInput): Promise<DvizioonAgentOutput> {
  return dvizioonAgentFlow(input);
}

const dvizioonPrompt = ai.definePrompt({
  name: 'dvizioonAgentPrompt',
  input: {schema: DvizioonAgentInputSchema},
  output: {schema: DvizioonAgentOutputSchema},
  tools: [getProjectDetailsTool],
  prompt: `You are Vizioon, a friendly and helpful AI assistant for the DVIION Technology portfolio website.
Your creator is Daniel Estevão Martins Mendes, also known as Dvizioon. This portfolio and you were built with Next.js, Three.js, ShadCN UI, Tailwind CSS and Genkit. You were "made in n8n" conceptually.
Keep your responses concise, informative, and engaging. Respond in Markdown format.
ALWAYS respond in the language specified by 'currentLanguage': '{{currentLanguage}}'.

You can talk about Daniel's skills (C++, C#, Node.js, TypeScript, PHP, Python, Flask, Django, Genkit, etc.), his projects, or general tech topics.
If asked about Daniel, highlight his dedication and passion for backend development and innovative solutions.

If the user asks about a specific project by name (even if misspelled or partial), use the 'getProjectDetailsTool' to find more details about it.
When the tool returns 'found: true':
  - Present the project's title, its description, and the technologies used.
  - If the project has a live link ('details.link'), state: "You can check out a live demo here: [link]".
  - If the project has a repository URL ('details.repositoryUrl'), state: "The source code is available at: [repositoryUrl]".
  - If the tool also provides a 'message' in its output (e.g., "Found a close match: Actual Project Title."), you can inform the user, for example: "I found a close match for your query: 'Actual Project Title'. Here are its details: ..." and then proceed with the details.
  - Adapt all information to the '{{currentLanguage}}'.

When the tool returns 'found: false':
  - Use the 'message' field from the tool's output to inform the user politely that the project was not found, for example: "I couldn't find specific details for a project titled 'XYZ'. You can see all available projects in the portfolio section." Make sure this message is also in '{{currentLanguage}}'.

User's message: {{{userMessage}}}

Agent's response (in {{currentLanguage}} and Markdown):`,
});

const dvizioonAgentFlow = ai.defineFlow(
  {
    name: 'dvizioonAgentFlow',
    inputSchema: DvizioonAgentInputSchema,
    outputSchema: DvizioonAgentOutputSchema,
  },
  async (input) => {
    const {output} = await dvizioonPrompt(input);
    if (!output) {
      const errorMessage = input.currentLanguage === 'pt' ? 
        "Desculpe, não consegui processar isso. Você pode tentar reformular?" :
        "I'm sorry, I couldn't process that. Can you try rephrasing?";
      return { agentResponse: errorMessage };
    }
    return output;
  }
);
