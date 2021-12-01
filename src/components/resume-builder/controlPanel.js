import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import ProfileTab from "./contentTab/profileTab"
const ControlPanel = () => {
  const [tabKey, setTabKey] = useState("content");
  return (
    <Container>
      <Row>
        <div className="control-panel-container">
          <Tabs
            activeKey={tabKey}
            onSelect={(key) => setTabKey(key)}
            className="control-panel-inner-container"
          >
            <Tab
              className="content-container"
              eventKey="content"
              title="Content"
            >
              <ProfileTab />
            </Tab>
            <Tab className="content-container" eventKey="style" title="Style">
              style here
            </Tab>
            <Tab
              className="content-container"
              eventKey="advance"
              title="Advance"
            >
              advance here
              //import and export doc
              //share online resume
              //builder setting
              //
            </Tab>
          </Tabs>
          {/* <li className="content-box item-box">Content</li>
                        <li className="style-box item-box">Style</li>
                        <li className="advance-box item-box">Advance</li> */}
        </div>
      </Row>
    </Container>
  );
};

export default ControlPanel;
