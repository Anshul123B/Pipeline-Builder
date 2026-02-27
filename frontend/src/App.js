import { Toolbar } from './components/Toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

import './styles/theme.css';

function App() {
  return (
    <div className="app-container">
      <Toolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
