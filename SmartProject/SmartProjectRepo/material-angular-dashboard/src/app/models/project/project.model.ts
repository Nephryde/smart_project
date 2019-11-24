import { User } from "../user.model";

export class Project {
    name: string;
    addedDate: Date;
    closeDate: Date;
    projectManager: User;
}