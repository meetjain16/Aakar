# Environment Variables Setup Guide

## Step 1: Create .env File

Create a file named `.env` in your project root directory (same level as package.json):

```
C:\Users\MEET JAIN\Desktop\Code\MERN webdev\AakarMinerals\.env
```

## Step 2: Add Required Variables

Copy and paste this content into your `.env` file:

```env
# Contact Form Configuration

# ===========================================
# REQUIRED: Google Sheets Integration
# ===========================================
# Get this from Google Apps Script deployment
GOOGLE_SCRIPT_ID=your_google_apps_script_id_here

# ===========================================
# OPTIONAL: Email Notifications (EmailJS)
# ===========================================
# Only add these if you want email notifications
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
BUSINESS_EMAIL=your_email@example.com

# ===========================================
# SERVER CONFIGURATION
# ===========================================
PORT=3001
```

## Step 3: Get Google Script ID

1. **Go to Google Apps Script**: https://script.google.com
2. **Create New Project**
3. **Copy the code** from `google-apps-script.js` file
4. **Save** the project
5. **Deploy** > **New Deployment**
6. **Choose "Web app"**
7. **Set permissions**:
   - Execute as: "Me"
   - Who has access: "Anyone"
8. **Click Deploy**
9. **Copy the Script ID** from the deployment URL
10. **Replace** `your_google_apps_script_id_here` in your `.env` file

## Step 4: Optional Email Setup (EmailJS)

If you want email notifications:

1. **Go to EmailJS**: https://www.emailjs.com
2. **Create free account**
3. **Add Email Service** (Gmail/Outlook)
4. **Create Email Template**
5. **Get credentials** and replace the placeholder values

## Step 5: Example with Real Values

Here's what your `.env` file should look like with real values:

```env
# Contact Form Configuration

# Google Sheets Integration (REQUIRED)
GOOGLE_SCRIPT_ID=AKfycbx1234567890abcdefghijklmnopqrstuvwxyz

# Email Notifications (OPTIONAL)
EMAILJS_SERVICE_ID=service_1234567
EMAILJS_TEMPLATE_ID=template_abcdefg
EMAILJS_PUBLIC_KEY=user_1234567890abcdef
BUSINESS_EMAIL=meet@aakarmineral.com

# Server Configuration
PORT=3001
```

## Important Notes

- **Never commit .env file** to version control
- **Keep your Script ID private** - don't share it publicly
- **Google Script ID is required** - form won't work without it
- **EmailJS is optional** - form will still work without email notifications
- **Restart your server** after changing .env file

## File Structure

Your project should look like this:

```
AakarMinerals/
├── .env                    ← Create this file here
├── package.json
├── server.js
├── src/
│   ├── components/
│   │   └── ContactSection.tsx
│   └── ...
└── google-apps-script.js
```

## Testing

After setting up the .env file:

1. **Start the server**: `npm run server`
2. **Test the form** on your website
3. **Check Google Sheets** for new entries
4. **Verify** the Script ID is working correctly
