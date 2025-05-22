
'use server';
/**
 * @fileOverview A simple flow to check agent/Genkit liveness.
 *
 * - checkAgentLiveness - Returns a success status.
 * - AgentStatusOutput - The return type for the checkAgentLiveness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Renamed to avoid potential conflicts if it were defined elsewhere,
// and removed export. This schema is used internally for type inference.
const AgentStatusOutputSchema = z.object({
  status: z.enum(['ok', 'error']).describe("The liveness status of the agent's backend."),
  timestamp: z.string().describe("The ISO timestamp of when the status was checked."),
});
export type AgentStatusOutput = z.infer<typeof AgentStatusOutputSchema>;

export async function checkAgentLiveness(): Promise<AgentStatusOutput> {
  // This flow doesn't need to call an LLM,
  // its successful execution is enough to indicate liveness.
  // If Genkit server is down, this call itself will fail.
  try {
    await agentStatusFlow(); // Call the flow to ensure it's defined and reachable
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  } catch (e) {
    // console.error("Liveness check through flow failed:", e);
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
    };
  }
}

// Define a simple flow that just returns a static object.
// The purpose is just to have a callable flow.
const agentStatusFlow = ai.defineFlow(
  {
    name: 'agentStatusFlow',
    outputSchema: z.object({message: z.string()}), // Minimal output schema for this internal flow
  },
  async () => {
    return { message: "Agent backend is responsive." };
  }
);
