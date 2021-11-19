export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bible = {
  __typename?: 'Bible';
  PK: Scalars['ID'];
  SK: Scalars['ID'];
  chapter: Scalars['Int'];
  isLast?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
  title: Scalars['String'];
  verse: Scalars['Int'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  chapter?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Church = {
  __typename?: 'Church';
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Code = {
  __typename?: 'Code';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  level: Scalars['String'];
  verifyNumber: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  likers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recomments?: Maybe<Array<Maybe<Recomment>>>;
  text?: Maybe<Scalars['String']>;
  timeStamp?: Maybe<Scalars['String']>;
  writer?: Maybe<Profile>;
};

export type Contemplation = {
  __typename?: 'Contemplation';
  commentCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  likers?: Maybe<Array<Maybe<Scalars['String']>>>;
  range?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeStamp?: Maybe<Scalars['String']>;
  viewers?: Maybe<Array<Maybe<Scalars['String']>>>;
  writer?: Maybe<Profile>;
};

export type CreateBookmarkInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateChurchInput = {
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type CreateCodeInput = {
  level?: Maybe<Scalars['String']>;
};

export type CreateContemplationInput = {
  content: Scalars['String'];
  range: Scalars['String'];
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateRoomInput = {
  name?: Maybe<Scalars['String']>;
  photoUri?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateUserIput = {
  birthDay?: Maybe<Scalars['String']>;
  church?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
};

export type DeleteBookmarkInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
};

export type DeleteCommentInput = {
  commentID: Scalars['ID'];
  contemplationID: Scalars['ID'];
};

export type DeleteContemplationInput = {
  id: Scalars['ID'];
};

export type DeleteRecommentInput = {
  commentID: Scalars['ID'];
  recommentID: Scalars['ID'];
};

export type ExitRoomInput = {
  roomId: Scalars['String'];
};

export type GetBibleByChapterInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
};

export type GetBibleByVerseInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
  verse: Scalars['Int'];
};

export type GetBibleByVerseListInput = {
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetContemplationInput = {
  id: Scalars['ID'];
  writer: Scalars['String'];
};

export type GetContemplationsInput = {
  key?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type GetMyBookmarkByChapterInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
};

export type GetMyChatRoomInfoInput = {
  roomId: Scalars['String'];
};

export type GetProfilesInput = {
  users?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetRecentMessageInput = {
  roomId: Scalars['String'];
};

export type GetRoomMessagesInput = {
  key?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  roomId: Scalars['String'];
};

export enum LikeActionType {
  Activate = 'activate',
  Inactivate = 'inactivate'
}

export type LikeCommentInput = {
  commentID: Scalars['ID'];
  contemplationID: Scalars['ID'];
};

export type LikeContemplationInput = {
  id: Scalars['ID'];
  type?: Maybe<LikeActionType>;
  writer: Scalars['String'];
};

export type LikeRecommentInput = {
  commentID: Scalars['ID'];
  recommentID: Scalars['ID'];
};

export type Message = {
  __typename?: 'Message';
  key: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  roomId: Scalars['ID'];
  timeStamp?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  writer?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark?: Maybe<Bookmark>;
  createChurch?: Maybe<Church>;
  createCode?: Maybe<Code>;
  createContemplation?: Maybe<Contemplation>;
  createGeneralRoom?: Maybe<RoomInfo>;
  createProfile?: Maybe<Profile>;
  deleteBookmark?: Maybe<Bookmark>;
  deleteComment?: Maybe<Scalars['Boolean']>;
  deleteContemplation?: Maybe<Scalars['Boolean']>;
  deleteRecomment?: Maybe<Scalars['Boolean']>;
  exitRoom?: Maybe<Array<Maybe<RoomInfo>>>;
  likeComment?: Maybe<Comment>;
  likeContemplation?: Maybe<Contemplation>;
  likeRecomment?: Maybe<Recomment>;
  sendMessage?: Maybe<Message>;
  updateChurch?: Maybe<Church>;
  updateContemplation?: Maybe<Contemplation>;
  updateProfile?: Maybe<Profile>;
  updateRoomSetting?: Maybe<RoomInfo>;
  verifyCode?: Maybe<Profile>;
  writeComment?: Maybe<Comment>;
  writeRecomment?: Maybe<Recomment>;
};


export type MutationCreateBookmarkArgs = {
  input?: Maybe<CreateBookmarkInput>;
};


export type MutationCreateChurchArgs = {
  input?: Maybe<CreateChurchInput>;
};


export type MutationCreateCodeArgs = {
  input?: Maybe<CreateCodeInput>;
};


export type MutationCreateContemplationArgs = {
  input?: Maybe<CreateContemplationInput>;
};


export type MutationCreateGeneralRoomArgs = {
  input?: Maybe<CreateRoomInput>;
};


export type MutationCreateProfileArgs = {
  input?: Maybe<CreateUserIput>;
};


export type MutationDeleteBookmarkArgs = {
  input?: Maybe<DeleteBookmarkInput>;
};


export type MutationDeleteCommentArgs = {
  input?: Maybe<DeleteCommentInput>;
};


export type MutationDeleteContemplationArgs = {
  input?: Maybe<DeleteContemplationInput>;
};


export type MutationDeleteRecommentArgs = {
  input?: Maybe<DeleteRecommentInput>;
};


export type MutationExitRoomArgs = {
  input?: Maybe<ExitRoomInput>;
};


export type MutationLikeCommentArgs = {
  input?: Maybe<LikeCommentInput>;
};


export type MutationLikeContemplationArgs = {
  input?: Maybe<LikeContemplationInput>;
};


export type MutationLikeRecommentArgs = {
  input?: Maybe<LikeRecommentInput>;
};


export type MutationSendMessageArgs = {
  input?: Maybe<SendMessageInput>;
  roomId: Scalars['ID'];
};


export type MutationUpdateChurchArgs = {
  input?: Maybe<UpdateChurchInput>;
};


export type MutationUpdateContemplationArgs = {
  input?: Maybe<UpdateContemplationInput>;
};


export type MutationUpdateProfileArgs = {
  input?: Maybe<UpdateUserInfo>;
};


export type MutationUpdateRoomSettingArgs = {
  input?: Maybe<UpdateRoomSettingInput>;
};


export type MutationVerifyCodeArgs = {
  input?: Maybe<VerifyCodeInput>;
};


export type MutationWriteCommentArgs = {
  input?: Maybe<WriteCommentInput>;
};


export type MutationWriteRecommentArgs = {
  input?: Maybe<WriteRecommentInput>;
};

export type OnboardingStep = {
  __typename?: 'OnboardingStep';
  step?: Maybe<Scalars['String']>;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  isLast?: Maybe<Scalars['Boolean']>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Profile = {
  __typename?: 'Profile';
  PK?: Maybe<Scalars['String']>;
  birthDay?: Maybe<Scalars['String']>;
  church: Scalars['String'];
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getBibleByChapter?: Maybe<Array<Maybe<Bible>>>;
  getBibleByVerse?: Maybe<Bible>;
  getBibleByVerseList?: Maybe<Array<Maybe<Bible>>>;
  getChurch?: Maybe<Church>;
  getChurchUsers?: Maybe<Array<Maybe<Profile>>>;
  getContemplation?: Maybe<Contemplation>;
  getContemplationAll?: Maybe<Array<Maybe<Contemplation>>>;
  getContemplations?: Maybe<Array<Maybe<Contemplation>>>;
  getMyBookmarkByChapter?: Maybe<Bookmark>;
  getMyBookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  getMyChatRoomInfo?: Maybe<RoomInfo>;
  getMyChatRooms?: Maybe<Array<Maybe<RoomInfo>>>;
  getMyContemplations?: Maybe<Array<Maybe<Contemplation>>>;
  getOnboardingStep?: Maybe<OnboardingStep>;
  getProfile?: Maybe<Profile>;
  getRecentMessage?: Maybe<Message>;
  getRoomMessages?: Maybe<PaginatedMessages>;
  getUserChurch?: Maybe<UserChurch>;
};


export type QueryGetBibleByChapterArgs = {
  input: GetBibleByChapterInput;
};


export type QueryGetBibleByVerseArgs = {
  input: GetBibleByVerseInput;
};


export type QueryGetBibleByVerseListArgs = {
  input: GetBibleByVerseListInput;
};


export type QueryGetChurchArgs = {
  chuchId: Scalars['ID'];
};


export type QueryGetContemplationArgs = {
  input?: Maybe<GetContemplationInput>;
};


export type QueryGetContemplationsArgs = {
  input?: Maybe<GetContemplationsInput>;
};


export type QueryGetMyBookmarkByChapterArgs = {
  input?: Maybe<GetMyBookmarkByChapterInput>;
};


export type QueryGetMyChatRoomInfoArgs = {
  input?: Maybe<GetMyChatRoomInfoInput>;
};


export type QueryGetRecentMessageArgs = {
  input?: Maybe<GetRecentMessageInput>;
};


export type QueryGetRoomMessagesArgs = {
  input?: Maybe<GetRoomMessagesInput>;
};

export type Recomment = {
  __typename?: 'Recomment';
  likers?: Maybe<Array<Maybe<Scalars['String']>>>;
  replyProfile?: Maybe<Profile>;
  text?: Maybe<Scalars['String']>;
  timeStamp?: Maybe<Scalars['String']>;
  writer?: Maybe<Profile>;
};

export type RoomInfo = {
  __typename?: 'RoomInfo';
  photo?: Maybe<Scalars['String']>;
  recentMessage?: Maybe<Message>;
  roomId: Scalars['ID'];
  roomName?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  unReadCount?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<Profile>>>;
};

export type SendMessageInput = {
  message?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  sentMessage?: Maybe<Message>;
};


export type SubscriptionSentMessageArgs = {
  roomId: Scalars['ID'];
};

export type UpdateChurchInput = {
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdateContemplationInput = {
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type UpdateRoomSettingInput = {
  photoUri?: Maybe<Scalars['String']>;
  roomId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type UpdateUserInfo = {
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
};

export type UserChurch = {
  __typename?: 'UserChurch';
  name?: Maybe<Scalars['String']>;
};

export type VerifyCodeInput = {
  verifyNumber?: Maybe<Scalars['Int']>;
};

export type WriteCommentInput = {
  contemplationID: Scalars['ID'];
  text: Scalars['String'];
};

export type WriteRecommentInput = {
  commentID: Scalars['ID'];
  target: Scalars['String'];
  text: Scalars['String'];
};
