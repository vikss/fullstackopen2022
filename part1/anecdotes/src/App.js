import { useState } from "react";
const App = () => {


  const anecdotesObj = [
    { quote: 'If it hurts, do it more often.', vote: 0 },
    { quote: 'Adding manpower to a late software project makes it later!', vote: 0 },
    { quote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0 },
    { quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
    { quote: 'Premature optimization is the root of all evil.', vote: 0 },
    { quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0 },
    { quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote: 0 }
  ]

  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(anecdotesObj);


  function handleVote() {
    let newObj = { ...anecdotes[selected], vote: anecdotes[selected].vote + 1 };
    let arrayObj = Object.create(anecdotes);
    arrayObj[selected] = newObj;

    setAnecdotes(arrayObj);
  }

  return (
    <div>
      <Anecdote quote={anecdotes[selected].quote} vote={anecdotes[selected].vote} heading="Anecdote of the day"></Anecdote>
      <Button text="vote" handleClick={handleVote}></Button>
      <Button text="next anecdote" handleClick={() => {
        setSelected(nextGen(anecdotes.length))
      }}>
      </Button>
      <HighestVote anecdotes={anecdotes}></HighestVote>


    </div>)

}
const HighestVote = ({ anecdotes }) => {

  let highest = 0;
  let anecdoteHighest;
  for (let i = 0; i < anecdotes.length; i++) {
    if (anecdotes[i].vote > highest) {

      highest = anecdotes[i].vote;
      anecdoteHighest = anecdotes[i];
    }
  }

  if (anecdoteHighest)
    return (<div><h2>Anecdote with most votes</h2>
      <Display quote={anecdoteHighest.quote} vote={anecdoteHighest.vote}></Display></div>)
  else
    return (<div><h2>Anecdote with most votes</h2><p>No vote is given</p></div>)


}
const Anecdote = (props) => {

  return (<div><h2>{props.heading}</h2>
    <Display quote={props.quote} vote={props.vote}></Display></div>)
}

const Display = (props) => {

  return (<><div>{props.quote}</div>
    <div>has {props.vote} votes</div></>);

}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

function nextGen(len) {
  const randomNum = Math.floor(Math.random() * len);
  return randomNum;
}
export default App;
