import { Component, ViewEncapsulation, ViewChild, ContentChildren, ElementRef, QueryList, AfterViewInit } from "@angular/core";
import switchModule = require("ui/switch");
import dialogs = require("ui/dialogs");
import { ModalDialogOptions, ModalDialogHost, ModalDialogService } from "nativescript-angular/modal-dialog";
import { DatePicker } from 'ui/date-picker';
import observableArray = require("data/observable-array");
import { Template, View } from "ui/core/view";
import { AddTreatmentDialog } from "../add-treatment-dialog";
import { prompt } from "ui/dialogs";
import { TreatmentSchedule, TreatmentTime, TreatmentDate } from '../../types';
import { AppDataService } from '../../providers';
import { PropertyChangeData } from "data/observable";
import observableModule = require("data/observable");

import * as Toast from 'nativescript-toast';


export interface DateTimeSelection {
    dateTime: string,
    time: TreatmentTime,
    date: TreatmentDate
}

@Component({
    selector: "page-treatment-schedule",
    templateUrl: "./components/treatment-schedule/treatment-schedule.component.html",
    styleUrls: ["./components/treatment-schedule/treatment-schedule.component.css"],
    providers: [ModalDialogService]
})

export class PageTreatmentSchedule implements AfterViewInit {
    @ViewChild('notificationsList') notificationsList: View;
    @ContentChildren('notificationSwitch') notificationSwitches: QueryList<any>;
    // @ContentChildren('stack') stacks: QueryList<any>;

    result: string;

    treatmentSchedules: TreatmentSchedule[] = [];

    constructor(
        private modalService: ModalDialogService,
        private appData: AppDataService
    ) {
        var observableObject = new observableModule.Observable();
        observableObject.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData: PropertyChangeData) {
            console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
        });
    }
    ngAfterViewInit() {
        this.getAllTreatmentSchedules();
    }

    addNotification() {
        var options: ModalDialogOptions = {
            context: { promptMsg: "Schedule your Treatment" },
            fullscreen: false
        };

        this.modalService.showModal(AddTreatmentDialog, options).then(
            // (DialogResult: string) => this.result = DialogResult
            (dateTimeSelection: DateTimeSelection) => {
                let treatmentSchedule: TreatmentSchedule = {
                    dateTime: null,
                    date: null,
                    time: null,
                    enableNotifications: false
                };
                treatmentSchedule.dateTime = dateTimeSelection.dateTime;
                treatmentSchedule.enableNotifications = false;
                this.appData.saveTreatmentSchedule(dateTimeSelection.dateTime, false).then(success => {
                    this.getAllTreatmentSchedules();
                }, error => {
                    console.log('Save Treatment error', JSON.stringify(error));
                });
                console.log('COMPONENT', JSON.stringify(dateTimeSelection), JSON.stringify(treatmentSchedule));
            }, error => {
                console.log(JSON.stringify(error));
            }
        );

    }

    getAllTreatmentSchedules() {
        this.appData.getAllTreatmentSchedules().then((treatmentSchedules: TreatmentSchedule[]) => {
            this.treatmentSchedules = treatmentSchedules
            console.log(`Got ${this.treatmentSchedules.length} Treatment Schedules`);
        }, error => {
            console.log('Get ALL Treatment error', JSON.stringify(error));
        });
    }

    notificationStatusChanged(id: number, element: switchModule.Switch) {
        let status: boolean = !element.checked;
        let statusText = 'enabled';
        if (!status) {
            statusText = 'disabled';
        }


        console.log('Status CHanged', id, status);
        this.appData.updateTreatmentEntry(id, status).then(success => {
            console.log('Status Updated');
            Toast.makeText(`Notification ${statusText}!`).show();
        }, error => {
            console.log('Update Treatment error', JSON.stringify(error));
        })

    }

    delete(id: number) {
        this.appData.deleteTreatmentEntry(id).then(success => {
            this.getAllTreatmentSchedules();
        }, error => {
            console.log('Delete Treatment error', JSON.stringify(error));
        });
    }

}



