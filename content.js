// Content script for detecting text selection and showing popup
let popup = null;
let selectedText = '';
let selectionRange = null;
let isEnabled = true; // Default enabled state
let targetElement = null; // Store the element where selection occurred
let selectionStart = null; // Store selection start position for input/textarea
let selectionEnd = null; // Store selection end position for input/textarea

// Create the popup element
function createPopup() {
  const popupDiv = document.createElement('div');
  popupDiv.id = 'unicode-formatter-popup';
  popupDiv.className = 'unicode-popup';
  document.body.appendChild(popupDiv);
  return popupDiv;
}

// Position popup near the selected text
function positionPopup(selection) {
  if (!popup) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Position above the selection, or below if not enough space
  const popupHeight = 300; // Approximate height
  const spaceAbove = rect.top;
  const spaceBelow = window.innerHeight - rect.bottom;

  let top, left;

  if (spaceAbove > popupHeight || spaceAbove > spaceBelow) {
    // Position above
    top = window.scrollY + rect.top - popupHeight - 10;
  } else {
    // Position below
    top = window.scrollY + rect.bottom + 10;
  }

  // Center horizontally with the selection
  left = window.scrollX + rect.left + (rect.width / 2);

  // Ensure popup stays within viewport
  const popupWidth = 280;
  if (left + popupWidth / 2 > window.innerWidth) {
    left = window.innerWidth - popupWidth - 10;
  } else if (left - popupWidth / 2 < 0) {
    left = 10;
  } else {
    left = left - popupWidth / 2;
  }

  popup.style.top = `${top}px`;
  popup.style.left = `${left}px`;
  popup.style.display = 'block';
}

