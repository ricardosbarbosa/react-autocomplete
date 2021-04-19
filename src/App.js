
import { useState } from 'react';
import * as api from './api/emails';
import './App.css';
import { AutoComplete } from './components';


const getEmails = async (params) => {
  const response = await api.getEmails({
    ...params,
    _sort: "email",
    _order: "asc"
  })
  return {
    list: response?.data?.map(data => data.email),
    total: response.headers["x-total-count"],
  }
}
function App() {
  const [to, setTo] = useState([])
  const [cc, setCc] = useState(["aaron.grady@beier.com", "abbigail.beatty@hotmail.com"])
  
  console.log("to: ", to)
  console.log("cc: ", cc)
  
  return (
    <div className="App">
      <AutoComplete onChange={setTo} value={[]} fetch={getEmails}/>
      <AutoComplete onChange={setCc} value={cc} fetch={getEmails}/>
    </div>
  );
}

export default App;
