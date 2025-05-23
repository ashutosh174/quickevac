import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Modal, Button, Form } from "react-bootstrap";

const UsersWithRoles = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    role_name: ''
  });

  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    role_id: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = () => {
    fetch("http://127.0.0.1:5000/api/roles/users_with_roles")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const fetchRoles = () => {
    fetch("http://127.0.0.1:5000/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data.roles || []))
      .catch((err) => console.error("Error fetching roles:", err));
  };

  const applyFilters = () => {
    let result = users;
    if (filters.first_name) {
      result = result.filter(u => u.first_name?.toLowerCase().includes(filters.first_name.toLowerCase()));
    }
    if (filters.last_name) {
      result = result.filter(u => u.last_name?.toLowerCase().includes(filters.last_name.toLowerCase()));
    }
    if (filters.role_name) {
      result = result.filter(u => u.role_name?.toLowerCase().includes(filters.role_name.toLowerCase()));
    }
    setFilteredUsers(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    setTimeout(() => applyFilters(), 100); // debounce-like filter
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role_id);
    setShowEditModal(true);
  };

  const handleRoleUpdate = () => {
    fetch(`http://127.0.0.1:5000/api/roles/users_with_roles/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role_id: selectedRole }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsers();
        setShowEditModal(false);
      })
      .catch((err) => console.error("Error updating role:", err));
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    fetch(`http://127.0.0.1:5000/api/roles/users_with_roles/${selectedUser.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsers();
        setShowDeleteModal(false);
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const handleAddRole = () => {
    fetch("http://127.0.0.1:5000/api/roles/users_with_roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsers();
        setShowAddModal(false);
        setNewUser({ first_name: '', last_name: '', username: '', role_id: '' });
      })
      .catch((err) => console.error("Error adding user role:", err));
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5">Roles List</Card.Title>
                <div>
                  <Button style={{ background: '#1B263B' }} onClick={() => setShowAddModal(true)}>Add Role</Button>{' '}
                  <Button variant="info" onClick={() => setShowFilters(!showFilters)}>Show Filters</Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {showFilters && (
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      name="first_name"
                      placeholder="Filter by First Name"
                      value={filters.first_name}
                      onChange={handleFilterChange}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      name="last_name"
                      placeholder="Filter by Last Name"
                      value={filters.last_name}
                      onChange={handleFilterChange}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      name="role_name"
                      placeholder="Filter by Role"
                      value={filters.role_name}
                      onChange={handleFilterChange}
                    />
                  </Col>
                </Row>
              )}
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.first_name || '-'}</td>
                        <td>{user.last_name || '-'}</td>
                        <td>{user.role_name || "No Role Assigned"}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => openEditModal(user)}>Edit</button>
                          <button className="btn btn-danger mx-2" onClick={() => openDeleteModal(user)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No users found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="roleSelect">
            <Form.Label>Select Role</Form.Label>
            <Form.Control
              as="select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleRoleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <p>Are you sure you want to delete <strong>{selectedUser.first_name} {selectedUser.last_name}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteUser}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Role Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="roleSelect">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                value={newUser.role_id}
                onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddRole}>Add</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default UsersWithRoles;
