import { Accordion, AccordionItem } from "@nextui-org/react";
import BuildChannel from "./BuildChannel";
import FfmpegLocation from "./ffmpeg-location";

const components = [
  {
    title: "Build Channel",
    component: BuildChannel,
  },
  {
    title: "FFMPEG Location",
    component: FfmpegLocation,
  },
];

export default function Advanced() {
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
            className="mt-2 rounded-md bg-[#323232] px-4 py-1 text-white"
            title={component.title}
          >
            <component.component />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
