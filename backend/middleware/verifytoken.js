// backend/middleware/verifyToken.js
const admin = require('../firebaseAdmin');

const ALLOWED_EMAIL_DOMAINS = ['iiits.in'];

// Test user emails that bypass domain check (add client test emails here)
const TEST_USER_EMAILS = [
  'chirag@ghost.collab.in',
  'test@ghost.collab.in'
  // Add more test emails here as needed
];

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Enforce allowed email domains (server-side)
    const email = (decodedToken.email || '').toLowerCase();
    
    // Check if user is a test user (bypass domain check) or has allowed domain
    const isTestUser = TEST_USER_EMAILS.includes(email);
    const isAllowedDomain = ALLOWED_EMAIL_DOMAINS.some((d) => email.endsWith(`@${d}`));
    
    if (!isTestUser && !isAllowedDomain) {
      return res.status(403).json({
        success: false,
        message: `Only ${ALLOWED_EMAIL_DOMAINS.join(' / ')} emails are allowed`,
      });
    }

    req.user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

module.exports = verifyToken;