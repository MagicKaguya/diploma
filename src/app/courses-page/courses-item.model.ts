import { Author } from './author.model';

export interface CoursesItem {
    id: number
    groupId: string,
    userId: number
    title: string
    teacher: string
    time: string
    class: string
}
