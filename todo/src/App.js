import './App.css';
import { useEffect, useState } from "react";
import Login from './Login';

function App() {
  const [input, setInput] = useState([]);
  const [newname, setName] = useState('');
  const [newemail, setEmail] = useState('');
  const [newwebsite, setWebsite] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setInput(json));
  }, []);

  function addUser() {
    const name = newname.trim();
    const email = newemail.trim();
    const website = newwebsite.trim();

    if (name && email && website) {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          website
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(data => {
          alert('User added successfully:', data);
          setInput(prevInput => [...prevInput, data]);
          setName('');
          setEmail('');
          setWebsite('');
        })
        .catch(error => {
          console.error('Error adding user:', error);
        });
    }
  }

  function updateUser(id) {
    const userToUpdate = input.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userToUpdate),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert('User updated successfully:', data);
        setInput((prevInput) =>
          prevInput.map((user) =>
            user.id === id ? { ...user, ...data } : user
          )
        );
        setName('');
        setEmail('');
        setWebsite('');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  }

  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setInput((prevInput) => prevInput.filter((user) => user.id !== id));
          alert('User deleted successfully');
        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }

  return (
    <div>
      <table>
        <thead id="head">
          <tr>
            <th id="id">Id</th>
            <th id="name">Name</th>
            <th id="mail">E-Mail</th>
            <th id="website">Website</th>
            <th id="action">Action Button</th>
          </tr>
        </thead>
        <tbody>
          {input.map((user) => (
            <tr key={user.id}>
              <td contenteditable="false">{user.id}</td>
              <td contenteditable="true">{user.name}</td>
              <td contenteditable="true">{user.email}</td>
              <td contenteditable="true">{user.website}</td>
              <td>
                <button style={{ padding: "8px", margin: "10px", color: 'white', backgroundColor: 'blue' }} onClick={() => updateUser(user.id)}>Update</button>
                <button style={{ padding: "8px", margin: "10px", color: 'white', backgroundColor: "red" }} onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input type="text" value={newname} onChange={(e) => setName(e.target.value)} placeholder="Enter Your name ......" />
            </td>
            <td>
              <input type="text" value={newemail} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email ......" />
            </td>
            <td>
              <input type="text" value={newwebsite} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter Your Website ......" />
            </td>
            <td>
              <button style={{ backgroundColor: 'green', margin: "20px", color: "white" }} onClick={addUser}><b>Add User</b></button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
