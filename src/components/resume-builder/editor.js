import React, { useEffect, useContext } from "react";
import { BuilderContext } from "../../context/BuilderProvider";
import {Container, Row, Col} from "react-bootstrap"
import LeftPanel from "./leftPanel"
import RightPanel from "./rightPanel"

const Editor = (props) => {
    const resumeId = props.location.state.resumeId?props.location.state.resumeId:`unknown resume Id`;
    // const {getSingleResumeData} = useContext(BuilderContext);
  const {getSingleResumeData, resumeData} = useContext(BuilderContext)
  useEffect(()=>{
    getSingleResumeData(resumeId)
  },[])
  console.log("resume data",resumeData)
  return (
        <div className="builder-container">
        
          <Container className="builder-inner-container">
            <Row>
              <Col sm="12" md="3">
                <LeftPanel />
              </Col>
              <Col sm="12" md="6">
              <div>{resumeId}</div>
              //put template component here
              </Col>
              <Col sm="12" md="3">
                <RightPanel />
              </Col>
            </Row>
          </Container>
        </div>
      );
};

export default Editor;
