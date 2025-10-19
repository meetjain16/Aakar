# Google Sheets Integration Troubleshooting Guide

## Common Issues & Solutions

### 1. **Script ID Not Working**

**Problem**: Data not appearing in spreadsheet
**Solution**: 
- Make sure you copied the correct Script ID from the deployment URL
- The Script ID should look like: `AKfycbx1234567890abcdefghijklmnopqrstuvwxyz`
- It's NOT the project ID or the script URL

### 2. **Wrong Sheet Selected**

**Problem**: Script running but data going to wrong sheet
**Solution**:
- Make sure you're looking at the correct Google Sheet
- The script uses `SpreadsheetApp.getActiveSheet()` which refers to the first sheet
- If you have multiple sheets, make sure the first sheet is the one you want to use

### 3. **Permission Issues**

**Problem**: Script deployment fails or doesn't work
**Solution**:
- When deploying, set "Execute as" to "Me"
- Set "Who has access" to "Anyone"
- Make sure you're logged into the correct Google account

### 4. **CORS Issues**

**Problem**: Browser blocking the request
**Solution**:
- The script should handle CORS automatically
- Try testing with a different browser
- Check browser console for errors

## Step-by-Step Debugging

### Step 1: Test the Script Directly

1. **Go to your Google Apps Script project**
2. **Click "Run" on the `doGet` function**
3. **Check if it returns**: `{"message":"Contact Form API is running"}`
4. **If it fails**, check the execution log for errors

### Step 2: Test the Deployment URL

1. **Copy your deployment URL**
2. **Open it in a new browser tab**
3. **You should see**: `{"message":"Contact Form API is running"}`
4. **If you get an error**, redeploy the script

### Step 3: Check Your .env File

Make sure your `.env` file has the correct Script ID:

```env
GOOGLE_SCRIPT_ID=AKfycbx1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 4: Test the Form Submission

1. **Open browser developer tools** (F12)
2. **Go to Network tab**
3. **Submit the contact form**
4. **Look for the API call** to `/api/contact`
5. **Check the response** - should be `{"success": true}`

### Step 5: Check Server Logs

1. **Look at your server console** (where you ran `npm run server`)
2. **Look for any error messages**
3. **Check if the request is reaching the server**

## Improved Google Apps Script

Here's an improved version with better error handling:

```javascript
// Improved Google Apps Script with better error handling
function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received request:', e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addRow') {
      const sheet = SpreadsheetApp.getActiveSheet();
      
      // Log sheet info for debugging
      console.log('Sheet name:', sheet.getName());
      console.log('Last row before:', sheet.getLastRow());
      
      // Add headers if sheet is empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Timestamp',
          'Name',
          'Email',
          'Phone',
          'Company',
          'Inquiry Type',
          'Subject',
          'Message',
          'Status'
        ]);
        
        // Format headers
        const headerRange = sheet.getRange(1, 1, 1, 9);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#8b5cf6');
        headerRange.setFontColor('white');
      }
      
      // Add the new row
      sheet.appendRow(data.data);
      
      // Log success
      console.log('Row added successfully. Last row after:', sheet.getLastRow());
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, 9);
      
      // Format the new row
      const lastRow = sheet.getLastRow();
      const newRowRange = sheet.getRange(lastRow, 1, 1, 9);
      newRowRange.setBorder(true, true, true, true, true, true);
      
      // Highlight new submissions
      if (lastRow % 2 === 0) {
        newRowRange.setBackground('#f8f9fa');
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          message: 'Data added successfully',
          rowNumber: lastRow 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString(),
        message: 'Script execution failed' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'Contact Form API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to manually add a row
function testAddRow() {
  const testData = [
    new Date().toLocaleString(),
    'Test User',
    'test@example.com',
    '1234567890',
    'Test Company',
    'Test Inquiry',
    'Test Subject',
    'This is a test message',
    'New'
  ];
  
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(testData);
  console.log('Test row added');
}
```

## Quick Fix Checklist

- [ ] **Script ID is correct** in .env file
- [ ] **Script is deployed** as web app with "Anyone" access
- [ ] **Google Sheet is open** and accessible
- [ ] **Server is running** (`npm run server`)
- [ ] **No browser console errors**
- [ ] **Network request is successful**
- [ ] **Sheet permissions** allow the script to write

## Alternative: Manual Testing

If the automatic integration isn't working, you can test manually:

1. **Run the `testAddRow` function** in Google Apps Script
2. **Check if data appears** in your sheet
3. **If it works**, the issue is with the API integration
4. **If it doesn't work**, the issue is with the script or sheet permissions
