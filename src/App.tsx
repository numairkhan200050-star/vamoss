import { supabase } from './lib/supabase';

function App() {
  console.log("Supabase Client:", supabase);
  return <div>Testing Supabase Connection</div>;
}

export default App;
