export class TaskDetails {
    taskId?: number;
    title: string;
    projectId: number;
    projectName: string;
    releaseId: number;
    releaseName: string;
    authorId: number;
    authorName: string;
    userAssignedId: number;
    userAssignedName: string;
    modifiedDate: Date;
    addedDate: Date;
    deadlineDate: Date;
    status: string;
    priority: string;
    type: string;
    estimatedTime: number;
    progress: number;
    description: string;
}