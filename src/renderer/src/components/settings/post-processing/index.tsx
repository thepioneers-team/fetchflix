import { Accordion, AccordionItem } from "@nextui-org/react";
import AudioQuality from "./AudioQuality";
import ChapterOutputFilenameFormat from "./ChapterOutputFilenameFormat";
import KeepVideo from "./KeepVideo";
import SplitChapters from "./SplitChapters";
import CovertArt from "./CovertArt";
import EmbedChapters from "./EmbedChapters";
import EnableSponsorblock from "./EnableSponsorBlock";
import SponsorblockAPIUrl from "./SponsorblockAPIUrl";
import SponsorblockRemove from "./SponsorblockRemove";
import CustomPostRenderingCommand from "./CustomPostRenderingCommand";

const components = [
  {
    title: "Cover Art",
    component: CovertArt,
  },
  {
    title: "Keep Video",
    component: KeepVideo,
  },
  {
    title: "Audio Quality",
    component: AudioQuality,
  },
  {
    title: "Split Chapters",
    component: SplitChapters,
  },
  {
    title: "Chapter Output Filename Format",
    component: ChapterOutputFilenameFormat,
  },
  {
    title: "Embed Chapters",
    component: EmbedChapters,
  },
  {
    title: "Enable Sponsorblock",
    component: EnableSponsorblock,
  },
  {
    title: "Sponsorblock API URL",
    component: SponsorblockAPIUrl,
  },
  {
    title: "Sponsorblock Remove",
    component: SponsorblockRemove,
  },
  {
    title: "Custom Post Rendering Command",
    component: CustomPostRenderingCommand,
  },
];

export default function PostProcessing() {
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
