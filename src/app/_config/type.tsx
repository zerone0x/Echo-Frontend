export interface ParamsProps {
  params: {
    feedId: string;
    username: string;
  };
}

export interface User {
  id: string;
}

export interface Feed {
  _id: string;
  user: User;
  content: string;
  createdAt: string;
  type: string;
  comments: Comment[];
  feedImages: string[];
}

export interface Comment {
  _id: string;
  user: User;
  content: string;
  createdAt: string;
  type: string;
  feed: Feed;
}
