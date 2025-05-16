To implement the described project management system in Salesforce, here's a breakdown of how you can structure the system, including data models, automations, and the Lightning Web Component (LWC) development. This will cover both the back-end Salesforce configuration and the front-end LWC component.

### 1. **Data Model**:

You'll need to create custom objects in Salesforce to store the necessary information for Projects, Milestones, and To-Do items.

#### a. **Project Object**:

* **Fields**:

  * `Project Name` (Text)
  * `Owner` (Lookup to User)
  * `Project_Status__c` (Formula)
  * `Project_Complete__c` (Formula)
  * `Sum_of_Milestone_Complete__c` (Roll-Up Summary (SUM Milestone))
  * `Total_No_of_Milestones__c` (Roll-Up Summary (COUNT Milestone))
* **Relationships**:

  * `Project` has a one-to-many relationship with Milestones (each project can have multiple milestones).

#### b. **Milestone Object**:

* **Fields**:

  * `Milestone Name` (Text)
  * `Milestone_Complete__c` (Formula)
  * `Milestone_Status__c` (Formula)
  * `Due Date` (Date)
  * `Project` (Master-Detail(Project))
  * `Count_of_Competed_To_Do__c` (Roll-Up Summary (COUNT To Do Item))
* **Relationships**:

  * `Milestone` has a one-to-many relationship with To-Do items (each milestone can have multiple to-do items).

#### c. **To-Do Item Object**:

* **Fields**:

  * `To-Do Name` (Text)
  * `Status` (Picklist: Not Started, In Progress, Complete)
  * `Due Date` (Date)
  * `Milestone` (Master-Detail(Milestone))
* **Relationships**:

  * Each To-Do item is related to a specific Milestone.

### 2. **Automations & Calculations**:

#### a. **Calculating Project % Complete**:

we have created a **formula field**  that automatically updates the **Project % Complete** based on the Milestones associated with it. The calculation should be:

* `Project % Complete = (Sum of Milestone % Complete) / Total Number of Milestones`

#### b. **Calculating Milestone % Complete**:

Similarly, created a **formula field** that calculates the **Milestone % Complete** based on the number of To-Dos that are completed versus the total number of To-Dos for that milestone:

* `Milestone % Complete = (Number of Completed To-Dos / Total Number of To-Dos) * 100`

#### c. **Status Calculations**:

We have created **formula fields** here to automatically update the status fields based on the percentage values.

* **Project Status**:

  * `IF(% Complete = 0, "Not Started", IF(% Complete = 100, "Complete", "In Progress"))`

* **Milestone Status**:

  * `IF(% Complete = 0, "Not Started", IF(% Complete = 100, "Complete", "In Progress"))`


### 3. **LWC component i.e Project Management**:
       We have created a LWC components on the basis of the requirements.

