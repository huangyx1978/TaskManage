import { Tuid, Map, Query, Action, Sheet, Pending } from "tonva";

export interface TaskManage {
    Company:Tuid;
    Department:Tuid;
    StaffMember:Tuid;
    Task:Sheet;
    PENDING:Pending;
    QueryTask:Query;
}

export interface Task {
    Company: Tuid;
    QueryCompany: Query;
    Department: Tuid;
    QueryDepartment: Query;
    QueryAllDepartment: Query;
    QueryDepartments: Query;
    StaffMember: Tuid;
    QueryStaffMember:Query;
    SaveStaffDepartment:Action;
}

export interface UQs {
    taskmanage: TaskManage;
    task: Task;
}

