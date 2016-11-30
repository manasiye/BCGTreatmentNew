import { timelineRoutes } from './components/timeline'
export const appRoutes = [
    { path: "", redirectTo: "/timeline/4hrs", pathMatch: "full", terminal: true },

    ...timelineRoutes
];
