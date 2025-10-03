// Extension popup functionality

// DOM elements
const enableToggle = document.getElementById('enableToggle');
const textInput = document.getElementById('textInput');
const stylesList = document.getElementById('stylesList');
const copyStatus = document.getElementById('copyStatus');

// Style configurations
const styles = [
  { name: 'Bold', key: 'bold' },
  { name: 'Italic', key: 'italic' },
  { name: 'Bold Italic', key: 'boldItalic' },
  { name: 'Monospace', key: 'monospace' },
  { name: 'Script', key: 'script' },
  { name: 'Double-Struck', key: 'doubleStruck' },
  { name: 'Fraktur', key: 'fraktur' },
  { name: 'Bold Fraktur', key: 'boldFraktur' },
  { name: 'Sans-Serif', key: 'sansSerif' },
  { name: 'Sans-Serif Bold', key: 'sansSerifBold' },
  { name: 'Sans-Serif Italic', key: 'sansSerifItalic' },
  { name: 'Sans-Serif Bold Italic', key: 'sansSerifBoldItalic' }
];

// Initialize popup
async function init() {
  // Load saved toggle state
  const result = await chrome.storage.sync.get(['enabled']);
  const isEnabled = result.enabled !== undefined ? result.enabled : true;
  enableToggle.checked = isEnabled;

  // Add event listeners
  enableToggle.addEventListener('change', handleToggleChange);
  textInput.addEventListener('input', handleTextInput);

  // Focus on text input
  textInput.focus();
}

// Handle toggle state change
async function handleToggleChange(e) {
  const isEnabled = e.target.checked;
  await chrome.storage.sync.set({ enabled: isEnabled });

  // Send message to all tabs to update state
  const tabs = await chrome.tabs.query({});
  tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'toggleEnabled',
      enabled: isEnabled
    }).catch(() => {
      // Ignore errors for tabs where content script isn't loaded
    });
  });
}

// Handle text input
function handleTextInput(e) {
  const text = e.target.value.trim();

  if (!text) {
    showEmptyState();
    return;
  }

  updateStylesList(text);
}

// Show empty state
function showEmptyState() {
  stylesList.innerHTML = `
    <div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      <p>Enter text above to see Unicode styles</p>
    </div>
  `;
}

// Update styles list with conversions
function updateStylesList(text) {
  const conversions = UnicodeConverter.getAllConversions(text);
  const isUnicodeText = UnicodeConverter.isUnicode(text);

  stylesList.innerHTML = '';

  // Show "Normal Text" option at the top if text contains Unicode
  if (isUnicodeText) {
    const normalText = UnicodeConverter.toNormal(text);

    const normalItem = document.createElement('div');
    normalItem.className = 'style-item style-item-normal';
    normalItem.dataset.text = normalText;
    normalItem.innerHTML = `
      <div class="style-name">✨ Normal Text</div>
      <div class="style-preview">${escapeHtml(normalText)}</div>
    `;

    normalItem.addEventListener('click', () => copyToClipboard(normalText, normalItem));
    stylesList.appendChild(normalItem);
  }

  // Show all Unicode style options
  styles.forEach(style => {
    const convertedText = conversions[style.key];

    const styleItem = document.createElement('div');
    styleItem.className = 'style-item';
    styleItem.dataset.text = convertedText;
    styleItem.innerHTML = `
      <div class="style-name">${style.name}</div>
      <div class="style-preview">${escapeHtml(convertedText)}</div>
    `;

    styleItem.addEventListener('click', () => copyToClipboard(convertedText, styleItem));

    stylesList.appendChild(styleItem);
  });
}

// Copy text to clipboard
async function copyToClipboard(text, element) {
  try {
    await navigator.clipboard.writeText(text);

    // Visual feedback
    element.classList.add('copied');
    setTimeout(() => element.classList.remove('copied'), 500);

    // Show status message
    showCopyStatus('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
    showCopyStatus('Failed to copy', true);
  }
}

// Show copy status message
function showCopyStatus(message, isError = false) {
  copyStatus.textContent = message;
  copyStatus.style.color = isError ? '#dc3545' : '#28a745';
  copyStatus.classList.add('show');

  setTimeout(() => {
    copyStatus.classList.remove('show');
  }, 2000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