// Generate popup content with all style options
function generatePopupContent(text) {
  const conversions = UnicodeConverter.getAllConversions(text);
  const isUnicodeText = UnicodeConverter.isUnicode(text);

  const styles = [
    { name: 'Bold', key: 'bold', example: conversions.bold },
    { name: 'Italic', key: 'italic', example: conversions.italic },
    { name: 'Bold Italic', key: 'boldItalic', example: conversions.boldItalic },
    { name: 'Monospace', key: 'monospace', example: conversions.monospace },
    { name: 'Script', key: 'script', example: conversions.script },
    { name: 'Double-Struck', key: 'doubleStruck', example: conversions.doubleStruck },
    { name: 'Fraktur', key: 'fraktur', example: conversions.fraktur },
    { name: 'Bold Fraktur', key: 'boldFraktur', example: conversions.boldFraktur },
    { name: 'Sans-Serif', key: 'sansSerif', example: conversions.sansSerif },
    { name: 'Sans-Serif Bold', key: 'sansSerifBold', example: conversions.sansSerifBold },
    { name: 'Sans-Serif Italic', key: 'sansSerifItalic', example: conversions.sansSerifItalic },
    { name: 'Sans-Serif Bold Italic', key: 'sansSerifBoldItalic', example: conversions.sansSerifBoldItalic }
  ];

  let html = '<div class="unicode-popup-header">Unicode Text Styles</div>';
  html += '<div class="unicode-popup-content">';

  // Show "Normal Text" option at the top if text contains Unicode
  if (isUnicodeText) {
    const normalText = UnicodeConverter.toNormal(text);
    html += `
      <div class="unicode-style-option unicode-style-normal" data-style="normal" data-text="${escapeHtml(normalText)}">
        <div class="style-name">✨ Normal Text</div>
        <div class="style-preview">${escapeHtml(normalText)}</div>
      </div>
    `;
  }

  // Show all Unicode style options
  styles.forEach(style => {
    html += `
      <div class="unicode-style-option" data-style="${style.key}" data-text="${escapeHtml(style.example)}">
        <div class="style-name">${style.name}</div>
        <div class="style-preview">${escapeHtml(style.example)}</div>
      </div>
    `;
  });

  html += '</div>';

  // Dynamic footer based on whether target is editable
  const isEditable = isElementEditable(targetElement);
  const footerText = isEditable
    ? 'Click any style to replace selected text'
    : 'Click any style to copy to clipboard';
  html += `<div class="unicode-popup-footer">${footerText}</div>`;

  return html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Get the actual input/textarea element from selection
function getInputElementFromSelection(selection) {
  if (!selection || selection.rangeCount === 0) return null;

  // Check if document.activeElement is an input or textarea
  const activeEl = document.activeElement;
  if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
    // Verify that it actually has a selection
    if (activeEl.selectionStart !== activeEl.selectionEnd) {
      return activeEl;
    }
  }

  // Fallback: try to find from selection's anchor node
  const anchorNode = selection.anchorNode;
  if (!anchorNode) return null;

  // If the anchor node itself is an input/textarea
  if (anchorNode.tagName === 'INPUT' || anchorNode.tagName === 'TEXTAREA') {
    return anchorNode;
  }

  // Check if it's inside an input/textarea (though this is rare)
  let parent = anchorNode.parentElement;
  while (parent) {
    if (parent.tagName === 'INPUT' || parent.tagName === 'TEXTAREA') {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

// Check if element is editable
function isElementEditable(element) {
  if (!element) return false;

  // Check for input and textarea elements
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    return !element.readOnly && !element.disabled;
  }

  // Check for contenteditable elements
  if (element.contentEditable === 'true') {
    return true;
  }

  // Check parent elements for contenteditable
  let parent = element.parentElement;
  while (parent) {
    if (parent.contentEditable === 'true') {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

// Replace selected text with converted text (for editable elements)
function replaceSelectedText(convertedText) {
  try {
    // For input and textarea elements, use value replacement with stored positions
    if (targetElement && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      // Use stored selection positions
      const start = selectionStart !== null ? selectionStart : targetElement.selectionStart;
      const end = selectionEnd !== null ? selectionEnd : targetElement.selectionEnd;
      const value = targetElement.value;

      // Replace the text at the stored positions
      targetElement.value = value.substring(0, start) + convertedText + value.substring(end);

      // Set cursor position after inserted text
      const newPosition = start + convertedText.length;
      targetElement.selectionStart = targetElement.selectionEnd = newPosition;
      targetElement.focus();
    } else if (selectionRange) {
      // For contenteditable and other elements, use range replacement
      selectionRange.deleteContents();
      const textNode = document.createTextNode(convertedText);
      selectionRange.insertNode(textNode);

      // Move cursor after inserted text
      selectionRange.setStartAfter(textNode);
      selectionRange.setEndAfter(textNode);
    }
  } catch (error) {
    console.error('Error replacing text:', error);
    // Fallback to copy if replace fails
    copyToClipboard(convertedText);
  }

  // Clear selection
  window.getSelection().removeAllRanges();
  hidePopup();
}

// Copy text to clipboard (for non-editable elements)
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('Copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    showNotification('Failed to copy', true);
  }
}

// Show notification
function showNotification(message, isError = false) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'unicode-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${isError ? '#dc3545' : '#28a745'};
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  document.body.appendChild(notification);

  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Handle style click - replace or copy based on element editability
function handleStyleClick(convertedText) {
  if (isElementEditable(targetElement)) {
    replaceSelectedText(convertedText);
  } else {
    copyToClipboard(convertedText);
    hidePopup();
  }
}

// Show popup for selected text
function showPopup(selection) {
  // Check if feature is enabled
  if (!isEnabled) {
    return;
  }

  const text = selection.toString().trim();

  if (!text || text.length === 0) {
    hidePopup();
    return;
  }

  selectedText = text;

  // Try to get input/textarea element from selection
  const inputElement = getInputElementFromSelection(selection);

  if (inputElement) {
    // For input/textarea: store element and current selection positions
    targetElement = inputElement;
    selectionStart = inputElement.selectionStart;
    selectionEnd = inputElement.selectionEnd;
    selectionRange = null; // Not used for input/textarea
  } else {
    // For contenteditable or regular elements: store range
    targetElement = null;
    selectionStart = null;
    selectionEnd = null;
    selectionRange = selection.getRangeAt(0).cloneRange();

    // Check if selection is in a contenteditable element
    const anchorNode = selection.anchorNode;
    if (anchorNode) {
      let element = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;

      // Check if this element or any parent is contenteditable
      while (element) {
        if (element.contentEditable === 'true') {
          targetElement = element;
          break;
        }
        element = element.parentElement;
      }
    }
  }

  if (!popup) {
    popup = createPopup();
  }

  popup.innerHTML = generatePopupContent(text);
  positionPopup(selection);

  // Add click handlers to style options
  const options = popup.querySelectorAll('.unicode-style-option');
  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const convertedText = option.getAttribute('data-text');
      handleStyleClick(convertedText);
    });
  });
}

// Hide popup
function hidePopup() {
  if (popup) {
    popup.style.display = 'none';
  }
}

// Handle text selection
function handleSelection() {
  const selection = window.getSelection();

  if (selection.toString().trim().length > 0) {
    // Delay to ensure selection is complete
    setTimeout(() => {
      const currentSelection = window.getSelection();
      if (currentSelection.toString().trim().length > 0) {
        showPopup(currentSelection);
      }
    }, 10);
  } else {
    hidePopup();
  }
}

// Initialize - load enabled state from storage
async function initContentScript() {
  try {
    const result = await chrome.storage.sync.get(['enabled']);
    isEnabled = result.enabled !== undefined ? result.enabled : true;
  } catch (error) {
    console.error('Error loading enabled state:', error);
    isEnabled = true; // Default to enabled
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleEnabled') {
    isEnabled = message.enabled;
    if (!isEnabled) {
      hidePopup();
    }
  }
});

// Event listeners
document.addEventListener('mouseup', handleSelection);
document.addEventListener('keyup', (e) => {
  // Handle keyboard selection (Shift + Arrow keys)
  if (e.shiftKey) {
    handleSelection();
  }
});

// Hide popup when clicking outside
document.addEventListener('mousedown', (e) => {
  if (popup && !popup.contains(e.target)) {
    hidePopup();
  }
});

// Hide popup on scroll
document.addEventListener('scroll', hidePopup);

// Hide popup on window resize
window.addEventListener('resize', hidePopup);

// Initialize on load
initContentScript();
