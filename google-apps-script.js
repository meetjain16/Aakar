// Improved Google Apps Script for Contact Form Integration
// Copy this code to Google Apps Script: https://script.google.com/

// Put your spreadsheet ID here (from the URL)
const SPREADSHEET_ID = '1437EqUsPyVg5AZsE0ozuLL1FKpybNK2N1VJpTAs7_xM';

function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received request:', e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addRow') {
      // Open spreadsheet by ID (works whether this script is bound or standalone)
      const ss = SpreadsheetApp.openById(data.spreadsheetId || SPREADSHEET_ID);
      // Choose sheet by name if provided, otherwise default to first sheet
      const sheetName = data.sheetName || 'Sheet1';
      let sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        // fallback to first sheet
        sheet = ss.getSheets()[0];
      }

      // Log sheet info for debugging
      console.log('Spreadsheet ID used:', ss.getId());
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
  // If data.data is an object, convert to array in expected column order
  const rowToAppend = Array.isArray(data.data) ? data.data : [new Date().toLocaleString(), data.data.name || '', data.data.email || '', data.data.phone || '', data.data.company || '', data.data.inquiryType || '', data.data.subject || '', data.data.message || '', data.data.status || 'New'];
  sheet.appendRow(rowToAppend);
      
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
  
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Sheet1');
  if (!sheet) sheet = ss.getSheets()[0];
  sheet.appendRow(testData);
  console.log('Test row added');
}

// Sheet Checker Function - Run this to verify everything is working
function checkSheetSetup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('Sheet1');
    if (!sheet) sheet = spreadsheet.getSheets()[0];
    
    console.log('=== SHEET SETUP CHECKER ===');
    console.log('Spreadsheet Name:', spreadsheet.getName());
    console.log('Spreadsheet ID:', spreadsheet.getId());
    console.log('Sheet Name:', sheet.getName());
    console.log('Sheet ID:', sheet.getSheetId());
    console.log('Total Rows:', sheet.getLastRow());
    console.log('Total Columns:', sheet.getLastColumn());
    
    // Check if headers exist
    if (sheet.getLastRow() > 0) {
      const headerRange = sheet.getRange(1, 1, 1, 9);
      const headers = headerRange.getValues()[0];
      console.log('Current Headers:', headers);
      
      const expectedHeaders = [
        'Timestamp', 'Name', 'Email', 'Phone', 'Company', 
        'Inquiry Type', 'Subject', 'Message', 'Status'
      ];
      
      const headersMatch = JSON.stringify(headers) === JSON.stringify(expectedHeaders);
      console.log('Headers Match Expected:', headersMatch);
      
      if (!headersMatch) {
        console.log('Expected Headers:', expectedHeaders);
        console.log('WARNING: Headers do not match expected format!');
      }
    } else {
      console.log('Sheet is empty - headers will be created on first submission');
    }
    
    // Test write permission
    try {
      const testCell = sheet.getRange('A1');
      const originalValue = testCell.getValue();
      testCell.setValue('TEST_WRITE');
      testCell.setValue(originalValue);
      console.log('Write Permission: ✅ SUCCESS');
    } catch (writeError) {
      console.log('Write Permission: ❌ FAILED -', writeError.toString());
    }
    
    // Check sheet permissions
  const editors = spreadsheet.getEditors ? spreadsheet.getEditors() : [];
  const viewers = spreadsheet.getViewers ? spreadsheet.getViewers() : [];
    console.log('Editors:', editors.map(e => e.getEmail()));
    console.log('Viewers:', viewers.map(v => v.getEmail()));
    
    console.log('=== CHECKER COMPLETE ===');
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      sheetName: sheet.getName(),
      totalRows: sheet.getLastRow(),
      totalColumns: sheet.getLastColumn(),
      hasHeaders: sheet.getLastRow() > 0,
      writePermission: true
    };
    
  } catch (error) {
    console.error('Checker Error:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Function to verify the correct sheet is selected
function verifyCorrectSheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (!spreadsheet) {
      console.log('=== SHEET VERIFICATION ===');
      console.log('❌ ERROR: No active spreadsheet found!');
      console.log('');
      console.log('🔧 SOLUTION:');
      console.log('1. Open your Google Sheet first');
      console.log('2. Then run this script from the sheet');
      console.log('3. Or use the spreadsheet ID method (see below)');
      console.log('');
      console.log('📋 Alternative: Use verifySheetById() function with your spreadsheet ID');
      console.log('=== VERIFICATION COMPLETE ===');
      
      return {
        success: false,
        error: 'No active spreadsheet found',
        solution: 'Open your Google Sheet first, then run the script'
      };
    }
    
    const sheet = SpreadsheetApp.getActiveSheet();
    
    console.log('=== SHEET VERIFICATION ===');
    console.log('You are currently working with:');
    console.log('📊 Spreadsheet:', spreadsheet.getName());
    console.log('📋 Sheet:', sheet.getName());
    console.log('🔗 Spreadsheet URL:', spreadsheet.getUrl());
    
    // Check if this looks like the right sheet
    const spreadsheetName = spreadsheet.getName().toLowerCase();
    const sheetName = sheet.getName().toLowerCase();
    
    const isLikelyCorrect = 
      spreadsheetName.includes('contact') || 
      spreadsheetName.includes('aakar') ||
      spreadsheetName.includes('mineral') ||
      sheetName.includes('contact') ||
      sheetName.includes('form');
    
    if (isLikelyCorrect) {
      console.log('✅ This appears to be the correct sheet for contact form submissions');
    } else {
      console.log('⚠️  WARNING: This might not be the correct sheet!');
      console.log('Make sure you are in the sheet where you want contact form data to appear');
    }
    
    console.log('=== VERIFICATION COMPLETE ===');
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      sheetName: sheet.getName(),
      spreadsheetUrl: spreadsheet.getUrl(),
      isLikelyCorrect: isLikelyCorrect
    };
    
  } catch (error) {
    console.log('=== SHEET VERIFICATION ===');
    console.log('❌ ERROR:', error.toString());
    console.log('');
    console.log('🔧 SOLUTION:');
    console.log('1. Open your Google Sheet first');
    console.log('2. Then run this script from the sheet');
    console.log('3. Or use verifySheetById() function');
    console.log('=== VERIFICATION COMPLETE ===');
    
    return {
      success: false,
      error: error.toString(),
      solution: 'Open your Google Sheet first, then run the script'
    };
  }
}

