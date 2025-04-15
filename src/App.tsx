import './App.css'
import Card from "./components/Card";


function App() {

  return (
    <>
      <div className="p-4 flex flex-row gap-4">
        <Card suit="hearts" rank="A"/>
        <Card suit="spades" rank="K"/>
        <Card suit="clubs" rank="7" faceUp={false}/>
      </div>
    </>
  )
}

export default App
