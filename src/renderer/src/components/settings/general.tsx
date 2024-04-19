import { Accordion, AccordionItem } from "@nextui-org/react";
import OutputFilenameFormat from "./components/output-filename-format";

const components = [
  {
    title: "Output Filename Format",

    component: OutputFilenameFormat,
  },
];

export default function General() {
  return (
    <div>
      <Accordion
        itemClasses={{
          title: "text-white",
        }}
      >
        {components.map((component) => (
          <AccordionItem
            key={component.title}
            aria-label={component.title}
            className="rounded-md bg-[#323232] p-2 px-4 text-white"
            title={component.title}
          >
            <component.component />
          </AccordionItem>
        ))}
        {/* <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Accordion 1"
        ></AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Accordion 2"
        ></AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="Accordion 3"
        ></AccordionItem> */}
      </Accordion>
    </div>
  );
}
