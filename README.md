To implement the described project management system in Salesforce, here's a breakdown of how you can structure the system, including data models, automations, and the Lightning Web Component (LWC) development. This will cover both the back-end Salesforce configuration and the front-end LWC component.

### 1. **Data Model**:

You'll need to create custom objects in Salesforce to store the necessary information for Projects, Milestones, and To-Do items.

#### a. **Project Object**:

* **Fields**:

  * `Project Name` (Text)
  * `Owner` (Lookup to User)
  * `Status` (Picklist: Not Started, In Progress, Complete)
  * `% Complete` (Percent)
* **Relationships**:

  * `Project` has a one-to-many relationship with Milestones (each project can have multiple milestones).

#### b. **Milestone Object**:

* **Fields**:

  * `Milestone Name` (Text)
  * `% Complete` (Percent)
  * `Status` (Picklist: Not Started, In Progress, Complete)
  * `Due Date` (Date)
  * `Project` (Lookup to Project)
* **Relationships**:

  * `Milestone` has a one-to-many relationship with To-Do items (each milestone can have multiple to-do items).

#### c. **To-Do Item Object**:

* **Fields**:

  * `To-Do Name` (Text)
  * `Status` (Picklist: Not Started, In Progress, Complete)
  * `Due Date` (Date)
  * `Milestone` (Lookup to Milestone)
* **Relationships**:

  * Each To-Do item is related to a specific Milestone.

### 2. **Automations & Calculations**:

#### a. **Calculating Project % Complete**:

You can create a **formula field** or a **trigger** that automatically updates the **Project % Complete** based on the Milestones associated with it. The calculation should be:

* `Project % Complete = (Sum of Milestone % Complete) / Total Number of Milestones`

#### b. **Calculating Milestone % Complete**:

Similarly, create a **formula field** or **trigger** that calculates the **Milestone % Complete** based on the number of To-Dos that are completed versus the total number of To-Dos for that milestone:

* `Milestone % Complete = (Number of Completed To-Dos / Total Number of To-Dos) * 100`

#### c. **Status Calculations**:

You can use **formula fields** or **process builder/flows** to automatically update the status fields based on the percentage values.

* **Project Status**:

  * `IF(% Complete = 0, "Not Started", IF(% Complete = 100, "Complete", "In Progress"))`

* **Milestone Status**:

  * `IF(% Complete = 0, "Not Started", IF(% Complete = 100, "Complete", "In Progress"))`

**Note**: Since the project and milestone status fields are to be automatically calculated, you’ll need to set them as **read-only** to prevent manual changes. Use a **validation rule** to ensure that the status cannot be manually altered by users.# wex_ProjectManagament