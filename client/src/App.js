import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [talks, setTalks] = useState([]);
  const [newTalk, setNewTalk] = useState({ title: '', presenter: '', summary: '' });
  const [newComment, setNewComment] = useState({ talkTitle: '', author: '', message: '' });

  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    const response = await axios.get('https://skill-sharing.onrender.com/talks');
    setTalks(response.data);
  };

  const handleNewTalk = async (e) => {
    e.preventDefault();
    await axios.put(`https://skill-sharing.onrender.com/talks/${newTalk.title}`, {
      presenter: newTalk.presenter,
      summary: newTalk.summary
    });
    setNewTalk({ title: '', presenter: '', summary: '' });
    fetchTalks();
  };

  const handleNewComment = async (e) => {
    e.preventDefault();
    await axios.post(`https://skill-sharing.onrender.com/talks/${newComment.talkTitle}/comments`, {
      author: newComment.author,
      message: newComment.message
    });
    setNewComment({ talkTitle: '', author: '', message: '' });
    fetchTalks();
  };

  const handleDeleteTalk = async (title) => {
    await axios.delete(`https://skill-sharing.onrender.com/talks/${title}`);
    fetchTalks();
  };

  return (
    <div className="App">
      <h1>Skill Sharing</h1>
      
      <h2>Submit a Talk</h2>
      <form onSubmit={handleNewTalk}>
        <input
          type="text"
          placeholder="Title"
          value={newTalk.title}
          onChange={(e) => setNewTalk({...newTalk, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Presenter"
          value={newTalk.presenter}
          onChange={(e) => setNewTalk({...newTalk, presenter: e.target.value})}
        />
        <input
          type="text"
          placeholder="Summary"
          value={newTalk.summary}
          onChange={(e) => setNewTalk({...newTalk, summary: e.target.value})}
        />
        <button type="submit">Submit Talk</button>
      </form>

      <h2>Talks</h2>
      {talks.map((talk) => (
        <div key={talk.title}>
          <h3>{talk.title} <button onClick={() => handleDeleteTalk(talk.title)}>Delete</button></h3>
          <p>Presenter: {talk.presenter}</p>
          <p>Summary: {talk.summary}</p>
          <h4>Comments:</h4>
          {talk.comments.map((comment, index) => (
            <p key={index}>{comment.author}: {comment.message}</p>
          ))}
          <form onSubmit={handleNewComment}>
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.author}
              onChange={(e) => setNewComment({...newComment, author: e.target.value, talkTitle: talk.title})}
            />
            <input
              type="text"
              placeholder="Your Comment"
              value={newComment.message}
              onChange={(e) => setNewComment({...newComment, message: e.target.value, talkTitle: talk.title})}
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;

