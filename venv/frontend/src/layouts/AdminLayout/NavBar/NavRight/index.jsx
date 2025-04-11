import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';

import ChatList from './ChatList';
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const [disasterNotifications, setDisasterNotifications] = useState([]);
  const [username, setUsername] = useState('User');

  const client_id = 'ZGdI4XabAuRWp99RwklWP';
  const client_secret = 's9BPkgtBvvPLKSm41h4XG2FbPWLGbcpm6rCG9wsR';

  useEffect(() => {
    const storedUser = sessionStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }

    const fetchDisasters = async () => {
      try {
        const response = await axios.get(
          `https://data.api.xweather.com/earthquakes/closest?p=42.9849,-81.2453&radius=500&limit=20&format=json&from=2020-01-01T00:00:00Z&to=2021-01-01T00:00:00Z&client_id=${client_id}&client_secret=${client_secret}`
        );

        const fetchedData = response.data?.response || [];

        const mappedAlerts = fetchedData.map((alert) => ({
          severity: mapSeverity(alert.report.mag),
          location: alert.place?.name || alert.report.region || 'Unknown',
          message: alert.report.location || 'No details provided',
          timestamp: formatTime(alert.report.dateTimeISO),
        }));

        setDisasterNotifications(mappedAlerts);
      } catch (error) {
        console.error('Error fetching disaster data:', error);
      }
    };

    fetchDisasters();
  }, []);

  const mapSeverity = (mag) => {
    const level = Number(mag);
    if (level >= 5) return 'High';
    if (level >= 3) return 'Moderate';
    return 'Low';
  };

  const formatTime = (isoTime) => {
    const now = Date.now();
    const time = new Date(isoTime).getTime();
    const diffMs = now - time;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 365) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    axios
      .post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => {
        window.location.href = '/QuickEvac/quickevac/venv/frontend/login';
      })
      .catch(() => {
        window.location.href = '/QuickEvac/quickevac/venv/frontend/login';
      });
  };

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="feather icon-bell icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="notification notification-scroll">
              <div className="noti-head">
                <h6 className="d-inline-block m-b-0">Disaster Alerts</h6>
                <div className="float-end">
                  <Link to="#" className="me-2">mark as read</Link>
                  <Link to="#">clear all</Link>
                </div>
              </div>
              <PerfectScrollbar>
                <ListGroup as="ul" bsPrefix=" " variant="flush" className="noti-body">
                  {disasterNotifications.length === 0 ? (
                    <ListGroup.Item as="li" bsPrefix=" " className="text-center text-muted">
                      No disaster alerts at this time.
                    </ListGroup.Item>
                  ) : (
                    disasterNotifications.map((alert, index) => (
                      <ListGroup.Item
                        key={index}
                        as="li"
                        bsPrefix=" "
                        className="notification"
                      >
                        <Card className="d-flex align-items-center shadow-none mb-0 p-0" style={{ flexDirection: 'row', backgroundColor: 'unset' }}>
                          <img className="img-radius" src={avatar1} alt="icon" />
                          <Card.Body className="p-0">
                            <p>
                              <strong>{alert.location}</strong>
                              <span className="n-time text-muted">
                                <i className="icon feather icon-clock me-2" />
                                {alert.timestamp}
                              </span>
                            </p>
                            <p>{alert.message}</p>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </PerfectScrollbar>
              <div className="noti-footer">
                <Link to="#">show all</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="end" className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{username}</span>
                <Link to="#" className="dud-logout" title="Logout" onClick={handleLogout}>
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>

      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
