import { Accordion, AccordionItem } from "@nextui-org/react";

const components = [
  {
    title: "Output Filename Format",
    component: "OutputFilenameFormat",
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
            className="mt-2 rounded-md bg-[#323232] p-2 px-4 text-white"
            title={component.title}
          >
            <component.component />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
