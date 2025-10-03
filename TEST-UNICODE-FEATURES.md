# Testing Guide - Unicode Features

## Quick Tests

### Test 1: Normal Text → Unicode
**What to test:** Converting regular text to Unicode styles

1. Open test-page.html or any webpage
2. Type in a textarea: "Hello World"
3. Select "Hello"
4. Tooltip appears with styles
5. Click "Bold"
6. **Expected:** Text changes to "𝗛𝗲𝗹𝗹𝗼 World"
7. **Result:** ✅ Pass / ❌ Fail

### Test 2: Unicode → Normal Text (NEW!)
**What to test:** Converting Unicode back to regular text

1. Type in textarea: "𝗛𝗲𝗹𝗹𝗼" (copy-paste bold Unicode)
2. Select the bold text "𝗛𝗲𝗹𝗹𝗼"
3. Tooltip appears
4. **Expected:** "✨ Normal Text" appears at the TOP with blue background
5. Click "✨ Normal Text"
6. **Expected:** Text changes to "Hello" (regular)
7. **Result:** ✅ Pass / ❌ Fail

### Test 3: Unicode → Different Unicode (NEW!)
**What to test:** Converting between Unicode styles

1. Type in textarea: "𝗛𝗲𝗹𝗹𝗼" (bold Unicode)
2. Select the bold text
3. Tooltip shows "✨ Normal Text" at top, then other styles
4. Click "Italic"
5. **Expected:** Text changes to "𝘏𝘦𝘭𝘭𝘰" (italic Unicode)
6. **Result:** ✅ Pass / ❌ Fail

### Test 4: Extension Popup with Unicode
**What to test:** Extension popup handles Unicode

1. Click extension icon
2. Type in input: "𝗛𝗲𝗹𝗹𝗼" (bold Unicode)
3. **Expected:** "✨ Normal Text" appears at TOP with blue styling
4. **Expected:** Preview shows "Hello" (regular)
5. Click "✨ Normal Text"
6. **Expected:** Notification "Copied to clipboard!"
7. Paste somewhere
8. **Expected:** "Hello" (regular text)
9. **Result:** ✅ Pass / ❌ Fail

## Visual Tests

### Check Normal Text Styling

**In Tooltip:**
- Blue gradient background (light blue)
- Thicker border at bottom (2px, blue)
- "✨ Normal Text" label with sparkle emoji
- Blue text color (not gray)
- Positioned at TOP of list

**In Extension Popup:**
- Same blue gradient background
- Same styling as tooltip
- Clearly distinct from other options

## Edge Cases

### Test 5: Mixed Text (Unicode + Regular)
```
1. Type: "Hello 𝗪𝗼𝗿𝗹𝗱"
2. Select entire text
3. Tooltip shows "✨ Normal Text" (because Unicode detected)
4. Click "Normal Text"
5. Expected: "Hello World" (all regular)
```

### Test 6: Multiple Unicode Styles in Selection
```
1. Type: "𝗕𝗼𝗹𝗱 𝘐𝘵𝘢𝘭𝘪𝘤"
2. Select all
3. Tooltip shows "✨ Normal Text"
4. Click "Normal Text"
5. Expected: "Bold Italic" (all regular)
```

### Test 7: Unicode Numbers and Symbols
```
1. Type: "𝟭𝟮𝟯𝟰𝟱" (bold Unicode numbers)
2. Select all
3. Click "Normal Text"
4. Expected: "12345" (regular numbers)
```

## Conversion Chain Tests

### Test 8: Multiple Conversions
```
1. Type: "Hello"
2. Select, click "Bold" → "𝗛𝗲𝗹𝗹𝗼"
3. Select, click "Italic" → "𝘏𝘦𝘭𝘭𝘰"
4. Select, click "Monospace" → "𝙷𝚎𝚕𝚕𝚘"
5. Select, click "Normal Text" → "Hello"
6. All steps should work smoothly
```

### Test 9: Round-Trip Conversion
```
Start: "Hello"
→ Bold: "𝗛𝗲𝗹𝗹𝗼"
→ Normal: "Hello"
→ Italic: "𝘏𝘦𝘭𝘭𝘰"
→ Normal: "Hello"
Should match original
```

## Real-World Tests

### Twitter/Discord Test
```
1. Go to Twitter or Discord
2. Start composing: "This is 𝗶𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁"
3. Select "𝗶𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁"
4. Change to italic (should work now!)
5. Expected: "This is 𝘪𝘮𝘱𝘰𝘳𝘵𝘢𝘯𝘵"
```

## Known Behaviors

### What Should Happen:
✅ "✨ Normal Text" appears ONLY when Unicode is detected
✅ Normal Text has blue background (stands out)
✅ Normal Text is always first in the list
✅ All Unicode → Unicode conversions work
✅ Regular text → Unicode still works as before

### What Should NOT Happen:
❌ Normal Text showing for regular ASCII text
❌ Normal Text in gray (should be blue)
❌ Normal Text at bottom of list
❌ Unicode → Unicode conversion failing
❌ Any errors in console

## Checklist

| Test | Description | Status |
|------|-------------|--------|
| 1 | Normal → Unicode | ⬜ |
| 2 | Unicode → Normal | ⬜ |
| 3 | Unicode → Unicode | ⬜ |
| 4 | Extension popup | ⬜ |
| 5 | Mixed text | ⬜ |
| 6 | Multiple styles | ⬜ |
| 7 | Numbers | ⬜ |
| 8 | Conversion chain | ⬜ |
| 9 | Round-trip | ⬜ |

## How to Reload Extension

1. Go to `chrome://extensions/`
2. Find "Unicode Text Formatter"
3. Click refresh icon (🔄)
4. Refresh test pages

## Success Criteria

✅ All 9 tests pass
✅ "Normal Text" appears with blue styling
✅ Unicode-to-Unicode works
✅ No console errors
✅ Works in both tooltip and popup

## Report Issues

If any test fails:
1. Open DevTools (F12)
2. Check Console for errors
3. Note which test failed
4. Try reloading the extension
