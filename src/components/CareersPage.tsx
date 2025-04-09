import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";

const CareersPage = (props: any) => {
  const router = useRouter();

  const handleClick = async (career: string) => {
    await localStorage.setItem("selected-career", JSON.stringify(career));
    router.push("/career-detail");
    // router.reload();
  };

  // console.log('props.career', props);  

  return (
   <>
    
    <section
      id="joblist"
      className="jobList section_padding50"
      style={{
        backgroundImage: "url('/assets/img/linebg2.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <h2 className="text-center">{props.title}</h2>
        <Row className="mt-4 mt-md-3 g-md-5 g-3">
          {props.career.length > 0 ? (
            props.career.map((career: any) => (
              <Col md={6} lg={4} key={career.id}>
                <div className="job_wraper">
                  <h4>{career.title}</h4>
                  <div className="details job_ul_wraper"  dangerouslySetInnerHTML={{ __html: career.description }}>
                  </div>
                  
                    <div className="job_wraper_link d-flex align-items-center justify-content-between" onClick={() => handleClick(career)}>
                      <p className="mb-0">
                        {career.job_types.data.attributes.type}
                      </p>
                      <img
                        src="/assets/img/jobarrow.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  
                </div>
              </Col>
            ))
          ) : (
            <h5 className="text-center">Currently packed up, but more opportunities are on the way!</h5>
          )}
        </Row>
      </Container>
    </section></>
  );
};

export default CareersPage;
