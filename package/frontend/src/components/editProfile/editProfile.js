import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Card, CardBody } from 'reactstrap';
import './EditProfile.css'; // Import the CSS file

const EditProfile = () => {
  const { publicKey } = useParams();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageuser, setImageUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/user/${publicKey}`)
      .then(response => {
        setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setImageUser(response.data.user.imageuser);
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error);
      });
  }, [publicKey]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUser(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5001/user/${publicKey}`, {
      name,
      email,
      password,
      imageuser
    })
    .then(response => {
      setMessage('Profile updated successfully');
    })
    .catch(error => {
      console.error('There was an error updating the profile!', error);
    });
  };

  return (
    <Container>
      <Card body>
        <div className="card-header">
          {imageuser && <img src={imageuser} alt="Profile" className="profile-image" />}
          <h2>Edit Profile</h2>
        </div>
        <CardBody>
          {message && <Alert color="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="imageuser">Profile Image</Label>
              <Input
                type="file"
                name="imageuser"
                id="imageuser"
                onChange={handleImageChange}
              />
            </FormGroup>
            <Button type="submit" lg block outline color="primary">Save Changes</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EditProfile;
