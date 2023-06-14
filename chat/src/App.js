import './App.css';
import Chat from './components/views/Chat';
import {useState, useEffect} from 'react'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes ,setMensajes] = useState([])

  useEffect(()=>{
    socket.on('connect',()=> setIsConnected(true));
    socket.on('chat_message', (data)=>{
      setMensajes(mensajes => [...mensajes,data])
    });

    //Limpieza de eventos par que no se dupliquen ni tenga problemas
    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }
  },[]);

  const enviarMensaje = () =>{
    //Emision de evento
    socket.emit('chat_message',{
      usuario: socket.id,
      mensaje: nuevoMensaje
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Mi chat</h2>
        <p>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</p>
        <Chat mensajes={mensajes}></Chat>
        <div>
          <input type="text" onChange={e => setNuevoMensaje(e.target.value)} ></input>
          <button onClick={enviarMensaje}>Enviar</button>
        </div>
        </header>
    </div>
  );
}

export default App;
