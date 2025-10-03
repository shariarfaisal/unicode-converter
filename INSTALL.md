# Quick Installation Guide - v2.0

## Install the Extension (3 minutes)

### Step 1: Open Chrome Extensions
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. Or click Menu (⋮) → Extensions → Manage Extensions

### Step 2: Enable Developer Mode
1. Look for "Developer mode" toggle in top-right corner
2. Turn it **ON** (it will turn blue)

### Step 3: Load the Extension
1. Click "Load unpacked" button
2. Navigate to the `unicode` folder on your Desktop
3. Click "Select" or "Open"

### Step 4: Verify Installation
✅ You should see "Unicode Text Formatter v2.0.0" in your extensions list
✅ Purple "A" icon visible

## 🎯 How to Use - Two Methods

### Method 1: Extension Popup (Recommended for converting text)

1. **Click the extension icon** in Chrome toolbar
   - Pin it for easy access (click the puzzle icon, then pin)
2. **Use the toggle** to enable/disable text selection feature
3. **Type or paste text** in the input field
4. **Click any style** to copy to clipboard
5. **Paste** the formatted text anywhere!

**Perfect for:**
- Converting text before posting
- Batch converting multiple texts
- Quick copy-paste workflow

---

### Method 2: Text Selection (When toggle is enabled)

1. **Go to any website** (Twitter, Discord, etc.)
2. **Select text** with your mouse
3. **Popup appears** near your selection
4. **Click a style**:
   - ✏️ **In editable fields**: Text is replaced automatically
   - 📋 **In regular text**: Copied to clipboard (notification appears)

**Perfect for:**
- Quick inline editing
- Formatting while typing
- On-the-fly text styling

## 🔍 What's the Difference?

### Editable Elements (Replace Mode)
When you select text in these places, clicking a style **replaces** it:
- ✅ Input fields (search boxes, forms)
- ✅ Textareas (comment boxes, message inputs)
- ✅ Contenteditable divs (rich text editors)

**Examples:**
- Twitter/Discord/WhatsApp message boxes
- Gmail compose window
- Reddit comment editor

### Non-Editable Elements (Copy Mode)
When you select text in these places, clicking a style **copies** it:
- 📄 Paragraphs and articles
- 📝 Headings and static text
- 🔒 Read-only content

**Examples:**
- News articles
- Documentation pages
- PDFs viewed in browser

## ⚙️ Toggle Feature Explained

The **Enable text selection tooltip** toggle controls whether the tooltip appears when you select text.

### When Enabled (Default):
- ✅ Select text → tooltip appears
- ✅ Works on all websites
- ✅ Click style → replace or copy

### When Disabled:
- ❌ Select text → no tooltip
- ✅ Extension popup still works
- ✅ Useful when you don't want the tooltip

**Pro Tip:** Disable when reading articles to avoid popups!

## 🧪 Test It

### Test 1: Extension Popup
1. Click the extension icon
2. Type "Hello World" in the input
3. Click "Bold" → should see notification "Copied to clipboard!"
4. Paste anywhere → should see **𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱**

### Test 2: Editable Field (Replace)
1. Go to Twitter/Discord (or open `test-page.html`)
2. Start typing a message: "This is important"
3. Select the word "important"
4. Click "Bold" in the tooltip
5. Text should change to "This is 𝗶𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁"

### Test 3: Non-Editable Text (Copy)
1. Open any news article
2. Select some text in an article paragraph
3. Click "Italic" in the tooltip
4. Should see notification "Copied to clipboard!"
5. Paste elsewhere → text is in italic Unicode

## 🐛 Troubleshooting

### Extension icon not showing?
- Click the puzzle piece icon (🧩) in toolbar
- Find "Unicode Text Formatter"
- Click the pin icon to add to toolbar

### Tooltip not appearing?
- **Check**: Is the toggle enabled in extension popup?
- **Try**: Refresh the page (F5 or Cmd+R)
- **Check**: Is extension enabled in `chrome://extensions/`?

### Text not replacing?
- **Make sure**: The input field is focused (clicked)
- **Some websites**: May prevent text modification
- **Solution**: Use the extension popup instead

### Copy notification not showing?
- **Check**: Browser has clipboard permissions
- **Try**: Reload the extension in `chrome://extensions/`
- **Note**: Text is still copied even without notification

### Extension won't load?
- **Verify**: All files are in the `unicode` folder
- **Check**: Developer mode is ON
- **Look**: For red errors in `chrome://extensions/`
- **Try**: Remove and re-load the extension

## 💡 Pro Tips

1. **Pin to Toolbar**: Click puzzle icon → pin for quick access
2. **Keyboard Shortcut**: Set custom shortcut in `chrome://extensions/shortcuts/`
3. **Batch Convert**: Use popup to convert multiple texts quickly
4. **Mix Styles**: Combine different styles in one message
5. **Disable Temporarily**: Toggle off when reading long articles

## 📊 Permissions Explained

The extension asks for these permissions:

- **activeTab**: Access current webpage to detect text selection
- **storage**: Save your toggle preference (on/off)
- **clipboardWrite**: Copy formatted text to clipboard

**Privacy:** No data is collected or sent anywhere. Everything happens locally in your browser.

## 🎉 You're All Set!

The extension is ready to use. Try both methods and see which works best for you!

### Quick Reference Card

| Action | Method | Result |
|--------|--------|--------|
| Click extension icon | Popup | Convert & copy |
| Select text in input | Tooltip | Replace text |
| Select text in article | Tooltip | Copy to clipboard |
| Toggle switch OFF | Popup | Disable tooltip |

---

**Need more help?** Check the full [README.md](README.md) for detailed documentation!

**Happy Formatting!** ✨
