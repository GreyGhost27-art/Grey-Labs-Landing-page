const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { name, email, message, honeypot } = JSON.parse(event.body);

    // Honeypot spam protection
    if (honeypot) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      };
    }

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Prepare email content
    const emailParams = {
      Source: process.env.FROM_EMAIL || 'noreply@greys-studio.com',
      Destination: {
        ToAddresses: [process.env.TO_EMAIL || 'ashwingrey.office@gmail.com'],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0a0a0a; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                <div style="background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                <p style="color: #8a8a8a; font-size: 14px;">
                  This message was sent from the Grey's Studio portfolio contact form.
                </p>
              </div>
            `,
            Charset: 'UTF-8',
          },
          Text: {
            Data: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

This message was sent from the Grey's Studio portfolio contact form.
            `,
            Charset: 'UTF-8',
          },
        },
      },
    };

    // Send email
    await sesClient.send(new SendEmailCommand(emailParams));

    // Log submission (optional)
    console.log(`Contact form submission from ${name} (${email})`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      }),
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error. Please try again later.' 
      }),
    };
  }
};
