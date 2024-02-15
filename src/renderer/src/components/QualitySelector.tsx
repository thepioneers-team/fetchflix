import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@nextui-org/react";
import { useState } from "react";

import { PiFileAudioBold } from "react-icons/pi";
import { RiFileVideoLine } from "react-icons/ri";

const FORMATS = [
  {
    isVideo: true,
    value: "3GP",
  },
  {
    isVideo: false,
    value: "AAC",
  },
  {
    isVideo: false,
    value: "FLAC",
  },
  {
    isVideo: true,
    value: "FLV",
  },
  {
    isVideo: true,
    value: "M4A",
  },
  {
    isVideo: false,
    value: "MP3",
  },
  {
    isVideo: true,
    value: "MP4",
  },
  {
    isVideo: false,
    value: "OPUS",
  },
  {
    isVideo: false,
    value: "VORBIS",
  },
  {
    isVideo: false,
    value: "WAV",
  },
  {
    isVideo: true,
    value: "WEBM",
  },
  {
    isVideo: true,
    value: "BEST",
  },
  {
    isVideo: true,
    value: "WORST",
  },
  { separator: true },
  {
    isVideo: true,
    larger: true,
    value: "BESTVIDEO",
  },
  {
    isVideo: true,
    larger: true,
    value: "BESTAUDIO",
  },
  {
    isVideo: true,
    larger: true,
    value: "BESTVIDEO+BESTAUDIO",
  },
  {
    isVideo: true,
    larger: true,
    value: "BESTVIDEO[EXT=MP4]+BESTAUDIO[EXT=M4A]/BEST[EXT=MP4]/BEST",
  },
];

const QualitySelector = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>("hello");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    // alert main process
  };

  return (
    <div>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <div className="text- mx-2 cursor-pointer font-roboto text-primary">
            {selectedValue!.length > 8
              ? selectedValue?.substring(0, 8) + "..."
              : selectedValue}
          </div>
        </PopoverTrigger>
        <PopoverContent className="text-white dark">
          <div className="flex max-w-[450px] flex-wrap gap-2 p-3">
            {FORMATS.map((format) => (
              <>
                {format.separator ? (
                  <Divider className="my-2" />
                ) : (
                  <div
                    onClick={() => handleValueChange(format.value as string)}
                    className={cn(
                      "flex h-[73px] cursor-pointer flex-col justify-center overflow-hidden rounded-md border border-zinc-700 hover:border-primary",
                      format.larger
                        ? "w-[132px] items-start px-2"
                        : "w-[73px] items-center",
                      {
                        "!border-primary text-primary":
                          format.value?.toLowerCase() ===
                          selectedValue?.toLowerCase(),
                      },
                    )}
                    key={format.value}
                  >
                    {format.isVideo ? (
                      <RiFileVideoLine className="h-5 w-5" />
                    ) : (
                      <PiFileAudioBold className="h-5 w-5" />
                    )}
                    {format.value!.length > 16
                      ? format.value?.substring(0, 16) + "..."
                      : format.value}
                  </div>
                )}
              </>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default QualitySelector;
