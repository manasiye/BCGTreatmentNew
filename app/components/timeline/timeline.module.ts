import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { TimelineComponent, timelineRoutes } from './';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@NgModule({
    declarations: [TimelineComponent],
    // imports: [timelineRoutes],
})
export class TimelineModule { }
