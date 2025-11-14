import type { VercelRequest, VercelResponse } from '@vercel/node';

// A simple email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // CORS Headers
  response.setHeader('Access-Control-Allow-Origin', '*'); 
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email } = request.body;

    if (!email || typeof email !== 'string') {
        return response.status(400).json({ error: 'E-Mail-Adresse ist erforderlich.' });
    }

    if (!isValidEmail(email)) {
        return response.status(400).json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' });
    }

    // In a real application, you would add the email to a mailing list,
    // trigger an email sending service (e.g., SendGrid, Mailgun), etc.
    // For this example, we just log it and return success.
    console.log(`Brochure request received for: ${email}`);
    
    // Simulate a short delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return response.status(200).json({ message: 'Brochure request processed successfully.' });

  } catch (error) {
    console.error('Error in /api/brochure:', error);
    return response.status(500).json({ error: 'Serverfehler. Bitte versuchen Sie es später erneut.' });
  }
}
