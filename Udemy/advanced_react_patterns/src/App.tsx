import React, { useState } from 'react';
import './App.css';
import MediumClap, { useClapState, Context } from './components/molecules/MediumClap/MediumClap';
import ClapIcon from './components/atoms/ClapIcon/ClapIcon';
import ClapCount from './components/atoms/ClapCount/ClapCount';
import ClapTotal from './components/atoms/ClapTotal/ClapTotal';

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: true
};

const App = () => {
  const [timesClapped, setTimeClapped] = useState(0);
  const isClappedTooMuch = timesClapped >= 7;
  const reducer = (state: Context, action: any) => {
    if (action.type === useClapState.types['clap'] && isClappedTooMuch) {
      return state;
    }
    return useClapState.reducer(state, action);
  }
  const { clapState, updateClapState, resetState } = useClapState(userInitialState, reducer);
  return < div className="App" >
    <MediumClap values={clapState} onClap={() => { setTimeClapped(timesClapped + 1); updateClapState(); }}>
      <ClapIcon />
      <ClapCount />
      <ClapTotal />
    </MediumClap >

    <MediumClap >
      <ClapIcon />
      <ClapCount />
      <ClapTotal />
    </MediumClap >
    <section>
      <button onClick={resetState} className='resetBtn'>
        reset
      </button>
      <pre className='resetMsg'>
        {JSON.stringify(clapState)}
      </pre>
      <pre style={{ color: 'red' }}>
        {isClappedTooMuch ? "you have clapped too much. Don't be so generous!" : ""}
      </pre>
    </section>
  </div >
}

export default App;
