import { defaultSettings } from "@renderer/utils/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsState {
  settings: Record<string, any>;
  error: string | null;
  updateSetting: (key: string, value: any) => void;
  saveSettings: () => Promise<void>;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      error: null,
      settings: defaultSettings,
      updateSetting: (key, value) => {
        const newSettings = { ...get()?.settings, [key]: value };
        set({ settings: newSettings });
      },
      saveSettings: async () => {
        try {
          const response = await window.electron.ipcRenderer.invoke(
            "save-settings",
            get().settings,
          );
          if (response !== "success") {
            throw new Error("Backend update failed");
          }
          set({ error: null });
        } catch (error) {
          set({ error: error as string });
        }
      },
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState: any = {}) => {
        return { ...defaultSettings, ...persistedState };
      },
    },
  ),
);

export default useSettingsStore;
