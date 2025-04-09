import Link from "next/link";
import React from "react";

// Uncomment the enums if needed for further validations
// enum CtaTypes {
//     "primary"="primary",
//     "secondary"="secondary",
// }

// enum CtaModes {
//   "light"="light",
//   "dark"="dark",
// }

// type CtaProps = {
//   name: string;
//   link: string;
//   type: CtaTypes;
//   mode: CtaModes;
// };

export default function Cta(props: any) {
  // const ctaData = props[0]
  // console.log('ctaData', ctaData);
  return (
    <Link className="header_btn"
      href={props[0].link}
    >
      {props[0].name}
    </Link>
  );
}
