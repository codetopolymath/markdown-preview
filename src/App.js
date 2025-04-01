// App.js - Main application component
import React from 'react';
import './App.css';
import MarkdownPreviewer from './component/MarkdownPreviewer';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Markdown Previewer</h1>
        <p>Type Markdown on the left and see the preview on the right.</p>
      </header>

      <MarkdownPreviewer />

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