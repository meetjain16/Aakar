# Google Sheets Checker Functions Guide

## 🔍 New Checker Functions Added

I've added three powerful checker functions to help you verify that everything is working correctly:

### 1. **`checkSheetSetup()`** - Complete Setup Checker
### 2. **`verifyCorrectSheet()`** - Sheet Verification
### 3. **`createTestSubmission()`** - Test Data Creator

## 📋 How to Use the Checkers

### **Step 1: Update Your Google Apps Script**

1. **Go to your Google Apps Script project**
2. **Replace the old code** with the new code from `google-apps-script.js`
3. **Save** the project
4. **Redeploy** as web app

### **Step 2: Run the Checkers**

#### **Checker 1: Complete Setup Check**
```javascript
// Run this function in Google Apps Script
checkSheetSetup()
```

**What it checks:**
- ✅ Spreadsheet name and ID
- ✅ Sheet name and ID
- ✅ Total rows and columns
- ✅ Headers format (if any exist)
- ✅ Write permissions
- ✅ Editor/viewer permissions

#### **Checker 2: Sheet Verification**
```javascript
// Run this function in Google Apps Script
verifyCorrectSheet()
```

**What it checks:**
- ✅ Confirms you're in the right spreadsheet
- ✅ Shows spreadsheet URL
- ✅ Warns if sheet name doesn't match expected pattern
- ✅ Validates this is the correct sheet for contact forms

#### **Checker 3: Test Submission**
```javascript
// Run this function in Google Apps Script
createTestSubmission()
```

**What it does:**
- ✅ Creates a test row with sample data
- ✅ Adds headers if sheet is empty
- ✅ Formats the test row properly
- ✅ Shows success/failure status

## 🚀 Step-by-Step Testing Process

### **Phase 1: Basic Verification**
1. **Run `verifyCorrectSheet()`**
   - Check if you're in the right spreadsheet
   - Verify the sheet name makes sense
   - Note the spreadsheet URL

### **Phase 2: Setup Validation**
2. **Run `checkSheetSetup()`**
   - Check all permissions
   - Verify headers format
   - Confirm write access

### **Phase 3: Functionality Test**
3. **Run `createTestSubmission()`**
   - Creates a test row
   - Verifies data appears in sheet
   - Confirms formatting works

### **Phase 4: Live Testing**
4. **Test the actual contact form**
   - Submit a real form
   - Check if data appears
   - Compare with test data

## 📊 What Each Checker Shows

### **checkSheetSetup() Output:**
```
=== SHEET SETUP CHECKER ===
Spreadsheet Name: AAKAR Contact Form Submissions
Spreadsheet ID: 1ABC123DEF456GHI789JKL
Sheet Name: Sheet1
Sheet ID: 1234567890
Total Rows: 0
Total Columns: 0
Sheet is empty - headers will be created on first submission
Write Permission: ✅ SUCCESS
Editors: [your-email@gmail.com]
Viewers: []
=== CHECKER COMPLETE ===
```

### **verifyCorrectSheet() Output:**
```
=== SHEET VERIFICATION ===
You are currently working with:
📊 Spreadsheet: AAKAR Contact Form Submissions
📋 Sheet: Sheet1
🔗 Spreadsheet URL: https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit
✅ This appears to be the correct sheet for contact form submissions
=== VERIFICATION COMPLETE ===
```

### **createTestSubmission() Output:**
```
✅ Test submission created successfully!
Row number: 2
Check your sheet to see the test data
```

## 🔧 Troubleshooting with Checkers

### **If `checkSheetSetup()` fails:**
- **Write Permission Failed**: Check sheet sharing permissions
- **Headers Don't Match**: Clear the sheet and let it recreate headers
- **No Editors**: Add yourself as an editor

### **If `verifyCorrectSheet()` shows warning:**
- **Wrong Sheet**: Navigate to the correct spreadsheet
- **Wrong Name**: Rename your spreadsheet to include "contact" or "aakar"

### **If `createTestSubmission()` fails:**
- **Permission Error**: Check sharing settings
- **Script Error**: Check the execution log for details
- **Sheet Locked**: Make sure the sheet isn't protected

## 🎯 Quick Diagnostic Commands

Run these in order to diagnose issues:

```javascript
// 1. Check if you're in the right place
verifyCorrectSheet()

// 2. Check if everything is set up correctly
checkSheetSetup()

// 3. Test if data can be written
createTestSubmission()

// 4. Test the API endpoint
doGet()
```

## 📝 Expected Results

### **✅ Everything Working:**
- `verifyCorrectSheet()` shows ✅ correct sheet
- `checkSheetSetup()` shows ✅ write permission
- `createTestSubmission()` creates test row
- `doGet()` returns API running message

### **❌ Something Wrong:**
- Any function shows error messages
- Test data doesn't appear in sheet
- API endpoint doesn't respond

## 🔄 After Running Checkers

1. **If all checkers pass**: Your setup is correct, test the contact form
2. **If any checker fails**: Fix the issue before testing the form
3. **If test data appears**: The script is working, check your .env file
4. **If test data doesn't appear**: There's a permission or script issue

These checkers will help you identify exactly where the problem is! 🌟
