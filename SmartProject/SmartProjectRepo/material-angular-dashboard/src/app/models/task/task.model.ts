import { TaskPriority } from "./task-priority.model";
import { TaskType } from "./task-type.model";
import { TaskStatus } from "./task-status.model";
import { User } from "../user.model";

export class Task {
    id?: number;
    title: string;
    author: User;
    addedDate: string;
    type: TaskType;
    status: TaskStatus;
    priority: TaskPriority;
}