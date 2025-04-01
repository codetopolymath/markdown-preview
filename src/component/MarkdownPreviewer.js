// components/MarkdownPreviewer/MarkdownPreviewer.js
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './MarkdownPreviewer.css';
import { sampleMarkdown } from './sampleMarkdown';

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

function MarkdownPreviewer() {
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
    <>
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
    </>
  );
}

export default MarkdownPreviewer;