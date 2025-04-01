// App.js - Main component for the Markdown Previewer
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

// Configure marked with GitHub Flavored Markdown settings
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'heading-',
  mangle: false,
  pedantic: false,
  sanitize: false, // We'll use DOMPurify instead
  silent: false,
  smartypants: false,
  xhtml: false
});

// Sample markdown for the editor
const sampleMarkdown = `# GitHub Flavored Markdown

## Basic Syntax

### Headers

# H1
## H2
### H3
#### H4
##### H5
###### H6

### Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

### Lists

#### Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

#### Ordered

1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b

### Images

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### Links

[GitHub](http://github.com)

### Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax.

### Inline code

I think you should use an \`<addr>\` element here instead.

### Code blocks

\`\`\`javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
\`\`\`

### Task Lists

- [x] This is a complete item
- [ ] This is an incomplete item

### Tables

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

### Strikethrough

~~Strikethrough~~
`;

function App() {
  // State for the markdown input
  const [markdown, setMarkdown] = useState(() => {
    // Try to load from localStorage or use sample
    return localStorage.getItem('markdown-content') || sampleMarkdown;
  });
  
  // State for the preview mode (split or fullscreen)
  const [previewMode, setPreviewMode] = useState('split');
  
  // State for notification message
  const [notification, setNotification] = useState('');

  // Save markdown to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('markdown-content', markdown);
  }, [markdown]);

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle text input change
  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  // Convert markdown to HTML and sanitize
  const getHtml = () => {
    const rawHtml = marked.parse(markdown);
    return DOMPurify.sanitize(rawHtml);
  };

  // Clear the editor
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the editor?')) {
      setMarkdown('');
    }
  };

  // Load sample markdown
  const handleLoadSample = () => {
    setMarkdown(sampleMarkdown);
  };

  // Copy HTML to clipboard
  const handleCopyHtml = () => {
    const html = getHtml();
    navigator.clipboard.writeText(html)
      .then(() => {
        setNotification('HTML Copied to Clipboard!');
      })
      .catch(err => {
        setNotification('Failed to copy HTML!');
        console.error('Failed to copy: ', err);
      });
  };

  // Toggle preview mode
  const handleToggleView = () => {
    setPreviewMode(previewMode === 'split' ? 'preview' : previewMode === 'preview' ? 'editor' : 'split');
  };

  // Get the next view mode label
  const getNextViewLabel = () => {
    if (previewMode === 'split') return 'Show Preview';
    if (previewMode === 'preview') return 'Show Editor';
    return 'Split View';
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Markdown Previewer</h1>
        <p>Type Markdown on the left and see the preview on the right.</p>
      </header>

      <div className={`editor-container mode-${previewMode}`}>
        {/* Editor Panel - Hidden in preview mode */}
        <div className={`panel editor-panel ${previewMode === 'preview' ? 'hidden' : ''}`}>
          <div className="panel-header">
            <span>Markdown</span>
            <div className="toolbar">
              <button onClick={handleClear}>Clear</button>
              <button onClick={handleLoadSample}>Load Sample</button>
            </div>
          </div>
          <div className="panel-content">
            <textarea
              id="markdown-input"
              value={markdown}
              onChange={handleInputChange}
              placeholder="Type your Markdown here..."
            />
          </div>
        </div>

        {/* Preview Panel - Hidden in editor mode */}
        <div className={`panel preview-panel ${previewMode === 'editor' ? 'hidden' : ''}`}>
          <div className="panel-header">
            <span>Preview</span>
            <div className="toolbar">
              <button onClick={handleCopyHtml}>Copy HTML</button>
              <button onClick={handleToggleView}>{getNextViewLabel()}</button>
            </div>
          </div>
          <div className="panel-content">
            <div 
              id="preview" 
              dangerouslySetInnerHTML={{ __html: getHtml() }}
            />
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <footer>
        <p>
          Built with ❤️ using React and Marked.js | 
          <a href="https://github.com/yourusername/markdown-previewer" target="_blank" rel="noopener noreferrer">
            Source Code
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;