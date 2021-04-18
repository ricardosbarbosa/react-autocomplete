
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
  const [cc, setCc] = useState(["aaron.grady@beier.com", "abbigail.beatty@hotmail.com"])
  const handleOnChange = (emails) => console.log(emails)
  

  return (
    <div className="App">
      <div className="Grid">
          <span>to: </span>
        <AutoComplete onChange={handleOnChange} value={[]} fetch={getEmails}/>
          <span>cc: </span>
          <AutoComplete onChange={setCc} value={cc} fetch={getEmails}/>
        {/*   <span>cco: </span>
          <AutoComplete onChange={getEmails} value={[]} /> */}
      </div>
    </div>
  );
}

export default App;
