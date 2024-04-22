import { Accordion, AccordionItem } from "@nextui-org/react";
import OutputFilenameFormat from "./OutputFilenameFormat";
import RestrictFileNames from "./RestrictFileNames";
import DisablePartFiles from "./DisablePartFiles";
import NoMtime from "./NoMtime";
import Notifications from "./Notifications";
import RemoveOnFinish from "./RemoveOnFinish";
import PromptForPlaylist from "./PromptForPlaylist";
import Subtitles from "./Subtitles";
import AutoGenerateSubtitles from "./AutoGenSubtitles";
import AllSubtitles from "./AllSubtitles";
import Annotations from "./Annotations";
import Description from "./Description";
import Metadata from "./Metadata";
import AddMetadata from "./AddMetadata";
import Thumbnail from "./Thumbnail";
import AllowDiscordRPC from "./DiscordRPC";

const components = [
  {
    title: "Discord RPC",
    component: AllowDiscordRPC,
  },
  {
    title: "Output Filename Format",
    component: OutputFilenameFormat,
  },
  {
    title: "Restrict File Names",
    component: RestrictFileNames,
  },
  {
    title: "Disable *.part files",
    component: DisablePartFiles,
  },
  {
    title: "No Mtime",
    component: NoMtime,
  },
  {
    title: "Notifications",
    component: Notifications,
  },
  {
    title: "Remove on Finish",
    component: RemoveOnFinish,
  },
  {
    title: "Prompt for playlist",
    component: PromptForPlaylist,
  },
  {
    title: "Subtitles",
    component: Subtitles,
  },
  {
    title: "Auto generated subtitles",
    component: AutoGenerateSubtitles,
  },
  {
    title: "All subtitles",
    component: AllSubtitles,
  },
  {
    title: "Annotations",
    component: Annotations,
  },
  {
    title: "Description",
    component: Description,
  },
  {
    title: "Metadata",
    component: Metadata,
  },
  {
    title: "Add Metadata",
    component: AddMetadata,
  },
  {
    title: "Thumbnail",
    component: Thumbnail,
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
