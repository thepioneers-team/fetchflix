import {
  Button,
  ButtonGroup,
  Code,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@nextui-org/react";

import { FaCookieBite } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";

import { useCookies, useCredentials } from "@renderer/stores/credentials";

import { Credentials } from "@renderer/types/Credentials";

const Credentials = () => {
  const { credentials, setPassword, setUsername, setCredentials } =
    useCredentials();
  const { cookies, setCookies } = useCookies();

  const handleImportCookie = async () => {
    if (cookies === "custom") {
      setCookies("none");
    }
    const data = await window.api.app.selectCookie();
    if (data.canceled) {
      setCookies("none");
    } else {
      setCookies("custom");
    }
  };

  return (
    <div className="flex h-7 items-center gap-2 rounded-full bg-zinc-800 px-2 py-1 font-roboto text-xl">
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <div className=" text-2xl text-yellow-500">
            <IoMdKey className="cursor-pointer" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="text-white dark">
          <div className="flex max-w-72 flex-col gap-2 px-1 py-2">
            <p className="mb-2 text-xs">
              If you need to pass a username and/or password to access the link,
              you can enter that here
            </p>
            <Input
              className="h-14"
              value={credentials.username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              label="Username"
            />
            <Input
              className="h-14"
              value={credentials.password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            <Button
              onClick={() => {
                setCredentials({ password: "", username: "" });
              }}
              className="w-full text-primary"
              variant="light"
            >
              CLEAR
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Divider orientation="vertical" />
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <div className=" cursor-pointer">
            <FaCookieBite className="h-4 w-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="text-white dark">
          <div className="flex min-w-72 flex-col items-center justify-center gap-2 px-1 py-4">
            <h1>Select Cookie Option:</h1>
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setCookies("firefox");
                  }}
                  {...(cookies === "firefox"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "firefox",
                      }
                    : {})}
                >
                  Firefox
                </Button>
                <Button
                  onClick={() => {
                    setCookies("chrome");
                  }}
                  {...(cookies === "chrome"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "chrome",
                      }
                    : {})}
                >
                  Chrome
                </Button>
                <Button
                  onClick={() => {
                    setCookies("brave");
                  }}
                  {...(cookies === "brave"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "brave",
                      }
                    : {})}
                >
                  Brave
                </Button>
                <Button
                  onClick={() => {
                    setCookies("vivaldi");
                  }}
                  {...(cookies === "vivaldi"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "vivaldi",
                      }
                    : {})}
                >
                  Vivaldi
                </Button>
                <Button
                  onClick={() => {
                    setCookies("safari");
                  }}
                  {...(cookies === "safari"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "safari",
                      }
                    : {})}
                >
                  Safari
                </Button>
                <Button
                  onClick={() => {
                    setCookies("chromium");
                  }}
                  {...(cookies === "chromium"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "chromium",
                      }
                    : {})}
                >
                  Chromium
                </Button>
                <Button
                  onClick={() => {
                    setCookies("edge");
                  }}
                  {...(cookies === "edge"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "edge",
                      }
                    : {})}
                >
                  Edge
                </Button>
                <Button
                  onClick={() => {
                    setCookies("opera");
                  }}
                  {...(cookies === "opera"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "opera",
                      }
                    : {})}
                >
                  Opera
                </Button>
                <Button
                  onClick={() => {
                    setCookies("none");
                  }}
                  {...(cookies === "none"
                    ? {
                        color: "primary",
                        className: "text-zinc-900",
                        value: "none",
                      }
                    : {})}
                >
                  None
                </Button>
              </ButtonGroup>
            </div>
            <p className="mt-2">OR</p>
            <div>
              <Button
                onClick={handleImportCookie}
                variant={cookies === "custom" ? "solid" : "light"}
                color="primary"
                className={cn(
                  "text-primary",
                  cookies === "custom" && "text-zinc-900",
                )}
                disabled={!(cookies == "custom" || cookies == "none")}
              >
                {cookies === "custom"
                  ? "Remove Cookie.txt"
                  : "Import Cookie.txt"}
              </Button>
            </div>
            {cookies === "custom" && (
              <Code>{localStorage.getItem("cookiePath")}</Code>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Credentials;
