import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/index.css';
import store from './store/store';
import App from './App';

const root = document.getElementById('root');
if (root) {
  const rootElement = createRoot(root);
  rootElement.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
