import React from 'react';

export default function Chats(props) {
  return (
    <div>
      <div>{props.channel}</div>
      <div>messages</div>
      {props.messages.map((message) => {
        return <div key={message.id}>{message.uid}: {message.content}</div>
      })}
      <textarea onChange={(event) => { props.setContent(event.target.value); }} value={props.content}></textarea>
      <button className="button" onClick={props.onSend}>Send</button>
      <button className="button" onClick={props.onExit}>Leave</button>
    </div>
  );
}
