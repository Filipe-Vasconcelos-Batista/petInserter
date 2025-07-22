import ReactDOM from 'react-dom/client';
import './index.css';
import App from './src/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
            <div className="bg-white">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <App/>
                </div>
            </div>
                );

