import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeatherWidget from '../../WeatherWidget'; // Ensure the path is correct
import EvacuationMap from '../../EvacuationMap';


const DashDefault = () => {
  const tabContent = (
    <React.Fragment>
      {/* Existing tab content */}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={8}>
          <Card className="widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Evacuation Map</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <EvacuationMap />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <WeatherWidget />
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">235</h3>
                  <span className="d-block text-uppercase">Total Evacuations</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">26</h3>
                  <span className="d-block text-uppercase">Total Locations</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Rest of the code */}
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;