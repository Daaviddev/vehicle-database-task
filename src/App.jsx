import { observer } from 'mobx-react';

import messagePopupStore from './stores/messagePopupStore';
import MessagePopup from './components/MessagePopup';

import './App.css';

const App = observer(() => (
  <div className="app">
    <MessagePopup messagePopupStore={messagePopupStore} />
    <h1>Vehicle Database</h1>
  </div>
));
export default App;
