import { TimelineComponent } from './';
import { Page2hrsComponent } from './page-2hrs/page-2hrs.component';
import { Page4hrsComponent } from './page-4hrs/page-4hrs.component';
import { Page6hrsComponent } from './page-6hrs/page-6hrs.component';
import { Page48hrsComponent } from './page-48hrs/page-48hrs.component';

export const timelineRoutes = [
    // { path: "", component: TimelineComponent },
    {
        path: "timeline",
        component: TimelineComponent,
        children: [
            {
                path: "2hrs", component: Page2hrsComponent
            },
            {
                path: "4hrs", component: Page4hrsComponent
            },
            {
                path: "6hrs", component: Page6hrsComponent
            },
            {
                path: "48hrs", component: Page48hrsComponent
            },
        ]
    },
];