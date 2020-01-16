import { Tuid, Map, Query, Action, Sheet, Pending } from "tonva";

export interface TaskManage {
    Company:Tuid;
    Department:Tuid;
    StaffMember:Tuid;
    Task:Sheet;
    PENDING:Pending;
    QueryTask:Query;
}

export interface UQs {
    taskmanage: TaskManage;
}

