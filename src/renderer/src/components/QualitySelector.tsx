import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@nextui-org/react";
import { FORMATS } from "@renderer/utils/constants";
import { useState } from "react";

import { PiFileAudioBold } from "react-icons/pi";
import { RiFileVideoLine } from "react-icons/ri";

const QualitySelector = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>("BEST");

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
            {FORMATS.map((format, idx) => (
              <>
                {format.separator ? (
                  <Divider key={`qs-${idx}`} className="my-2" />
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
