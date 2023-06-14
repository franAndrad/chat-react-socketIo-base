import React from 'react'

const Chat = (props) =>{
  
  return (
  <div>
   <h3>Lista chats</h3>
   <ol>
     {props.mensajes.map( (mensaje,key) => (<li>{mensaje.usuario}:{mensaje.mensaje}</li>))}
   </ol>
  </div>

  );
};

export default Chat;

