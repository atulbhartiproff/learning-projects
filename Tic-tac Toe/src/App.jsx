import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

// export default App 

function Square({value, onSquareClick})
{
  return <button className='Square' onClick={onSquareClick}>{value}</button>
}

function Board({XisNext,squares,onplay})
{
  const winner= calculateWinner(squares);
  let status;
  if(winner)
  {
    status="Winner: "+ winner;
  }
  else
  {
    status="Next player: "+ (XisNext?"X":"O");
  }

  function handleClick(i){
    if(squares[i] || calculateWinner(squares))
    {
      return;
    }
    const nextsquares= squares.slice();
    if(XisNext){
      nextsquares[i]="X";
    }
    else{
      nextsquares[i]="O";
    }
    onplay(nextsquares)
  }
  return(
  <>
    <div className='status'>{status}</div>
    <div class="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>

    <div class="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>

    <div class="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game()
{
  const [history, setHistory]=useState([Array(9).fill(null)]);
  const [currentmove, setCurrentmove]= useState(0);
  const XisNext = currentmove%2==0;
  const currentSquares= history[currentmove];

  function jumpto(nextMove)
  {
    setCurrentmove(nextMove);
  }

  const moves= history.map((squares,move) => {
    let description;
    if(move>0){
      description='Go to move #'+move;
    }
    else{
      description='Go to move start';
    }
    return(
      <li key={move}>
        <button onClick={()=> jumpto(move)}>{description}</button>
      </li>
    );
  });

  function handleplay(nextsquares)
  {
    const nextHistory=[...history.slice(0,currentmove+1),nextsquares];
    setHistory(nextHistory);
    setCurrentmove(nextHistory.length-1)
  }

  return(
    <>
    <div className="game">
      <div className='gameboard'>
        <Board XisNext={XisNext} squares={currentSquares} onplay={handleplay} />
      </div>
      <div className='gameinfo'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
    
    
    </>
  )
}

export default Game
