
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The googleAI() plugin will automatically look for GOOGLE_API_KEY
// in the environment variables (e.g., from .env file)
// if 'apiKey' is not explicitly provided here.

// Determine the model name to use from .env or fallback to a default.
// AI_MODEL_ID from .env should be the plain model name, e.g., "gemini-1.5-flash-latest".
const modelName = process.env.AI_MODEL_ID || 'gemini-1.5-flash-latest';

// The 'model' field in genkit() config expects 'pluginProvider/modelName' format for strings.
const qualifiedModelName = `googleai/${modelName}`;

export const ai = genkit({
  plugins: [googleAI()],
  model: qualifiedModelName, // Use the fully qualified model name
});

