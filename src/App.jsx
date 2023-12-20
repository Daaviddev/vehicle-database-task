import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import messagePopupStore from './stores/messagePopupStore';
import MessagePopup from './components/MessagePopup';

import './App.css';

// Lazy load the pages
const VehicleMakePage = lazy(() => import('./pages/VehicleMakePage'));
const VehicleModelPage = lazy(() => import('./pages/VehicleModelPage'));

const App = observer(() => (
  <div className="app">
    <div className="main-content">
      <MessagePopup messagePopupStore={messagePopupStore} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<VehicleMakePage />} />
          <Route path="/vehicle-makes" element={<VehicleMakePage />} />
          <Route path="/vehicle-models" element={<VehicleModelPage />} />
        </Routes>
      </Suspense>
    </div>
  </div>
));

export default App;
