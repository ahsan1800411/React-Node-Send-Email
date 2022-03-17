import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !message || !subject) {
      return toast.error('All fields are required');
    }
    try {
      setLoading(true);
      const { data } = await axios.post('/api/email', {
        email,
        subject,
        message,
      });
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className='App'>
      <ToastContainer position='bottom-center' limit={1} />
      <header className='App-header'>
        <form onSubmit={submitHandler}>
          <h1>Send Email</h1>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='subject'>Subject</label>
            <input
              type='text'
              name='subject'
              id='subject'
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='message'>Message</label>
            <textarea
              type='text'
              id='message'
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <label></label>
            <button type='submit' disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
