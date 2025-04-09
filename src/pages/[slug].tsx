import { GetServerSidePropsContext } from "next/types";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { BASE_URL } from "../../config";
import Steps from "@/components/ProductPages/Steps";
import Registercounter from "@/components/Registercounter";
import Registersection from "@/components/registersection";
const Banner = dynamic(() => import("@/components/Banner"));
const Newslistscroll = dynamic(() => import("@/components/Newsticker"));
const BlogListing = dynamic(() => import("@/components/Bloglisting"));
const MediaListing = dynamic(() => import("@/components/Medialisting"));
const Driveperformance = dynamic(() => import("@/components/driveperform"));
const Capapbilities = dynamic(() => import("@/components/Capapbilities"));
const Automation = dynamic(() => import("@/components/Automation"));
const Modulebanner = dynamic(() => import("@/components/Modulebanner"));
const Accordians = dynamic(() => import("@/components/Accordians"));
const Faq = dynamic(() => import("@/components/Faq"));
const ProductPageCounter = dynamic(
  () => import("@/components/ProductPages/ProductPageCounter")
);
const Fintechparnters = dynamic(
  () => import("@/components/ProductPages/Fintechparnters")
);
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const Testimonial = dynamic(() => import("@/components/Testimonial"));
const DistinctiveModels = dynamic(
  () => import("@/components/ProductPages/DistinctiveModels")
);
const Bulidimpact = dynamic(
  () => import("@/components/ProductPages/Bulidimpact")
);
const Commissionmanagement = dynamic(
  () => import("@/components/ProductPages/Commissionmanagement")
);
const Whyus = dynamic(() => import("@/components/ProductPages/Whyus"));
const Features = dynamic(() => import("@/components/ProductPages/Features"));
const Discover = dynamic(() => import("@/components/ProductPages/Discover"));
const Modulesbookdemo = dynamic(() => import("@/components/Modulesbookdemo"));
const Modules = dynamic(() => import("@/components/Modules"));
const ProcessFlow = dynamic(
  () => import("@/components/ProductPages/ProcessFlow")
);
const AboutBanner = dynamic(() => import("@/components/AboutUS/AboutBanner"));
const TimelineSlider = dynamic(
  () => import("@/components/AboutUS/TimelineSlider")
);
const Creators = dynamic(() => import("@/components/AboutUS/Creators"));
const Actflies = dynamic(() => import("@/components/AboutUS/Actflies"));
const Pollinate = dynamic(() => import("@/components/AboutUS/Pollinate"));
const PartnersPage = dynamic(() => import("@/components/PartnersPage"));
const CareersPage = dynamic(() => import("@/components/CareersPage"));
const CareerdetailPage = dynamic(() => import("@/components/CareerdetailPage"));

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

type Props = {
  sections: any;
  meta: {
    title: string;
    description: string;
    keywords?: string;
  };
};

const getSectionsComponent = ({ id, __component, ...rest }: any) => {
  let SectionsComponent;
  switch (__component) {
    case "sections.banner":
      SectionsComponent = Banner;
      break;
    case "sections.drive-performance-percentage":
      SectionsComponent = Driveperformance;
      break;
    case "sections.capapbilities":
      SectionsComponent = Capapbilities;
      break;
    case "sections.empower-automation":
      SectionsComponent = Automation;
      break;
    case "sections.configurable-modules":
      SectionsComponent = Modules;
      break;
    case "sections.testimonials":
      SectionsComponent = Testimonial;
      break;
    case "sections.module":
      SectionsComponent = Accordians;
      break;
    case "sections.module-banner":
      SectionsComponent = Modulebanner;
      break;
    case "sections.wanna-try":
      SectionsComponent = Modulesbookdemo;
      break;
    case "sections.faq-section":
      SectionsComponent = Faq;
      break;
    case "sections.transform-workforce":
      SectionsComponent = ProductPageCounter;
      break;
    case "sections.commission-management":
      SectionsComponent = Commissionmanagement;
      break;
    case "sections.why-choose":
      SectionsComponent = Whyus;
      break;
    case "sections.features":
      SectionsComponent = Features;
      break;
    case "sections.book-a-demo":
      SectionsComponent = Discover;
      rest.className = rest.class;
      break;
    case "sections.underwriting-experience":
      SectionsComponent = DistinctiveModels;
      break;
    case "sections.fintech-partners":
      SectionsComponent = Fintechparnters;
      break;
    case "sections.impakt-apps":
      SectionsComponent = Bulidimpact;
      break;
    case "sections.package":
      SectionsComponent = PricingSection;
      break;
    case "sections.process-flow":
      SectionsComponent = ProcessFlow;
      break;
    case "sections.text":
      SectionsComponent = AboutBanner;
      rest.className = rest.class;
      break;
    case "sections.about-us-section-2":
      SectionsComponent = TimelineSlider;
      break;
    case "sections.leadership":
      SectionsComponent = Creators;
      break;
    case "sections.act-that-flies":
      SectionsComponent = Actflies;
      break;
    case "sections.pollinate":
      SectionsComponent = Pollinate;
      break;
    case "sections.partner":
      SectionsComponent = PartnersPage;
      break;
    case "sections.career":
      SectionsComponent = CareersPage;
      break;
    case "section.detail":
      SectionsComponent = CareerdetailPage;
      break;
    case "sections.step":
      SectionsComponent = Steps;
      break;
    case "sections.blog":
      SectionsComponent = BlogListing;
      break;
    case "sections.media-list":
      SectionsComponent = MediaListing;
      break;
    case "sections.news":
      SectionsComponent = MediaListing;
      break;
      case "sections.newslist":
        SectionsComponent = Newslistscroll;
        break;
      case "sections.registercounter":
        SectionsComponent = Registercounter;
        break;
      case "sections.registersection":
        SectionsComponent = Registersection;
        break;
    default:
      SectionsComponent = null;
      break;
  }

  return SectionsComponent ? (
    <SectionsComponent key={`index-${__component}-${id}`} {...rest} />
  ) : null;
};

export default function Shop({ sections, meta }: Props) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      </Head>
      <main>{sections.map(getSectionsComponent)}</main>
    </>
  );
}

  export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const slug = ctx.params?.slug;
    console.log("----", slug);
    if (slug === "career-detail") {
      return {
        props: {
          sections: [{ id: 1, __component: "section.detail", title: "first" }],
          meta: {
            title: "Career Detail",
            description: "Default Description",
            keywords: "",
          },
        },
      };
    } else {
      // console.log("slug",slug)
      const res = await fetch(
        `${BASE_URL}/api/services/?filters[slug]=${slug}&populate=deep`
      );

      if (!res.ok) {
        return {
          notFound: true,
        };
      }

      const result = await res.json();

      const meta = {
        title: result.data[0]?.attributes?.meta_title || "act21",
        description: result.data[0]?.attributes?.meta_description || "act21",
        keywords: result.data[0]?.attributes?.meta_keywords || "",
      };

      return {
        props: {
          sections: result.data[0]?.attributes?.section || [],
          meta,
        },
      };
    }
  };
