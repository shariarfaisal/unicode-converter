# Unicode Text Formatter - Chrome Extension

Transform selected text into Unicode styled variants (bold, italic, script, and more) for use anywhere online where markdown isn't supported!

## 📦 Repository

GitHub: [https://github.com/shariarfaisal/unicode-converter](https://github.com/shariarfaisal/unicode-converter)

## ✨ Features

### 🎯 Dual Interface
1. **Extension Popup** - Click the extension icon to:
   - Toggle the text selection feature on/off
   - Paste text and see all 12 Unicode style variants
   - Click any style to copy to clipboard

2. **Text Selection Tooltip** - When enabled:
   - Select any text on any webpage
   - Popup appears with all Unicode styles
   - **Smart behavior:**
     - In editable fields (inputs, textareas): **Replaces** selected text
     - In non-editable areas (paragraphs, divs): **Copies** to clipboard

### 🔤 12 Unicode Text Styles
- **𝗕𝗼𝗹𝗱** - Perfect for emphasis
- *𝘐𝘵𝘢𝘭𝘪𝘤* - Elegant slant
- **𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘** - Double emphasis
- 𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 - Code-like appearance
- 𝓈𝒸𝓇𝒾𝓅𝓉 - Fancy handwriting style
- 𝕕𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜 - Outlined letters
- 𝔣𝔯𝔞𝔨𝔱𝔲𝔯 - Gothic/blackletter
- 𝖇𝖔𝖑𝖉 𝖋𝖗𝖆𝖐𝖙𝖚𝖗 - Bold gothic
- 𝗌𝖺𝗇𝗌-𝗌𝖾𝗋𝗂𝖿 - Clean modern
- 𝘀𝗮𝗻𝘀-𝘀𝗲𝗿𝗶𝗳 𝗯𝗼𝗹𝗱 - Bold sans
- 𝘴𝘢𝘯𝘴-𝘴𝘦𝘳𝘪𝘧 𝘪𝘵𝘢𝘭𝘪𝘤 - Slanted sans
- 𝙨𝙖𝙣𝙨-𝙨𝙚𝙧𝙞𝙛 𝙗𝙤𝙡𝙙 𝙞𝙩𝙖𝙡𝙞𝙘 - Combined style

### 🎛️ Key Features
- ⚡ **Instant Transformation** - One click to replace or copy
- 🔄 **Toggle On/Off** - Enable/disable text selection feature
- 🌍 **Works Everywhere** - Twitter, Discord, LinkedIn, WhatsApp, etc.
- 🎯 **Smart Detection** - Auto-detects editable vs non-editable elements
- 📋 **Copy to Clipboard** - Automatic clipboard copy for non-editable text
- 🔔 **Visual Feedback** - Notifications for copy operations
- 🌙 **Dark Mode** - Automatically adapts to system theme
- 🔒 **Privacy First** - No data collection, works offline

## 🚀 Installation

### Load Unpacked Extension (Developer Mode)

1. **Open Chrome Extensions**:
   - Navigate to `chrome://extensions/`
   - Or Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**:
   - Toggle "Developer mode" in top-right corner

3. **Load Extension**:
   - Click "Load unpacked"
   - Select the `unicode` folder
   - Extension is now active!

## 📖 How to Use

### Method 1: Extension Popup

1. **Click the extension icon** in Chrome toolbar
2. **Toggle the switch** to enable/disable text selection feature
3. **Enter text** in the input field
4. **Click any style** to copy to clipboard

### Method 2: Text Selection (When Enabled)

1. **Select text** on any webpage
2. **Popup appears** with Unicode styles
3. **Click a style**:
   - **Editable fields**: Text is replaced
   - **Regular text**: Copied to clipboard
4. **Done!** Text is formatted or copied

## 🎯 Use Cases

### Editable Areas (Replace Mode)
- Twitter/X compose box
- Discord message input
- LinkedIn post editor
- WhatsApp Web chat
- Gmail compose
- Reddit comment box
- Any textarea or input field

### Non-Editable Areas (Copy Mode)
- Reading articles and copying quotes
- Highlighting text in documentation
- Copying formatted text from PDFs
- Any static webpage content

## 🛠️ Technical Details

### Files Structure

```
unicode/
├── manifest.json          # Extension configuration
├── converter.js           # Unicode conversion logic
├── content.js            # Selection detection & tooltip
├── tooltip.css           # Tooltip styling
├── popup.html            # Extension popup UI
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
└── icons/                # Extension icons
    ├── icon16.svg
    ├── icon48.svg
    └── icon128.svg
```

### How It Works

1. **Extension Popup**: Click icon → toggle feature, convert text, copy results
2. **Content Script**: Detects text selection when enabled
3. **Smart Detection**: Checks if selected element is editable
4. **Converter**: Maps characters to Unicode mathematical alphanumerics
5. **Action**: Replace text (editable) or copy to clipboard (non-editable)

### Permissions

- `activeTab` - Access to current tab for text selection
- `storage` - Save enable/disable preference
- `clipboardWrite` - Copy formatted text to clipboard

## 🔧 Advanced Features

### Enable/Disable Toggle
- Persistent state saved across browser sessions
- Quick on/off without uninstalling
- Useful when you don't need the feature temporarily

### Smart Element Detection
The extension automatically detects:
- `<input>` elements (text, search, email, etc.)
- `<textarea>` elements
- `contenteditable` elements
- Read-only and disabled states

### Visual Feedback
- ✅ Success notification: "Copied to clipboard!"
- ❌ Error notification: "Failed to copy"
- 🎨 Highlight effect on click
- 📍 Dynamic footer text based on element type

## 🐛 Troubleshooting

**Tooltip doesn't appear?**
- Check that the toggle is enabled in the extension popup
- Ensure text is selected (highlighted)
- Refresh the page and try again
- Verify extension is enabled in `chrome://extensions/`

**Text not replacing in input field?**
- Make sure the field is focused when you select text
- Some websites may prevent text modification
- Try the extension popup instead for manual copy

**Copy notification doesn't show?**
- Extension may not have clipboard permissions
- Try reloading the extension
- Check browser console for errors

**Extension not loading?**
- Verify all files are in the `unicode` folder
- Check Developer mode is ON
- Look for errors in `chrome://extensions/`

## 💡 Pro Tips

1. **Quick Access**: Pin the extension to toolbar for easy access
2. **Disable When Not Needed**: Toggle off to avoid popup on every selection
3. **Use Popup for Batch**: Convert multiple texts using the extension popup
4. **Keyboard Selection**: Works with Shift+Arrow keys too
5. **Mix Styles**: Combine different styles in one message for impact

## 🌟 Examples

### Before & After

```
Regular text → 𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁 (Bold)
Hello World → 𝘏𝘦𝘭𝘭𝘰 𝘞𝘰𝘳𝘭𝘥 (Italic)
Important → 𝙄𝙢𝙥𝙤𝙧𝙩𝙖𝙣𝙩 (Bold Italic)
CODE → 𝙲𝙾𝙳𝙴 (Monospace)
Fancy → 𝐹𝒶𝓃𝒸𝓎 (Script)
```

### Real-World Usage

**Twitter Post:**
```
Just launched my new project! 𝗖𝗵𝗲𝗰𝗸 𝗶𝘁 𝗼𝘂𝘁 → link.com
```

**Discord Announcement:**
```
𝗔𝗧𝗧𝗘𝗡𝗧𝗜𝗢𝗡: Server maintenance tonight at 𝟭𝟬 𝗣𝗠
```

**LinkedIn Post:**
```
Excited to share: We're 𝗵𝗶𝗿𝗶𝗻𝗴! Join our team as a 𝘚𝘦𝘯𝘪𝘰𝘳 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘳
```

## 📝 Version History

### v2.0.0 (Current)
- ✨ Added extension popup with input field
- ✨ Added enable/disable toggle
- ✨ Smart replace/copy based on element type
- ✨ Copy to clipboard for non-editable text
- ✨ Visual notifications
- 🎨 Improved UI and dark mode
- 🐛 Better input/textarea handling

### v1.0.0
- Initial release with text selection tooltip
- 12 Unicode styles
- Basic replace functionality

## 🤝 Contributing

Contributions are welcome! Please visit our GitHub repository:

🔗 **[https://github.com/shariarfaisal/unicode-converter](https://github.com/shariarfaisal/unicode-converter)**

Feel free to:
- 🐛 Report bugs or issues
- 💡 Suggest new Unicode styles
- 🎨 Improve the UI/UX
- ✨ Add new features
- 📖 Improve documentation

## 📄 License

Free to use and modify for personal and commercial purposes.

## 🙏 Credits

**Author:** [Shariar Faisal](https://github.com/shariarfaisal)

**Repository:** [https://github.com/shariarfaisal/unicode-converter](https://github.com/shariarfaisal/unicode-converter)

Built with ❤️ using:
- Unicode Mathematical Alphanumeric Symbols
- Chrome Extension Manifest V3
- Vanilla JavaScript (no dependencies!)

---

**Enjoy making your text stand out everywhere! 𝗛𝗮𝗽𝗽𝘆 𝗙𝗼𝗿𝗺𝗮𝘁𝘁𝗶𝗻𝗴! ✨**
