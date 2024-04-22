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
      settings: {},
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
          set({ error: null }); // Clear any previous error on successful save
        } catch (error) {
          set({ error: error as string }); // Set error state if the save fails
        }
      },
    }),
    {
      name: "settings", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useSettingsStore;
