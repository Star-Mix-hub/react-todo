import "./styles/App.css";

import {v4 as uuidv4 } from "uuid";
import randomColor from 'randomcolor';
import Draggable, {DraggableCore} from 'react-draggable';
import {useState,useEffect} from "react";





function App() {
  const [item,setItem] = useState("");
  const [items,setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  )

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  const newItem = () =>{
    if(item.trim() !== ""){
      const newItem = {
        id: uuidv4(), 
        item,
        color:randomColor({
          luminosity: 'light',
        }),
        defaultPos:{
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem("")
    }else{
      alert("Заданий нет")
    }
  }

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (data,index) => {
    const newArray = [...items];
    newArray[index].defaultPos = {
      x: data.x, y:data.y
    }
    setItems(newArray)
  }
      
  return(
    <div>
    <div className="wrapper">
      <input 
      value={item}
      className="input"
      type="text"
      placeholder="Write something"
      onChange={(e) => setItem(e.target.value)} 
       />
      <button className="btn" onClick={newItem}>Add</button>
    </div>
    {items.map((item, index) => {
      return(
        <Draggable
          key={index}
          defaultPosition={item.defaultPos}
          onStop={(_,data) => {
            updatePos(data,index)
          }}
        >

          <div className="todo-item" style={{backgroundColor: item.color}}>
            {`${item.item}`}
            <button 
            className="delete"
            onClick={() => deleteNote(item.id)}
            >X</button>
          </div>

        </Draggable>
      )
    })}
    </div>
  )
}



export default App;
