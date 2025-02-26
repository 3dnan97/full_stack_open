import { useState } from 'react'

/**
 * Component for displaying an anecdote and its associated vote count.
 * 
 * @param {string} anecdote - The text of the anecdote.
 * @param {number} votes - The number of votes for the anecdote.
 * 
 * @returns {JSX.Element} The rendered anecdote and vote count.
 */
const Anecdote = ({anecdote, votes}) => {
  return(
    <>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
    </>
  )
}

const App = () => {
  // List of anecdotes to be displayed
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  /**
   * Generates a random index for selecting an anecdote from the list
   * 
   * @returns {number} A random index between 0 and the length of the anecdotes array (exclusive).
   */
  const getRandomAnecdoteIndex=()=> Math.floor(Math.random() * anecdotes.length)
  
  // State hooks to manage the selected anecdote, votes, and the index of most voted anecdote
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [highestVotedIndex, setHighestVotedIndex] = useState(0)
  
  /**
   * Handles the action when the "Next Anecdote" button is clicked.
   * Sets a new random anecdote to be displayed.
   */
  const handleNextBtn = ()=> setSelected(getRandomAnecdoteIndex())
  
  /**
   * Handles the action when the "Vote" button is clicked.
   * Increments the vote count for the current selected anecdote.
   * Also updates the most voted anecdote.
   */
  const handleVoteBtn = ()=> {
    // Create a copy of the votes array to avoid direct state mutation
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
    indexOfMostVoted(copy)
  }

  /**
   * Determines the index of the anecdote with the most votes.
   * 
   * @param {number[]} votesCopy - A copy of the votes array.
   */
  const indexOfMostVoted=(votesCopy)=>{
    const maxNumber = Math.max(...votesCopy)
    setHighestVotedIndex(votesCopy.indexOf(maxNumber))
  }
  
  return (
    <>
    <h1>Anecdote of the day</h1>
    <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
    <button onClick={handleNextBtn}>next anecdote</button>
    <button onClick={handleVoteBtn}>vote</button>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdote={anecdotes[highestVotedIndex]} votes={votes[highestVotedIndex]} />
    </>
  )
}

export default App