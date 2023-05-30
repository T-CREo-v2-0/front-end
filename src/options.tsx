import React from 'react';
import ReactDOM from 'react-dom/client';

import { OptionsForm } from "./components/Options/OptionsForm";
import './assets/styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <OptionsForm />
  </React.StrictMode>
);
