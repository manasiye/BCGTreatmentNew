
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { trigger, style, animate, state, transition } from '@angular/core';
import observable = require("data/observable");


import { screen, ScreenMetrics } from 'platform';
import { Page } from "ui/page";
import { GridLayout } from "ui/layouts/grid-layout";
import { Color } from "color";
import { View } from "ui/core/view";
import { Animation } from "ui/animation";


export class DataItem {
    constructor(public itemDesc: string) { }
}

interface TimelineButton {
    text: string;
    text_secondary?: string;
    iconTop?: string;
    iconBottom?: string;
    color?: string;
    route: string;
}

@Component({
    selector: 'app-timeline',
    templateUrl: './components/timeline/timeline.component.html',
    styleUrls: ['./components/timeline/timeline.component.css']
})

export class TimelineComponent implements OnInit {

    timelineButtonsArr: TimelineButton[];

    selectedIndex: number = 0;
    screenWidth: number = screen.mainScreen.widthPixels;

    @ViewChild('mainContainer') mainContainer: ElementRef;
    @ViewChild('timelineButtons') timelineButtons: ElementRef;
    @ViewChild('timelineContent') timelineContent: ElementRef;

    constructor() {
        this.timelineButtonsArr = [
            {
                // iconBottom: '&#xf063;',
                iconBottom: 'fa-arrow-down',
                text: '4 Hours',
                color: '#52caf5',
                route: './4hrs'
            },
            {
                // iconTop: '&#xf062;',
                iconBottom: 'fa-arrow-up',
                text: '2 Hours',
                color: '#f5895b',
                route: './2hrs'
            },
            {
                text: '6 Hours',
                color: '#52caf5',
                route: './6hrs'
            },
            {
                text: '48 Hours',
                color: '#52caf5',
                route: './48hrs'
            }
        ];
    }


    ngOnInit() {
    }

    onLoaded(event) {
        // console.log("We have load event", event);
        let tb = <View>this.timelineButtons.nativeElement;
        let tc = <View>this.timelineContent.nativeElement;
        let mc = <View>this.mainContainer.nativeElement;

        mc.horizontalAlignment;
        tb.opacity = 1;

        tb.translateX = this.screenWidth / 10;
        tc.opacity = 0;

    }
    onChildLoaded(event) {
    }

    onTap() {
        let tc = <View>this.timelineContent.nativeElement;
        let tb = <View>this.timelineButtons.nativeElement;
        let mc = <View>this.mainContainer.nativeElement;
        mc.horizontalAlignment;
        let duration = 1000;
        let animations = [];

        animations.push({
            target: tb,
            translate: { x: 0, y: 0 },
            opacity: 1,
            delay: 500,
            duration: duration
        });
        animations.push({
            target: tc,
            translate: { x: 0, y: 0 },
            opacity: 1,
            delay: 500,
            duration: duration
        });
        new Animation(animations, false).play();

    }

}



