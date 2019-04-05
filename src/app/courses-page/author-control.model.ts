import { Author } from './author.model';

export interface AuthorControl extends Author{
  isSelected: boolean;
}