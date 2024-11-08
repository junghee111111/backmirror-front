import { atom } from "jotai";

type TAreaSavedListUI = {
  exportDialogOpen: boolean;
  importDialogOpen: boolean;
};
export const SAreaSavedListUI = atom<TAreaSavedListUI>({
  exportDialogOpen: false,
  importDialogOpen: false,
});

export const setExportDialogOpen = atom(
  (get) => get(SAreaSavedListUI),
  (get, set, value: boolean) => {
    const state = get(SAreaSavedListUI);
    set(SAreaSavedListUI, {
      ...state,
      exportDialogOpen: value,
    });
  }
);

export const setImportDialogOpen = atom(
  (get) => get(SAreaSavedListUI),
  (get, set, value: boolean) => {
    const state = get(SAreaSavedListUI);
    set(SAreaSavedListUI, {
      ...state,
      importDialogOpen: value,
    });
  }
);
