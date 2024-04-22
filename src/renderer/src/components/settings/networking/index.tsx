import { Accordion, AccordionItem } from "@nextui-org/react";
import ProxyIPAddress from "./ProxyIPAddress";
import SocketTimeout from "./SocketTimeout";
import SourceIPAddress from "./SourceIPAddress";
import ForceIPVersion from "./ForceIPVersion";
import RateLimit from "./RateLimit";
import ThrottleRate from "./ThrottleRate";
import Unit from "./Unit";
import SuppressHTTPSCertificateValidation from "./SuppressHTTPSCertificateValidation";
import PreferInsecure from "./PreferInsecure";
import CustomUserAgent from "./CustomUserAgent";
import RefererURL from "./RefererURL";

const components = [
  {
    title: "Proxy IP Address",
    component: ProxyIPAddress,
  },
  {
    title: "Socket Timeout",
    component: SocketTimeout,
  },
  {
    title: "Source IP",
    component: SourceIPAddress,
  },
  {
    title: "Force IP Version",
    component: ForceIPVersion,
  },
  {
    title: "Rate Limit",
    component: RateLimit,
  },
  {
    title: "Throttle Rate",
    component: ThrottleRate,
  },
  {
    title: "Unit",
    component: Unit,
  },
  {
    title: "Suppress HTTPS Certificate Validation",
    component: SuppressHTTPSCertificateValidation,
  },
  {
    title: "Prefer Insecure",
    component: PreferInsecure,
  },
  {
    title: "Custom User Agent",
    component: CustomUserAgent,
  },
  {
    title: "Referer URL",
    component: RefererURL,
  },
];

export default function Network() {
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
