import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { GameProvider } from './gameContextProvider';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);