import React from 'react'
import { Container } from 'react-bootstrap'

interface BannerProps {
  title: string;
  description:string;
  className?: string; // optional prop for class name
}
const AboutBanner  :  React.FC<BannerProps> = (props) => {
 
  return (
    <section className={`banner_bg about_banner section_padding50 text-center text-white ${props.className || ''}`}>
      <Container>
        <h5>{props.title}</h5>
        <p className="mt-3">{props.description}</p>
      </Container>
    </section>
  )
}

export default AboutBanner