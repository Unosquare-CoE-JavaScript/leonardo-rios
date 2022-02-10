import React, {useState} from 'react';
import './App.css';
import Button from './components/Button';


const App: React.FC = () => {
  const [isChecked, setCheck] = useState(false);
  const onCheckBoxClick = () => {
    setCheck(check=> !check);
  }

  return (
    <div>
      <input type={'checkbox'} onClick={onCheckBoxClick}/>
      <Button disabled={isChecked} primaryColor='mediumVioletRed' secondaryColor='midnightBlue'/>
    </div>
  )
}

export default App;
