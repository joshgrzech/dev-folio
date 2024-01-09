import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";

const ContactSummary: React.FC = () => {
  const contactMethods = [
    {
      name: "Email Me",
      value: "contact@joshgrzech.com",
      href: "mailto:contact@joshgrzech.com",
      iconPath: "/images/email.png",
      blur: true,
    },
    {
      name: "Text Me",
      value: "4798009990",
      href: "sms:+14798009990?&body=Hi%20Josh%2C%20I%20found%20your%20website%20and%20wanted%20to%20reach%20out%20to%20you%20about%20a%20job%20opportunity%20or%20project%20I%20have%20in%20mind.%20I%20look%20forward%20to%20hearing%20from%20you!",
      iconPath: "/images/message.png",
      blur: true,
    },
    {
      name: "",
      value: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/joshgrzech",
      iconPath: "/images/linkedin.png",
    },
    {
      name: "",
      value: "GitHub Profile",
      href: "https://github.com/joshgrzech",
      iconPath: "/images/github.png",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods.map((method, index) => (
          <Card
            key={index}
            rel="noopener noreferrer"
            isPressable
            isHoverable
            onPressEnd={() => {
              window.open(method.href, "_blank");
            }}
          >
            <CardBody
              className="flex flex-row items-center justify-center"
              style={{
                backgroundImage: `url(${method.iconPath})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1 className="text-4xl p-unit-3xl font-sans font-bold"></h1>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactSummary;
