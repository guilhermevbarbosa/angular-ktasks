import { Category } from './category';

export class Task {
  _id: string;
  name: string;
  description: string;
  category: Category;
  status: number;
}
