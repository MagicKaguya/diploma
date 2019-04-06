import { Author } from './author.model';

export interface CoursesItem {
    id: number
    title: string
    creationDate: number
    duration: number
    description: string
    topRated: boolean,
    groupId?: string,
    authors?: Author[]
}