// Alternative function to verify sheet by ID (when no active spreadsheet)
function verifySheetById(spreadsheetId) {
  try {
    if (!spreadsheetId) {
      console.log('=== SHEET VERIFICATION BY ID ===');
      console.log('❌ ERROR: No spreadsheet ID provided!');
      console.log('');
      console.log('🔧 USAGE:');
      console.log('verifySheetById("your_spreadsheet_id_here")');
      console.log('');
      console.log('📋 To get your spreadsheet ID:');
      console.log('1. Open your Google Sheet');
      console.log('2. Look at the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit');
      console.log('3. Copy the SPREADSHEET_ID part');
      console.log('=== VERIFICATION COMPLETE ===');
      
      return {
        success: false,
        error: 'No spreadsheet ID provided',
        usage: 'verifySheetById("your_spreadsheet_id_here")'
      };
    }
    
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheets()[0]; // Get first sheet
    
    console.log('=== SHEET VERIFICATION BY ID ===');
    console.log('You are working with:');
    console.log('📊 Spreadsheet:', spreadsheet.getName());
    console.log('📋 Sheet:', sheet.getName());
    console.log('🔗 Spreadsheet URL:', spreadsheet.getUrl());
    console.log('🆔 Spreadsheet ID:', spreadsheet.getId());
    
    // Check if this looks like the right sheet
    const spreadsheetName = spreadsheet.getName().toLowerCase();
    const sheetName = sheet.getName().toLowerCase();
    
    const isLikelyCorrect = 
      spreadsheetName.includes('contact') || 
      spreadsheetName.includes('aakar') ||
      spreadsheetName.includes('mineral') ||
      sheetName.includes('contact') ||
      sheetName.includes('form');
    
    if (isLikelyCorrect) {
      console.log('✅ This appears to be the correct sheet for contact form submissions');
    } else {
      console.log('⚠️  WARNING: This might not be the correct sheet!');
      console.log('Make sure this is the sheet where you want contact form data to appear');
    }
    
    console.log('=== VERIFICATION COMPLETE ===');
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      sheetName: sheet.getName(),
      spreadsheetUrl: spreadsheet.getUrl(),
      spreadsheetId: spreadsheet.getId(),
      isLikelyCorrect: isLikelyCorrect
    };
    
  } catch (error) {
    console.log('=== SHEET VERIFICATION BY ID ===');
    console.log('❌ ERROR:', error.toString());
    console.log('');
    console.log('🔧 POSSIBLE SOLUTIONS:');
    console.log('1. Check if the spreadsheet ID is correct');
    console.log('2. Make sure you have access to the spreadsheet');
    console.log('3. Verify the spreadsheet exists');
    console.log('=== VERIFICATION COMPLETE ===');
    
    return {
      success: false,
      error: error.toString(),
      solution: 'Check spreadsheet ID and permissions'
    };
  }
}

// Function to create a test submission
function createTestSubmission() {
  const testData = [
    new Date().toLocaleString(),
    'Test User',
    'test@example.com',
    '1234567890',
    'Test Company',
    'Test Inquiry',
    'Test Subject',
    'This is a test message to verify the contact form is working correctly',
    'New'
  ];
  
  try {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Sheet1');
  if (!sheet) sheet = ss.getSheets()[0];
    
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
    
    // Add the test row
    sheet.appendRow(testData);
    
    // Format the new row
  const lastRow = sheet.getLastRow();
    const newRowRange = sheet.getRange(lastRow, 1, 1, 9);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    console.log('✅ Test submission created successfully!');
    console.log('Row number:', lastRow);
    console.log('Check your sheet to see the test data');
    
    return {
      success: true,
      message: 'Test submission created successfully',
      rowNumber: lastRow
    };
    
  } catch (error) {
    console.error('❌ Error creating test submission:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}
