import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import PROJECT_OBJECT from '@salesforce/schema/Project__c';
import PROJECT_NAME_FIELD from '@salesforce/schema/Project__c.Name';

import MILESTONE_OBJECT from '@salesforce/schema/Milestone__c';
import MILESTONE_NAME_FIELD from '@salesforce/schema/Milestone__c.Name';
import MILESTONE_DUE_DATE_FIELD from '@salesforce/schema/Milestone__c.Due_Date__c';
import MILESTONE_PROJECT_FIELD from '@salesforce/schema/Milestone__c.Project__c';

import TODO_OBJECT from '@salesforce/schema/To_Do_Item__c';
import TODO_NAME_FIELD from '@salesforce/schema/To_Do_Item__c.Name';
import TODO_MILESTONE_FIELD from '@salesforce/schema/To_Do_Item__c.Milestone__c';
import TODO_STATUS_FIELD from '@salesforce/schema/To_Do_Item__c.Status__c';
import TODO_DUE_DATE_FIELD from '@salesforce/schema/To_Do_Item__c.Due_Date__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProjectManagement extends LightningElement {
    projectName = '';
    projectId;
    milestoneName = '';
    milestoneDueDate = '';
    todoitemDueDate = '';
    milestones = [];
    milestoneId;
    todoStatus = '';

    todoStatusOptions = [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Complete', value: 'Complete' }
    ];
    
    // Handle project details
    handleProjectNameChange(event) {
        this.projectName = event.target.value;
    }
   
   
    // Handle milestone details
    handleMilestoneNameChange(event) {
        this.milestoneName = event.target.value;
    }
    handleMilestoneDueDateChange(event) {
        this.milestoneDueDate = event.target.value;
    }
    handleToDoItemDueDateChange(event) {
        this.todoitemDueDate = event.target.value;
    }

    // Handle to-do item change
    handleToDoItemChange(event) {
        this.toDoItemName = event.target.value;
       // this.milestoneId = event.target.dataset.id;
    }
    handleToDoItemStatus(event) {
        this.todoStatus = event.target.value;
    }
    // Create the Project record
    handleCreateProject() {
        const fields = {
            [PROJECT_NAME_FIELD.fieldApiName]: this.projectName
        };

        const recordInput = { apiName: PROJECT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((projectRecord) => {
                this.projectId = projectRecord.id;
                console.log('Project created with Id: ' + this.projectId);
            })
            .catch((error) => {
                console.error('Error creating project: ', error);
            });
    }

    // Add Milestone
    handleAddMilestone() {
        const fields = {
            [MILESTONE_NAME_FIELD.fieldApiName]: this.milestoneName,
            [MILESTONE_DUE_DATE_FIELD.fieldApiName]: this.milestoneDueDate,
            [MILESTONE_PROJECT_FIELD.fieldApiName]: this.projectId,
        };

        const recordInput = { apiName: MILESTONE_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((milestoneRecord) => {
                this.milestones.push(milestoneRecord);
                this.milestoneId = milestoneRecord.id;
                console.log('Milestone created with Id: ' + milestoneRecord.id);
            })
            .catch((error) => {
                console.error('Error creating milestone: ', error);
            });
    }

    // Add To-Do item to a milestone
    handleAddToDo() {
        const fields = {
            [TODO_NAME_FIELD.fieldApiName]: this.toDoItemName,
            [TODO_MILESTONE_FIELD.fieldApiName]: this.milestoneId,
            [TODO_STATUS_FIELD.fieldApiName]: this.todoStatus,
            [TODO_DUE_DATE_FIELD.fieldApiName]: this.todoitemDueDate,
        };

        const recordInput = { apiName: TODO_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((toDoRecord) => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'To-Do item created successfully',
                    variant: 'success'
                }));
                console.log('To-Do item created with Id: ' + toDoRecord.id);
            })
            .catch((error) => {
                console.error('Error creating To-Do item: ', error);
            });
    }
}