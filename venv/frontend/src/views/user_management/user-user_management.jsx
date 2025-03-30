import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Spinner, Modal, Button, Form } from 'react-bootstrap';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);  // State to toggle filters
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_no: '',
  });
  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_no: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/user_list/users', {
          method: 'GET',
          credentials: 'include' // For session cookies
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };

    setFilters(updatedFilters);

    const filtered = users.filter((user) =>
      Object.keys(updatedFilters).every((key) =>
        user[key]?.toString().toLowerCase().includes(updatedFilters[key].toLowerCase())
      )
    );

    setFilteredUsers(filtered);
  };
  // Open Delete Confirmation Modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Delete User
  const handleDelete = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user_list/users/${selectedUser.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Delete failed');

      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Open Edit Modal and Populate Data
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username || '',
      email: user.email || '',
      phone_no: user.phone_no || '',
    });
    setShowEditModal(true);
  };

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle User Update
  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user_list/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Update failed');

      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ));

      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 mx-3">
        Error: {error}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">User List</Card.Title>
                <Button variant="primary" onClick={() => setShowFilter(!showFilter)} className="btn-sm float-end px-3 py-2 rounded mb-3">
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </Button>

              {/* Filters - Show/Hide Based on Button Click */}
              {showFilter && (
                <Form className="mt-3 p-3 border rounded bg-light">
                  <Row>
                    <Col>
                      <Form.Control type="text" placeholder="First Name" name="first_name" value={filters.first_name} onChange={handleFilterChange} />
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Last Name" name="last_name" value={filters.last_name} onChange={handleFilterChange} />
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Username" name="username" value={filters.username} onChange={handleFilterChange} />
                    </Col>
                    <Col>
                      <Form.Control type="email" placeholder="Email" name="email" value={filters.email} onChange={handleFilterChange} />
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Phone Number" name="phone_no" value={filters.phone_no} onChange={handleFilterChange} />
                    </Col>
                  </Row>
                </Form>
              )}
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.first_name || '-'}</td>
                      <td>{user.last_name || '-'}</td>
                      <td>@{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_no || 'N/A'}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => openEditModal(user)}>Edit</button>
                        <button className="btn btn-danger mx-2" onClick={() => openDeleteModal(user)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} disabled/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default UserTable;
