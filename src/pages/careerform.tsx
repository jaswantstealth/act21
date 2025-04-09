"use client"
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";

// Define the type for FormControl elements (input, select, and textarea)
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

interface FormData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  yearOfGraduation: string;
  gender: string;
  experienceInYears: string;
  currentEmployer: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  skillSet: string;
  howDidYouComeAcross: string;
  currentLocation: string;
  preferredLocation: string;
  filePath: string;
}

interface Seo {
  meta_title: string;
  meta_description: string;
}

interface MetaData {
  seo: Seo;
}
const Careerform: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    yearOfGraduation: "",
    gender: "",
    experienceInYears: "",
    currentEmployer: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    skillSet: "",
    howDidYouComeAcross: "",
    currentLocation: "",
    preferredLocation: "",
    filePath: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [metaData, setMetaData] = useState<MetaData | null>(null);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/career-metas?populate[]=deep`);
        if (response.data.data && response.data.data.length > 0) {
          const { meta_title, meta_description } = response.data.data[0].attributes.seo;
          setMetaData({ seo: { meta_title, meta_description } });
          console.log("Meta Title:", meta_title);
        } else {
          console.log("No meta data available");
        }
      } catch (error) {
        console.error("Error fetching metadata", error);
      }
    };

    fetchMetaData();
  }, []);
  // Function to validate required fields
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.yearOfGraduation)
      newErrors.yearOfGraduation = "Graduation year is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.experienceInYears)
      newErrors.experienceInYears = "Experience is required";
    if (!formData.currentEmployer)
      newErrors.currentEmployer = "Current employer is required";
    if (!formData.currentCTC) newErrors.currentCTC = "Current CTC is required";
    if (!formData.expectedCTC)
      newErrors.expectedCTC = "Expected CTC is required";
    if (!formData.noticePeriod)
      newErrors.noticePeriod = "Notice period is required";
    if (!formData.skillSet) newErrors.skillSet = "Skill set is required";
    if (!formData.howDidYouComeAcross)
      newErrors.howDidYouComeAcross = "Vacancy source is required";
    if (!formData.currentLocation)
      newErrors.currentLocation = "Current location is required";
    if (!formData.preferredLocation)
      newErrors.preferredLocation = "Preferred location is required";
    // if (!formData.filePath) newErrors.filePath = "C.V. is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function handleSubmitCv(event: any) {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const url = "http://15.168.10.31:3000/api/file-uploads";
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      setLoading(true); // Start loader

      axios
        .post(url, formData, config)
        .then((response) => {
          // console.log(response.data);
          setCvData(response.data.filePath);
        })
        .catch((error) => {
          // console.error("Error uploading file:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loader when done
        });
    }
  }

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error on input change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    formData.title = formData.title !== "" ? formData.title : "";
    formData.filePath = cvData ? cvData : "1726146995459.pdf";
    // console.log("Submitting form data:", formData);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/resumes/submit`,
        // "http://15.168.10.31:3000/api/resumes/submit",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      toast.success(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        yearOfGraduation: "",
        gender: "",
        experienceInYears: "",
        currentEmployer: "",
        currentCTC: "",
        expectedCTC: "",
        noticePeriod: "",
        skillSet: "",
        howDidYouComeAcross: "",
        currentLocation: "",
        preferredLocation: "",
        filePath: "",
      });
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <>
     {metaData && (
        <Head>
          <title>{metaData.seo.meta_title}</title>
          <meta name="description" content={metaData.seo.meta_description} />
        </Head>
      )}
    <section className="career-form py-5">
      <Container>
        <h2 className="text-center">Personal Details</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center align-items-center gy-3">
            <Col md={12}>
              <Row className="justify-content-center align-items-baseline">
                <Col xs={4} lg={2}>
                  <Form.Group controlId="formGridState">
                    <Form.Label>
                      Title <span>*</span>
                    </Form.Label>
                    <Form.Select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      isInvalid={!!errors.title}
                    >
                      <option value="">None</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={8} lg={6}>
                  <Form.Label className="hidden-label">First Name </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Last Name <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Email <span>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Year of Graduation <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="yearOfGraduation"
                value={formData.yearOfGraduation}
                onChange={handleInputChange}
                isInvalid={!!errors.yearOfGraduation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.yearOfGraduation}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formGridGender">
                <Form.Label>
                  Gender <span>*</span>
                </Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">None</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Not willing to disclose">
                    Not willing to disclose
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formGridExperience">
                <Form.Label>
                  Experience In Years <span>*</span>
                </Form.Label>
                <Form.Select
                  name="experienceInYears"
                  value={formData.experienceInYears}
                  onChange={handleInputChange}
                  isInvalid={!!errors.experienceInYears}
                >
                  <option value="">None</option>
                  <option value="0-1 Years">0-1 Years</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5-10 Years">5-10 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.experienceInYears}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formGridCurrentCTC">
                <Form.Label>
                  Current CTC <span>*</span>
                </Form.Label>
                <Form.Select
                  name="currentCTC"
                  value={formData.currentCTC}
                  onChange={handleInputChange}
                  isInvalid={!!errors.currentCTC}
                >
                  <option value="">None</option>
                  <option value="Below 5 LPA">Below 5 LPA</option>
                  <option value="5-10 LPA">5-10 LPA</option>
                  <option value="10-15 LPA">10-15 LPA</option>
                  <option value="15-20 LPA">15-20 LPA</option>
                  <option value="Above 20 LPA">Above 20 LPA</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.currentCTC}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formGridExpectedCTC">
                <Form.Label>
                  Expected CTC <span>*</span>
                </Form.Label>
                <Form.Select
                  name="expectedCTC"
                  value={formData.expectedCTC}
                  onChange={handleInputChange}
                  isInvalid={!!errors.expectedCTC}
                >
                  <option value="">None</option>
                  <option value="Below 5 LPA">Below 5 LPA</option>
                  <option value="5-10 LPA">5-10 LPA</option>
                  <option value="10-15 LPA">10-15 LPA</option>
                  <option value="15-20 LPA">15-20 LPA</option>
                  <option value="Above 20 LPA">Above 20 LPA</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.expectedCTC}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formGridNoticePeriod">
                <Form.Label>
                  Notice Period <span>*</span>
                </Form.Label>
                <Form.Select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  isInvalid={!!errors.noticePeriod}
                >
                  <option value="">None</option>
                  <option value="Immediate">Immediate</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="More">More</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.noticePeriod}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Skill Set <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="skillSet"
                value={formData.skillSet}
                onChange={handleInputChange}
                isInvalid={!!errors.skillSet}
              />
              <Form.Control.Feedback type="invalid">
                {errors.skillSet}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formGridHowDidYouComeAcross">
                <Form.Label>
                  How Did You Come Across This Vacancy? <span>*</span>
                </Form.Label>
                <Form.Select
                  name="howDidYouComeAcross"
                  value={formData.howDidYouComeAcross}
                  onChange={handleInputChange}
                  isInvalid={!!errors.howDidYouComeAcross}
                >
                  <option value="">None</option>
                  <option value="Instagram ">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.howDidYouComeAcross}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Current Location <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleInputChange}
                isInvalid={!!errors.currentLocation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentLocation}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Current Employer <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="currentEmployer"
                value={formData.currentEmployer}
                onChange={handleInputChange}
                isInvalid={!!errors.currentEmployer}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentEmployer}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Label>
                Preferred Location <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleInputChange}
                isInvalid={!!errors.preferredLocation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.preferredLocation}
              </Form.Control.Feedback>
            </Col>
            <Col xs={12} lg={8}>
              <Form.Group controlId="formFileLg">
                <Form.Label>Upload C.V.</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={handleSubmitCv}
                  isInvalid={!!errors.filePath}
                />
              </Form.Group>
              {loading && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}{" "}
              {/* Display loader */}
            </Col>
            <Col md={12} className="text-center">
              <button type="submit" className="header_btn">
                Submit
              </button>
            </Col>
          </Row>
        </Form>

        <ToastContainer />
      </Container>
    </section></>
  );
};

export default Careerform;