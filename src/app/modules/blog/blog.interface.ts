/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
}

export interface BlogModel extends Model<IBlog> {
  isBlogExistsById: (id: string) => Promise<IBlog | null>;
}
