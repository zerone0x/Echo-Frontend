export interface ParamsProps {
  params: {
    feedId: string;
    username: string;
  };
}

export interface UserProps {
  id: string;
  name: string;
  _id?: string;
  email?: string;
  username?: string;
  ProfileImage: string;
  Banner: string;
  Bio: string;
}

export interface FeedProps {
  _id: string;
  id: string;
  user: UserProps;
  commentsCount: number;
  likesCount: number;
  content: string;
  createdAt: string;
  type: string;
  comments: CommentProps[];
  feedImages: string[];
}

export interface CommentProps {
  _id: string;
  id: string;
  commentsCount: number;
  likesCount: number;
  user: UserProps;
  content: string;
  createdAt: string;
  type: string;
  feed?: FeedProps;
  feedImages: string[];
}

export interface NotificationProps {
  id: string;
  _id: string;
  sender: UserProps;
  receiver: UserProps;
  content: FeedProps | CommentProps;
  createdAt: string;
  type: string;
  action: string;
  status: string;
}
