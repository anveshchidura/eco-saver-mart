import React from 'react';
import './Convo.css';

const ChatPanel = () => {
  return (
    <div className="chatPanelContainer">
      <header className="chatPanelHeader">
        <h1>Conversation</h1>
      </header>
      <main className="chatPanelMain">
        <p>Welcome to the chat panel.</p>
        {/* Add more conversation content here */}
      </main>
      <footer className="chatPanelFooter">
        <p>Chat panel footer content.</p>
      </footer>
    </div>
  );
}

export default ChatPanel;
