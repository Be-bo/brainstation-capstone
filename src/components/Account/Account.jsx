import {useState, useEffect} from 'react';
import axios from 'axios';
import './Account.scss';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import GeneratedItem from '../GeneratedItem/GeneratedItem';

function Account() {
  const[historyItems, setHistoryItems] = useState([]);

  useEffect(()=>{
    async function fetchHistory(){
      const response = await axios.get('http://3.145.198.110:80/account/history/test-user');
      setHistoryItems(response.data);
    }
    fetchHistory();
  }, []);


  return (
    <div>
      <NavBar isPlayground={false} />

      <section className='account'>

        <div className='account__history-grid'>
          {historyItems?.map((historyItem, index) => {
            return <GeneratedItem key={index} itemData={historyItem}/>
          })}
        </div>

      </section>
      
      <Footer />
    </div>
  )
}

export default Account
