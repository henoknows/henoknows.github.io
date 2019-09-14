import React from "react";
import Section from "./../Section";
import SectionHeader from "./../SectionHeader";
import Clients from "./../Clients";
import "./styles.scss";

function ClientsSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <Clients
          items={[
            {
              name: "IBM",
              image: "https://www.ibm.com/innovate/branding/logoartwork/logoartwork.nsf/IBM_logoRR_pos_RGB.gif",
              width: "200px"
            },
            {
              name: "Fujitsu",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Fujitsu-Logo.svg/500px-Fujitsu-Logo.svg.png",
              width: "225px"
            },
            {
              name: "SAS",
              image: "https://upload.wikimedia.org/wikipedia/commons/1/10/SAS_logo_horiz.svg",
              width: "200px"
            }
          ]}
        />
      </div>
    </Section>
  );
}

export default ClientsSection;
