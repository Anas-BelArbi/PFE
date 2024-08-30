import React, { useState } from 'react';
import { Button, Input, ListGroup, ListGroupItem, Card, CardBody, CardTitle } from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import robotIcon from './chat-bot.png'; // Ensure you have a robot icon image in your project

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleOpen = () => setOpen(!open);

  const handleSend = () => {
    if (input.trim()) {
        // Add the user's message to the chat
        setMessages([...messages, { text: input, fromUser: true }]);

        // Call the new endpoint
        fetch('http://localhost:5001/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: input }),
        })
        .then(response => response.json())
        .then(data => {
            // Add the bot's response to the chat
            setMessages(messages => [...messages, { text: data.response, fromUser: false }]);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Clear the input field
        setInput('');
    }
};


  return (
    <>
      <Button color="primary" className="chatbot-button" onClick={toggleOpen}>
        <i className="bi bi-chat-dots"></i>
      </Button>

      {open && (
        <div className="chatbot-conversation">
          <Card>
            <CardBody>
              <div className="chatbot-header">
              <img src={robotIcon} alt="Robot" className="robot-icon" />
                <center><CardTitle tag="h5" style={{color:'#13274c'}}>Chatbot</CardTitle></center>
            
              </div>
              <div className="chatbot-messages">
                <ListGroup>
                  {messages.map((msg, index) => (
                    <ListGroupItem key={index} className={msg.fromUser ? 'user-message' : 'bot-message'}>
                      {msg.text}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
              <div className="chatbot-input">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button color="primary" outline onClick={handleSend}>Send</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <style jsx>{`
        .chatbot-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          border-radius: 50%;
          padding: 12px;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .chatbot-conversation {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 300px;
          max-height: 400px;
          z-index: 1000;
        }
        .chatbot-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .robot-icon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .chatbot-messages {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 10px;
        }
        .chatbot-input {
          display: flex;
        }
        .chatbot-input input {
          flex: 1;
          margin-right: 5px;
        }
        .user-message {
          text-align: right;
          background-color: #d1e7dd;
          border: none;
          margin-bottom: 5px;
        }
        .bot-message {
          text-align: left;
          background-color: #f8d7da;
          border: none;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
