# Changelog

## Version 2.0.0 - Enhanced Edition (Current)

### 🎉 Major Features Added

#### 1. Extension Popup Interface
- **NEW**: Click extension icon to open popup
- Input field to paste and convert text
- All 12 Unicode styles displayed with live preview
- Click any style to copy to clipboard
- Clean, modern UI with dark mode support

#### 2. Enable/Disable Toggle
- **NEW**: Toggle switch to enable/disable text selection feature
- Persistent state saved across browser sessions
- Control when the tooltip appears

#### 3. Smart Replace/Copy Behavior
- **SMART**: Detects editable vs non-editable elements
- **Editable fields** (inputs, textareas): Replaces selected text
- **Non-editable areas** (paragraphs, divs): Copies to clipboard
- Visual notifications for copy operations

### 🔧 Technical Improvements
- Added `storage` permission for saving preferences
- Added `clipboardWrite` permission for copy functionality
- Improved text replacement logic for input/textarea elements
- Better error handling and fallback mechanisms
- Enhanced element detection (input, textarea, contenteditable)
- Renamed `popup.css` to `tooltip.css` for clarity

### 🎨 UI/UX Enhancements
- New extension popup design
- Toggle switch with gradient styling
- Copy success/failure notifications
- Dynamic footer text based on element type
- Smooth animations for notifications
- Better dark mode support

### 📁 New Files
- `popup.html` - Extension popup structure
- `popup.css` - Popup styling
- `popup.js` - Popup logic and functionality

### 🔄 Modified Files
- `manifest.json` - Updated to v2.0.0, added popup action and permissions
- `content.js` - Added smart detection and copy functionality
- `tooltip.css` - Renamed from popup.css, added animations
- `README.md` - Updated documentation

---

## Version 1.0.0 - Initial Release

### Features
- Text selection detection on all webpages
- Tooltip popup with 12 Unicode styles
- One-click text replacement
- 12 Unicode text styles:
  - Bold, Italic, Bold Italic
  - Monospace, Script, Double-Struck
  - Fraktur, Bold Fraktur
  - Sans-Serif variants (4 styles)
- Dark mode support
- Works on all websites

### Files
- `manifest.json` - Extension configuration
- `converter.js` - Unicode conversion engine
- `content.js` - Content script for text selection
- `popup.css` - Tooltip styling
- `icons/` - Extension icons

---

## Migration Guide (v1 to v2)

### For Users
1. Extension will auto-enable on update
2. New popup accessible via extension icon
3. Toggle feature can be disabled if desired
4. Non-editable text now copies instead of attempting replace

### For Developers
- `popup.css` renamed to `tooltip.css` - update any references
- New permissions added: `storage`, `clipboardWrite`
- `content.js` now exports `isElementEditable()` function
- Added message listener for toggle state changes

