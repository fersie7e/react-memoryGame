
import { useEffect, useState } from 'react';
import './App.css';
import './components/SingleCard'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched : false},
  {"src": "/img/potion-1.png", matched : false},
  {"src": "/img/ring-1.png", matched : false},
  {"src": "/img/scroll-1.png", matched : false},
  {"src": "/img/shield-1.png", matched : false},
  {"src": "/img/sword-1.png", matched : false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  //mezclar las cartas
  //Duplicar el array de imagenes expandiendo dos veces el array de imagenes
  //Con el metodo sort ordenamos la lista de manera aleatoria, 
  //si el resultado es negativo el orden se mantiene, si es positivo cambia el orden de los elementos
  //Usamos map para devolver un nuevo array en el cual expandimos todos los valores del array y añadimos el campo id
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  useEffect(() =>{
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //Start the game automatically
  useEffect(()=>{shuffleCards()}, [])

  

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>New game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
