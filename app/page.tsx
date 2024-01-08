import { title, subtitle } from "@/components/primitives";
import { Card } from "@nextui-org/react";
import SkillsComponent from "@/components/home/SkillsShowcase";
import AboutMe from "@/components/home/AboutSummary";
import ResumeSummary from "@/components/home/ResumeSummary";
import ContactSummary from "@/components/home/ContactSummary";
import References from "@/components/home/References";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card className="w-full p-unit-2xl">
        <div className="inline-block max-w-xxl text-center justify-center ">
          <h1 className={title()}>Crafting </h1>
          <h1 className={title({ color: "blue" })}>the Future&nbsp;</h1>
          <h1 className={title()}>of Mobile &amp; Web.</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Mobile Focused, Full-Stack Enabled
          </h2>
        </div>
      </Card>

      <SkillsComponent />
      <References />
      <ResumeSummary />
      <div className="hidden md:flex md:w-full">
        <AboutMe />
      </div>
      <ContactSummary />
    </section>
  );
}
