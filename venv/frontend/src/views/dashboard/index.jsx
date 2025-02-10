import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeatherWidget from '../../WeatherWidget'; // Ensure the path is correct
import EvacuationMap from '../../EvacuationMap';


const dashSalesData = [
  { title: 'Daily Sales', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
  { title: 'Monthly Sales', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
  { title: 'Yearly Sales', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
];

const DashDefault = () => {
  const tabContent = (
    <React.Fragment>
      {/* Existing tab content */}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => {
          return (
            <Col key={index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} /> $249.95
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <p className="m-b-0">{data.value}%</p>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
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
                  <span className="d-block text-uppercase">total ideas</span>
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
                  <span className="d-block text-uppercase">total locations</span>
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