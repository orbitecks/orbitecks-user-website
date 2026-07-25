import React from 'react';

/**
 * Recursively scans any object, array, or string and replaces all
 * occurrences of literal '\n' strings (e.g. from database text fields)
 * with actual newline characters.
 */
export const formatDataNewlines = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return obj.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n');
  }
  
  if (Array.isArray(obj)) {
    return obj.map(formatDataNewlines);
  }
  
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      newObj[key] = formatDataNewlines(obj[key]);
    }
    return newObj;
  }
  
  return obj;
};

/**
 * Parses and formats legal policies content string into structured React nodes.
 * Automatically recognizes headers starting with "1. ", "2. ", etc., 
 * or "## ", rendering them with premium styled heading tags.
 * Also parses double quoted paragraphs as italicized highlight quotes.
 */
export const renderPolicyContent = (content: string): React.ReactNode => {
  if (!content) return null;

  // Split content by double returns to identify sections/paragraphs
  const blocks = content.split('\n\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, color: 'var(--dark2)', lineHeight: 1.8 }}>
      {blocks.map((block, idx) => {
        const lines = block.trim().split('\n');
        if (lines.length === 0 || !lines[0]) return null;

        const firstLine = lines[0].trim();
        
        // Detect section headers (e.g., "1. Acceptance of Terms" or "## Acceptance")
        const isHeader = /^(?:\d+\.|\#\#)\s+/.test(firstLine);

        if (isHeader) {
          const headerText = firstLine.replace(/^\#\#\s+/, '');
          const bodyText = lines.slice(1).join('\n');

          return (
            <div key={idx}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 14 }}>
                {headerText}
              </h2>
              {bodyText && (
                <p style={{ color: 'var(--gray-400)' }}>
                  {bodyText}
                </p>
              )}
            </div>
          );
        }

        // Detect quote blocks (wrapped in double quotes)
        const isQuote = firstLine.startsWith('"') && firstLine.endsWith('"');
        if (isQuote) {
          return (
            <div key={idx} style={{
              borderLeft: '4px solid var(--purple)', paddingLeft: 20,
              fontSize: 16, fontStyle: 'italic', color: 'var(--dark)'
            }}>
              {firstLine}
            </div>
          );
        }

        // Standard paragraphs
        return (
          <p key={idx} style={{ color: 'var(--gray-400)' }}>
            {block}
          </p>
        );
      })}
    </div>
  );
};

/**
 * Recursively sanitizes any input (string, array, or object) by removing
 * HTML tag blocks and blocking inline scripts, javascript: links, and event attributes.
 */
export const sanitizeInput = (val: any): any => {
  if (val === null || val === undefined) return val;
  
  if (typeof val === 'string') {
    // Strip all HTML tag blocks (<script>...</script>, <iframe>...</iframe>, etc.)
    let clean = val.replace(/<[^>]*>/g, '');
    // Remove javascript: links case-insensitively
    clean = clean.replace(/javascript:/gi, '');
    // Remove HTML event attributes (onload=, onerror=, etc.)
    clean = clean.replace(/on\w+\s*=/gi, '');
    return clean;
  }
  
  if (Array.isArray(val)) {
    return val.map(sanitizeInput);
  }
  
  if (typeof val === 'object') {
    const cleaned: any = {};
    for (const key of Object.keys(val)) {
      cleaned[key] = sanitizeInput(val[key]);
    }
    return cleaned;
  }
  
  return val;
};
