import React, { useState } from 'react';
import { Card, ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ChatList from './ChatList';

import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);

  const disasterNotifications = [
    {
      severity: 'High',
      location: 'London',
      message: 'Severe earthquake detected',
      timestamp: '10 min ago'
    },
    {
      severity: 'Moderate',
      location: 'Toronto',
      message: 'Flood alert issued',
      timestamp: '30 min ago'
    },
    {
      severity: 'Low',
      location: 'Hamilton',
      message: 'Mild storm warning',
      timestamp: '1 hr ago'
    }
  ];

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
                  {disasterNotifications.map((alert, index) => (
                    <ListGroup.Item key={index} as="li" bsPrefix=" " className={`notification severity-${alert.severity.toLowerCase()}`}>
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
                  ))}
                </ListGroup>
              </PerfectScrollbar>
              <div className="noti-footer">
                <Link to="#">show all</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown>
            <Dropdown.Toggle as={Link} variant="link" to="#" className="displayChatbox" onClick={() => setListOpen(true)}>
              <i className="icon feather icon-mail" />
            </Dropdown.Toggle>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={'end'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>John Doe</span>
                <Link to="#" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
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
