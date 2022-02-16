
import './App.css';
import MediumClap, { useClapState } from './components/molecules/MediumClap/MediumClap';
import ClapIcon from './components/atoms/ClapIcon/ClapIcon';
import ClapCount from './components/atoms/ClapCount/ClapCount';
import ClapTotal from './components/atoms/ClapTotal/ClapTotal';

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: true
};

const App = () => {
  const { clapState, updateClapState, resetState } = useClapState(userInitialState);
  return < div className="App" >
    <MediumClap values={clapState} onClap={updateClapState}>
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
    </section>
  </div >
}

export default App;
