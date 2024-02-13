import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { IoMdKey } from "react-icons/io";
const Credentials = () => {
  const [userpass, setUserpass] = useState({ username: "", password: "" });

  useEffect(() => {
    // send data to main process
  }, [userpass]);

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
              value={userpass.username}
              onChange={(e) => {
                setUserpass((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
              label="Username"
            />
            <Input
              className="h-14"
              value={userpass.password}
              onChange={(e) => {
                setUserpass((prev) => ({ ...prev, password: e.target.value }));
              }}
              label="Password"
            />
            <Button
              onClick={() => {
                setUserpass({ password: "", username: "" });
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
                <Button>Firefox</Button>
                <Button>Chrome</Button>
                <Button>Brave</Button>
                <Button>Vivaldi</Button>
                <Button>Safari</Button>
                <Button>Chromium</Button>
                <Button>Edge</Button>
                <Button>Opera</Button>
                <Button
                  color="primary"
                  className="text-zinc-900"
                  value={"none"}
                >
                  None
                </Button>
              </ButtonGroup>
            </div>
            <p className="mt-2">OR</p>
            <div>
              <Button variant="light" className="text-primary">
                Import Cookie.txt
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Credentials;
