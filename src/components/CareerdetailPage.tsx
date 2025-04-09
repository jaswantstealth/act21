import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CareerDetailClient from './CareerModel';

const CareerdetailPage = () => {
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  
useEffect(() => {
  const savedValue = window.localStorage.getItem('selected-career');
  if (savedValue) {
    setSelectedCareer(JSON.parse(savedValue));
  }
  setLoading(false);
}, []);

if (loading) {
  return <p>Loading...</p>;
}
  return (
    <><section className="section_padding70 banner_bg">
    <Container>
      <h5 className="text-center text-white">{selectedCareer.title}</h5>
      <div className="btn_wraper d-flex justify-content-center mt-4">
      <CareerDetailClient  title={selectedCareer.title}  link={selectedCareer.url}/>
      </div>
    </Container>
  </section>
  <section
        className="section_padding50 job_details"
        style={{
          backgroundImage: "url('/assets/img/linebg2.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
         <Container>
          <Row className="g-5">
            <Col md={6}>
              <div className="job_details_left">
                <h5 className="ms-2">Job Description</h5>
                <div className="details"  dangerouslySetInnerHTML={{ __html: selectedCareer.description }}/>
                <Link href={selectedCareer.url} className="header_btn rounded-0">
                {selectedCareer.button}
                  <img
                    src="/assets/img/rightbtnarriw.svg"
                    className="img-fluid"
                    width={10}
                    alt="Arrow"
                  />
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div className="job_info_wraper">
                <h5>Job Information</h5>
                <div className="country mt-md-5 mt-3">
                  <p>
                    Country
                    <span className="d-block">
                    {selectedCareer.job_locations?.data?.attributes?.location}</span>
                  </p>
                </div>
                <div className="country mt-md-5 mt-3">
                  <p>
                    Industry
                    <span className="d-block">
                    {selectedCareer.job_categories?.data?.attributes?.category}
                    </span>
                  </p>
                </div>
                <div className="inpit_img"><img src="/assets/img/inputIimg.png" className="img-fluid" alt="img"/></div>
              </div>
            </Col>
          </Row>
        </Container>
  
    </section></>
  );
};

export default CareerdetailPage;
