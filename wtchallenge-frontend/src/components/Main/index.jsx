import axios from 'axios';
import { useEffect, useState } from 'react';

import './Main.css';

export default function Argonauts() {
  const [users, setUsers] = useState([]);
  const [addUsers, setAddUsers] = useState({ name: '' });

  const handleChange = (event) => {
    setAddUsers({ name: event.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/users`, addUsers)
      .then(({ response }) => {
        setAddUsers(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <h2>Ajouter un(e) Argonaute</h2>
      <form onSubmit={handleSubmit} className='new-member-form'>
        <label htmlFor='name'>Nom de l&apos;Argonaute</label>
        <input
          onChange={handleChange}
          id='name'
          name='name'
          type='text'
          placeholder='Charalampos'
        />
        <button type='submit'>Envoyer</button>
      </form>
      <h2>Membres de l'équipage</h2>
      <section className='member-list'>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </section>
    </main>
  );
}
