import type { RootState } from "../index";

export const selectUIState = (state: RootState) => state.ui;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectNotification = (state: RootState) => state.ui.notification;
export const selectIsModalOpen = (state: RootState) => state.ui.isModalOpen;
