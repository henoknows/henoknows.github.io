import React from "react";
import Section from "./../Section";
import SectionHeader from "./../SectionHeader";
import Testimonials from "./../Testimonials";
import "./styles.scss";

function TestimonialsSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <Testimonials
          items={[
            {
              avatar: "https://scontent-atl3-1.cdninstagram.com/vp/27dfc8aabd0e5fba2ec4235fab4cb76e/5DFA138D/t51.2885-19/s320x320/15539093_1637059356597265_7967464174336868352_a.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com",
              name: "Dara Fazelnia",
              bio:
                "Phenomenal developer and fiancé. Would not have choose anyone else to do the job, and spend the rest of my life with!",
              company: "CUSOM 2021"
            },
            {
              avatar: "https://uploads.divjoy.com/pravatar-150x-48.jpeg",
              name: "Shawna Murray",
              role: "Software Engineer",
              bio:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!",
              company: "Company"
            },
            {
              avatar: "https://uploads.divjoy.com/pravatar-150x-12.jpeg",
              name: "Blake Elder",
              role: "Designer",
              bio:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae.",
              company: "Company"
            }
          ]}
        />
      </div>
    </Section>
  );
}

export default TestimonialsSection;
