import { useState, useEffect } from "react";
import { Tabs, Tab, Accordion, Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../../config";

// Define an interface for your props
interface MediaItem {
  id: number;
  title: string;
  media: {
    data: { attributes: { url: string } }[];
  };
}

interface BulidimpactProps {
  title: string;
  media: MediaItem[];
}

const Bulidimpact = (props: BulidimpactProps) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Track active tab
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [manualOverride, setManualOverride] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const totalTabs = props.media.length;

    if (!isMobile && !manualOverride) {
      if (intervalId) clearInterval(intervalId);

      const newIntervalId = setInterval(() => {
        setActiveTab((prevTab) => (prevTab >= totalTabs - 1 ? 0 : prevTab + 1));
      }, 10000);

      setIntervalId(newIntervalId);

      return () => {
        clearInterval(newIntervalId);
      };
    }

    if (isMobile || manualOverride) {
      if (intervalId) clearInterval(intervalId);
    }
  }, [isMobile, manualOverride, props.media]);

  const handleTabSelect = (selectedKey: string | null) => {
    if (selectedKey === null) return;
    setActiveTab(Number(selectedKey));
    setManualOverride(true);

    if (intervalId) clearInterval(intervalId);
    const resetTimeout = setTimeout(() => setManualOverride(false), 2000);

    return () => clearTimeout(resetTimeout);
  };

  const handleVideoEnd = () => {
    setActiveTab((prevTab) => (prevTab >= props.media.length - 1 ? 0 : prevTab + 1));
  };

  return (
    <section className="buildImpakt_sec">
      <Container>
        <h5>{props.title}</h5>
        <Row>
          <Col lg={12}>
            {isMobile ? (
              <Accordion defaultActiveKey="0">
                {props.media.map((item: MediaItem, index: number) => (
                  <Accordion.Item key={item.id} eventKey={index.toString()}>
                    <Accordion.Header>
                      {index + 1} <span>{item.title}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Col md={8} className="mx-auto pt-5">
                        <div className="video_wraperTab">
                          <video
                            className="img-fluid"
                            autoPlay
                            muted
                            loop
                            onEnded={handleVideoEnd} // Add onEnded handler
                          >
                            <source
                              src={`${BASE_URL}${item.media.data[0]?.attributes.url}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <Tabs
                activeKey={activeTab.toString()}
                onSelect={handleTabSelect}
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                {props.media.map((item: MediaItem, index: number) => (
                  <Tab
                    key={item.id}
                    eventKey={index.toString()}
                    title={
                      <>
                        {index + 1} <span>{item.title}</span>
                      </>
                    }
                  >
                    <Col md={8} className="mx-auto pt-5">
                      <div className="video_wraperTab">
                        <video
                          className="img-fluid"
                          autoPlay
                          muted
                          loop
                          onEnded={handleVideoEnd} // Add onEnded handler
                        >
                          <source
                            src={`${BASE_URL}${item.media.data[0]?.attributes.url}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </Col>
                  </Tab>
                ))}
              </Tabs>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Bulidimpact;
