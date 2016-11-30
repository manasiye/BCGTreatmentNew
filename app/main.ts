// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { appRoutes } from './app.routes';
import { TimelineModule, TimelineComponent, Page2hrsComponent, Page4hrsComponent, Page6hrsComponent, Page48hrsComponent } from './components/timeline';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
// import { TNSFontIconService, TNSFontIconPipe } from 'nativescript-ng2-fonticon';

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent,
        Page2hrsComponent,
        Page4hrsComponent,
        Page6hrsComponent,
        Page48hrsComponent,
        // TNSFontIconPipe
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        // TimelineModule

    ],
    entryComponents: [Page2hrsComponent, Page4hrsComponent, Page6hrsComponent, Page48hrsComponent],
    // providers: [
    //     {
    //         provide: TNSFontIconService,
    //         useFactory: () => {
    //             return new TNSFontIconService({
    //                 'fa': 'font-awesome.css'
    //             })
    //         }
    //     }
    // ]

})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);




