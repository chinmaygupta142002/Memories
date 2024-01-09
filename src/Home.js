import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';;

const cardStyle = {
  backgroundColor: '#55efc4',
  border: '5px solid #00b894',
  borderRadius: '15px',
  color: '#2d3436',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  margin: '20px',
  width: '300px',
  textAlign: 'left',
};

const memoriesContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  backgroundColor: '#6c5ce7',
  padding: '20px',
  color: '#ecf0f1',
  maxHeight: '60vh',
  overflowY: 'auto',
  width: '50%',
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  border: '5px solid #dfe6e9',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  width: '50%',
  height: '80vh',
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const cardTextStyle = {
  fontSize: '1.2em',
  fontWeight: 'bold',
  marginBottom: '10px',
};

function Home() {
  const [posts, setPosts] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [creator, setCreator] = React.useState('');

  function handleSubmit() {
    axios.post("http://localhost:5000/newMemory", {
      title: title,
      message: message,
      creator: creator
    }).then(
      result => {
        setPosts(prevPosts => [...prevPosts, result.data]);
      }
    ).catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get("http://localhost:5000/").then(
      result => setPosts(result.data)
    ).catch(err => console.log(err));
  }, [posts]);

  function createCard(card) {
    if (!card) return null;
    return (
      <div style={cardStyle} key={card.id}>
        <ul style={{ padding: '0', listStyle: 'none', margin: '0' }}>
          <li style={cardTextStyle}>{card.title}</li>
          <li style={{ marginBottom: '10px' }}>{card.message}</li>
          <li style={{ fontStyle: 'italic' }}>By {card.creator}</li>
          <br /><br />
          <button onClick={() => handleDelete(card.title, card.message, card.creator)}>
            <FaTrash />
          </button>
        </ul>
      </div>
    );
  }

  function handleDelete(title, message, creator) {
    axios.delete("http://localhost:5000/delete", {
      data: { title, message, creator }
    }).then(result => console.log(result))
  }

  return (
    <div style={{ backgroundColor: '#6c5ce7', color: '#ecf0f1', padding: '20px', minHeight: '100vh', display: 'flex' }}>
      <div style={memoriesContainerStyle}>
        <h2 style={{ color: '#000', width: '100%' }}>Memories</h2>
        {posts.map(createCard)}
      </div>
      <div style={{ ...formContainerStyle, marginLeft: '20px', flex: '1', maxWidth: '50%' }}>
        <h2 className="mb-4 text-center" style={{ color: '#000' }}>Add a Memory</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea className="form-control" id="message" value={message} onChange={e => setMessage(e.target.value)} rows="8"></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="creator" className="form-label">Creator:</label>
            <input type="text" className="form-control" id="creator" value={creator} onChange={e => setCreator(e.target.value)} />
          </div>
          <button className="btn btn-warning w-100" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;



