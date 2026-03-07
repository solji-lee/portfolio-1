import React from 'react';
import { createRoot } from 'react-dom/client';
import { InsightsAdmin } from './components/InsightsAdmin';

const rootElement = document.getElementById('admin-root');
if (rootElement) {
    createRoot(rootElement).render(<InsightsAdmin />);
}
