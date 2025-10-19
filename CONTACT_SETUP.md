# Contact Form Setup Guide

## Environment Variables Required

Create a `.env` file in your project root with the following variables:

```
# Google Sheets Configuration (Required)
GOOGLE_SCRIPT_ID=your_google_apps_script_id_here

# EmailJS Configuration (Optional - for email notifications)
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
BUSINESS_EMAIL=your_email@example.com

# Server Configuration
PORT=3001
```

## Google Sheets Setup Instructions (Required)

1. **Create Google Sheet**:
   - Go to https://sheets.google.com
   - Create a new spreadsheet
   - Name it "AAKAR Contact Form Submissions"

2. **Create Google Apps Script**:
   - Go to https://script.google.com
   - Click "New Project"
   - Copy the code from `google-apps-script.js` file
   - Save the project with name "Contact Form Handler"

3. **Deploy as Web App**:
   - Click "Deploy" > "New Deployment"
   - Choose "Web app" as type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the Script ID and add it to your `.env` file

## EmailJS Setup Instructions (Optional)

1. **Create EmailJS Account**: Go to https://www.emailjs.com and create a free account
2. **Add Email Service**:
   - Go to Email Services and add Gmail/Outlook
   - Connect your email account
3. **Create Template**:
   - Go to Email Templates
   - Create new template using the template provided above
4. **Get Credentials**:
   - Copy Service ID, Template ID, and Public Key
   - Add them to your `.env` file

## Installation & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev:full
   ```
   This will start both the frontend (Vite) and backend (Express) servers.

3. **Or Run Separately**:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run server
   ```

## Features

- ✅ **100% FREE** - No paid services required
- ✅ **Google Sheets Integration** - All inquiries saved to spreadsheet
- ✅ **Email Notifications** (Optional) - Using EmailJS free tier
- ✅ **Professional contact form** with validation
- ✅ **Responsive design** with modern styling
- ✅ **Form validation** and error handling
- ✅ **Loading states** and success/error messages
- ✅ **Business hours** and contact information display
- ✅ **Easy Management** - View all inquiries in Google Sheets

## Google Sheets Columns

The spreadsheet will automatically create these columns:
1. **Timestamp** - When the inquiry was submitted
2. **Name** - Customer's full name
3. **Email** - Customer's email address
4. **Phone** - Customer's phone number
5. **Company** - Customer's company name
6. **Inquiry Type** - Type of inquiry (Quote, Support, etc.)
7. **Subject** - Message subject
8. **Message** - Full message content
9. **Status** - Inquiry status (New, In Progress, Completed)

## EmailJS Template (Optional)

If you want email notifications, use this template in EmailJS:

**Subject**: New Contact Form Submission: {{subject}}

**Body**:
```
New inquiry received from AAKAR MINERAL INDUSTRY website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Inquiry Type: {{inquiry_type}}
Subject: {{subject}}
Message: {{message}}
Timestamp: {{timestamp}}

Reply directly to: {{from_email}}
```

## Testing

Test the contact form by:
1. Filling out the form with valid information
2. Submitting the form
3. Checking your Google Sheet for the new entry
4. Verifying the form resets after successful submission
5. (Optional) Checking your email for notifications

## Benefits of This Solution

- **100% Free**: No monthly costs or usage limits
- **Easy Management**: All inquiries in one Google Sheet
- **Automatic Organization**: Timestamps and status tracking
- **Scalable**: Handles unlimited submissions
- **Reliable**: Google's infrastructure
- **Accessible**: View inquiries from anywhere
- **Exportable**: Download data as Excel/CSV
- **Collaborative**: Share sheet with team members

## Google Sheets Features

- **Auto-formatting**: Headers are styled and highlighted
- **Auto-resize**: Columns adjust to content
- **Status Tracking**: Mark inquiries as New/In Progress/Completed
- **Filtering**: Filter by date, inquiry type, status
- **Sorting**: Sort by any column
- **Search**: Find specific inquiries quickly
