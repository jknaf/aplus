import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is a Vercel Serverless Function, which acts as a secure backend proxy.
// It will be accessible at the endpoint /api/chat when deployed.
// IMPORTANT: For this to work on Vercel, a package.json with "@google/genai" as a dependency is usually required.

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }
  
  // CORS Headers to allow requests from your own domain
  response.setHeader('Access-Control-Allow-Origin', '*'); // For development. For production, restrict to your domain: e.g., 'https://your-site.vercel.app'
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests for CORS
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Retrieve the API key securely from environment variables on the server
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error('API key is not configured on the server.');
    return response.status(500).json({ error: 'API key is not configured on the server.' });
  }

  try {
    const { contents, systemInstruction } = request.body;
    
    if (!contents || !systemInstruction) {
        return response.status(400).json({ error: 'Missing "contents" or "systemInstruction" in request body.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const geminiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
        }
    });

    const text = geminiResponse.text;
    
    return response.status(200).json({ text });

  } catch (error) {
    console.error('Error in Vercel function:', error);
    return response.status(500).json({ error: 'Failed to communicate with the Gemini API.' });
  }
}