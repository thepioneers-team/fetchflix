import { Switch } from "@nextui-org/react";
import useSettingsStore from "@renderer/stores/settings";
import { useState } from "react";

export default function SuppressHTTPSCertificateValidation() {
  const { settings, updateSetting } = useSettingsStore();

  const [checked, setChecked] = useState<boolean>(
    settings.suppressHTTPCertificateValidation,
  );

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    updateSetting("suppressHTTPCertificateValidation", checked);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="w-10/12 text-xs">
        Suppress all HTTPS certificate validations
      </p>
      <Switch isSelected={checked} onValueChange={handleChange} />
    </div>
  );
}
