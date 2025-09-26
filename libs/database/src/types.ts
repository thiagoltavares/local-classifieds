// /Users/thiagotavares/Projects/Services/libs/database/src/types.ts
import type { Post, User } from '../dist/generated/client';

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}

export interface CreatePostInput {
  title: string;
  content?: string;
  published?: boolean;
  authorId: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  published?: boolean;
}

export type UserWithPosts = User & {
  posts: Post[];
};

export type PostWithAuthor = Post & {
  author: User;
};
