import { Category } from './category';

export class Task {
  id: number;
  name: string;
  description: string;
  category: Category;
  status: number;
}
