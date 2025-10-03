// Unicode character mappings for different text styles
const UnicodeConverter = {
  // Unicode ranges for different styles
  bold: {
    upper: 0x1D400 - 0x41,  // A-Z
    lower: 0x1D41A - 0x61,  // a-z
    digit: 0x1D7CE - 0x30   // 0-9
  },
  italic: {
    upper: 0x1D434 - 0x41,
    lower: 0x1D44E - 0x61,
    // Note: h (0x210E) has special handling
    special: { 'h': '\u210E' }
  },
  boldItalic: {
    upper: 0x1D468 - 0x41,
    lower: 0x1D482 - 0x61
  },
  script: {
    upper: 0x1D49C - 0x41,
    lower: 0x1D4B6 - 0x61,
    // Special characters that don't follow the pattern
    special: {
      'B': '\u212C', 'E': '\u2130', 'F': '\u2131', 'H': '\u210B',
      'I': '\u2110', 'L': '\u2112', 'M': '\u2133', 'R': '\u211B',
      'e': '\u212F', 'g': '\u210A', 'o': '\u2134'
    }
  },
  monospace: {
    upper: 0x1D670 - 0x41,
    lower: 0x1D68A - 0x61,
    digit: 0x1D7F6 - 0x30
  },
  doubleStruck: {
    upper: 0x1D538 - 0x41,
    lower: 0x1D552 - 0x61,
    digit: 0x1D7D8 - 0x30,
    special: {
      'C': '\u2102', 'H': '\u210D', 'N': '\u2115', 'P': '\u2119',
      'Q': '\u211A', 'R': '\u211D', 'Z': '\u2124'
    }
  },
  fraktur: {
    upper: 0x1D504 - 0x41,
    lower: 0x1D51E - 0x61,
    special: {
      'C': '\u212D', 'H': '\u210C', 'I': '\u2111', 'R': '\u211C', 'Z': '\u2128'
    }
  },
  boldFraktur: {
    upper: 0x1D56C - 0x41,
    lower: 0x1D586 - 0x61
  },
  sansSerif: {
    upper: 0x1D5A0 - 0x41,
    lower: 0x1D5BA - 0x61,
    digit: 0x1D7E2 - 0x30
  },
  sansSerifBold: {
    upper: 0x1D5D4 - 0x41,
    lower: 0x1D5EE - 0x61,
    digit: 0x1D7EC - 0x30
  },
  sansSerifItalic: {
    upper: 0x1D608 - 0x41,
    lower: 0x1D622 - 0x61
  },
  sansSerifBoldItalic: {
    upper: 0x1D63C - 0x41,
    lower: 0x1D656 - 0x61
  },

  /**
   * Convert a character using the specified style mapping
   */
  convertChar(char, style) {
    const code = char.charCodeAt(0);

    // Check for special character mappings first
    if (style.special && style.special[char]) {
      return style.special[char];
    }

    // Uppercase A-Z
    if (code >= 0x41 && code <= 0x5A && style.upper) {
      return String.fromCodePoint(code + style.upper);
    }

    // Lowercase a-z
    if (code >= 0x61 && code <= 0x7A && style.lower) {
      return String.fromCodePoint(code + style.lower);
    }

    // Digits 0-9
    if (code >= 0x30 && code <= 0x39 && style.digit) {
      return String.fromCodePoint(code + style.digit);
    }

    // Return original character if no conversion available
    return char;
  },

  /**
   * Check if a character is a Unicode styled character
   */
  isUnicodeChar(char) {
    const code = char.codePointAt(0);

    // Mathematical Alphanumeric Symbols range
    if (code >= 0x1D400 && code <= 0x1D7FF) {
      return true;
    }

    // Special characters used in various styles
    const specialChars = [
      0x210E, 0x212C, 0x2130, 0x2131, 0x210B, 0x2110, 0x2112,
      0x2133, 0x211B, 0x212F, 0x210A, 0x2134, 0x2102, 0x210D,
      0x2115, 0x2119, 0x211A, 0x211D, 0x2124, 0x212D, 0x210C,
      0x2111, 0x211C, 0x2128
    ];

    return specialChars.includes(code);
  },

  /**
   * Check if text contains any Unicode styled characters
   */
  isUnicode(text) {
    return text.split('').some(char => this.isUnicodeChar(char));
  },

  /**
   * Convert a Unicode character back to normal ASCII
   */
  toNormalChar(char) {
    const code = char.codePointAt(0);

    // Reverse mapping for special characters
    const specialReverse = {
      '\u210E': 'h', // italic h
      '\u212C': 'B', '\u2130': 'E', '\u2131': 'F', '\u210B': 'H',
      '\u2110': 'I', '\u2112': 'L', '\u2133': 'M', '\u211B': 'R',
      '\u212F': 'e', '\u210A': 'g', '\u2134': 'o',
      '\u2102': 'C', '\u210D': 'H', '\u2115': 'N', '\u2119': 'P',
      '\u211A': 'Q', '\u211D': 'R', '\u2124': 'Z',
      '\u212D': 'C', '\u210C': 'H', '\u2111': 'I', '\u211C': 'R', '\u2128': 'Z'
    };

    if (specialReverse[char]) {
      return specialReverse[char];
    }

    // Check all style ranges
    const ranges = [
      // Bold: A-Z (0x1D400-0x1D419), a-z (0x1D41A-0x1D433), 0-9 (0x1D7CE-0x1D7D7)
      { start: 0x1D400, end: 0x1D419, base: 0x41 }, // Bold uppercase
      { start: 0x1D41A, end: 0x1D433, base: 0x61 }, // Bold lowercase
      { start: 0x1D7CE, end: 0x1D7D7, base: 0x30 }, // Bold digits

      // Italic: A-Z, a-z
      { start: 0x1D434, end: 0x1D44D, base: 0x41 }, // Italic uppercase
      { start: 0x1D44E, end: 0x1D467, base: 0x61 }, // Italic lowercase

      // Bold Italic: A-Z, a-z
      { start: 0x1D468, end: 0x1D481, base: 0x41 },
      { start: 0x1D482, end: 0x1D49B, base: 0x61 },

      // Script: A-Z, a-z
      { start: 0x1D49C, end: 0x1D4B5, base: 0x41 },
      { start: 0x1D4B6, end: 0x1D4CF, base: 0x61 },

      // Fraktur: A-Z, a-z
      { start: 0x1D504, end: 0x1D51D, base: 0x41 },
      { start: 0x1D51E, end: 0x1D537, base: 0x61 },

      // Double-struck: A-Z, a-z, 0-9
      { start: 0x1D538, end: 0x1D551, base: 0x41 },
      { start: 0x1D552, end: 0x1D56B, base: 0x61 },
      { start: 0x1D7D8, end: 0x1D7E1, base: 0x30 },

      // Bold Fraktur: A-Z, a-z
      { start: 0x1D56C, end: 0x1D585, base: 0x41 },
      { start: 0x1D586, end: 0x1D59F, base: 0x61 },

      // Sans-serif: A-Z, a-z, 0-9
      { start: 0x1D5A0, end: 0x1D5B9, base: 0x41 },
      { start: 0x1D5BA, end: 0x1D5D3, base: 0x61 },
      { start: 0x1D7E2, end: 0x1D7EB, base: 0x30 },

      // Sans-serif bold: A-Z, a-z, 0-9
      { start: 0x1D5D4, end: 0x1D5ED, base: 0x41 },
      { start: 0x1D5EE, end: 0x1D607, base: 0x61 },
      { start: 0x1D7EC, end: 0x1D7F5, base: 0x30 },

      // Sans-serif italic: A-Z, a-z
      { start: 0x1D608, end: 0x1D621, base: 0x41 },
      { start: 0x1D622, end: 0x1D63B, base: 0x61 },

      // Sans-serif bold italic: A-Z, a-z
      { start: 0x1D63C, end: 0x1D655, base: 0x41 },
      { start: 0x1D656, end: 0x1D66F, base: 0x61 },

      // Monospace: A-Z, a-z, 0-9
      { start: 0x1D670, end: 0x1D689, base: 0x41 },
      { start: 0x1D68A, end: 0x1D6A3, base: 0x61 },
      { start: 0x1D7F6, end: 0x1D7FF, base: 0x30 }
    ];

    for (const range of ranges) {
      if (code >= range.start && code <= range.end) {
        return String.fromCharCode(range.base + (code - range.start));
      }
    }

    // Return original character if not a Unicode styled character
    return char;
  },

  /**
   * Convert Unicode styled text back to normal ASCII
   */
  toNormal(text) {
    return text.split('').map(char => this.toNormalChar(char)).join('');
  },

  /**
   * Normalize text: convert Unicode to ASCII before converting to new style
   * This allows Unicode-to-Unicode conversions (e.g., bold → italic)
   */
  normalize(text) {
    return this.toNormal(text);
  },

  /**
   * Convert text to specified Unicode style
   * Automatically normalizes Unicode text first
   */
  convert(text, styleName) {
    const style = this[styleName];
    if (!style) return text;

    // Normalize Unicode text to ASCII first (enables Unicode-to-Unicode conversion)
    const normalizedText = this.normalize(text);

    return normalizedText.split('').map(char => this.convertChar(char, style)).join('');
  },

  /**
   * Get all available conversions for a given text
   */
  getAllConversions(text) {
    return {
      bold: this.convert(text, 'bold'),
      italic: this.convert(text, 'italic'),
      boldItalic: this.convert(text, 'boldItalic'),
      script: this.convert(text, 'script'),
      monospace: this.convert(text, 'monospace'),
      doubleStruck: this.convert(text, 'doubleStruck'),
      fraktur: this.convert(text, 'fraktur'),
      boldFraktur: this.convert(text, 'boldFraktur'),
      sansSerif: this.convert(text, 'sansSerif'),
      sansSerifBold: this.convert(text, 'sansSerifBold'),
      sansSerifItalic: this.convert(text, 'sansSerifItalic'),
      sansSerifBoldItalic: this.convert(text, 'sansSerifBoldItalic')
    };
  }
};
