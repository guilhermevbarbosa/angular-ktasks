import { Category } from './category';

export class Task {
  _id: number;
  name: string;
  description: string;
  category: Category;
  status: number;
}
