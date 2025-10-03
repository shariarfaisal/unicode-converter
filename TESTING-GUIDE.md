# Testing Guide - After Bug Fix

## Quick Test (2 minutes)

### Test 1: Input Field Replacement
1. Load extension in Chrome
2. Open `test-page.html` (double-click it)
3. Find an input field or textarea
4. Type: "This is important"
5. Select the word "important" with your mouse
6. Tooltip should appear near your selection
7. Click "Bold" in the tooltip
8. **Expected:** The word "important" changes to "𝗶𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁" IN THE SAME INPUT
9. **Result:** ✅ Text replaced correctly / ❌ Text not replaced

### Test 2: Paragraph Copy
1. On the same test page, scroll to a regular paragraph
2. Select any text in the paragraph (non-editable)
3. Tooltip appears
4. Click "Italic"
5. **Expected:** Green notification "Copied to clipboard!" appears
6. **Expected:** Original text is NOT modified
7. Paste (Cmd+V or Ctrl+V) somewhere
8. **Result:** ✅ Italic Unicode text pasted / ❌ Failed

### Test 3: Extension Popup
1. Click the extension icon in Chrome toolbar
2. Type "Hello World" in the input field
3. Click any style (e.g., "Monospace")
4. **Expected:** Notification "Copied to clipboard!"
5. Paste somewhere
6. **Result:** ✅ Correct Unicode style / ❌ Failed

## Real-World Tests

### Twitter/X Test
1. Go to twitter.com (or x.com)
2. Click "Post" to start composing
3. Type: "Breaking news about AI"
4. Select "Breaking news"
5. Click "Bold" in tooltip
6. **Expected:** Text changes to "𝗕𝗿𝗲𝗮𝗸𝗶𝗻𝗴 𝗻𝗲𝘄𝘀 about AI"
7. Post the tweet or save as draft

### Discord Test
1. Go to discord.com
2. Open any channel with message input
3. Type: "This is a test message"
4. Select "test"
5. Click "Bold"
6. **Expected:** Message input shows "This is a 𝘁𝗲𝘀𝘁 message"

### Gmail Test
1. Go to gmail.com
2. Click "Compose"
3. In the message body, type: "Important: Meeting at 3pm"
4. Select "Important"
5. Click "Bold"
6. **Expected:** Text updates to "𝗜𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁: Meeting at 3pm"

## Common Issues & Solutions

### Issue: Tooltip doesn't appear
**Check:**
- Is the toggle enabled in extension popup?
- Did you actually select text (highlight it)?
- Try refreshing the page

### Issue: Text doesn't replace
**Check:**
- Is the input field focused (clicked)?
- Is the field read-only or disabled?
- Check browser console for errors (F12)

### Issue: Wrong element gets updated
**This was the bug we just fixed!**
- If this still happens, check:
  1. Browser console for JavaScript errors
  2. Extension is reloaded after changes
  3. No conflicting extensions

### Issue: Clipboard copy fails
**Check:**
- Browser has clipboard permissions
- HTTPS (some browsers block clipboard on HTTP)
- Try the extension popup method instead

## How to Reload Extension After Changes

1. Go to `chrome://extensions/`
2. Find "Unicode Text Formatter"
3. Click the refresh icon (🔄)
4. Refresh any open tabs where you want to test

## Debug Mode

To see what's happening:

1. Open any webpage
2. Press F12 to open DevTools
3. Go to "Console" tab
4. Select text and use the extension
5. Look for any error messages in red

### Expected console logs:
```
(No errors should appear)
```

### If you see errors like:
```
Error replacing text: ...
```
This means the fix didn't work. Check that content.js was properly updated.

## Test Matrix

| Element Type | Action | Expected Result | Status |
|--------------|--------|----------------|--------|
| Input field | Select + Click style | Text replaced in input | ⬜ |
| Textarea | Select + Click style | Text replaced in textarea | ⬜ |
| Paragraph | Select + Click style | Copied to clipboard | ⬜ |
| Contenteditable | Select + Click style | Text replaced inline | ⬜ |
| Extension popup | Type + Click style | Copied to clipboard | ⬜ |
| Toggle OFF | Select text | No tooltip appears | ⬜ |
| Toggle ON | Select text | Tooltip appears | ⬜ |

## Success Criteria

The fix is successful if:
1. ✅ Selecting text in INPUT replaces in the SAME INPUT
2. ✅ Selecting text in TEXTAREA replaces in the SAME TEXTAREA
3. ✅ Selecting text in paragraphs COPIES to clipboard
4. ✅ No "wrong element" updates
5. ✅ Cursor position is correct after replacement
6. ✅ Extension popup works independently

## Report Issues

If you find issues:
1. Note which test case failed
2. Check browser console for errors
3. Try in different browsers (Chrome, Edge, Brave)
4. Verify extension was reloaded after code changes
