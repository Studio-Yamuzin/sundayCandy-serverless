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

export type Board = {
  __typename?: 'Board';
  boardPreset?: Maybe<BoardPresetType>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type BoardPresetType =
  | 'card'
  | 'list'
  | 'weeklyInfo';

export type Bookmark = {
  __typename?: 'Bookmark';
  chapter?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Church = {
  __typename?: 'Church';
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Code = {
  __typename?: 'Code';
  createdAt?: Maybe<Scalars['String']>;
  expiredAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  verifyNumber?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  likers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recomments?: Maybe<Array<Maybe<Comment>>>;
  text?: Maybe<Scalars['String']>;
  timeStamp?: Maybe<Scalars['String']>;
  writer?: Maybe<Profile>;
};

export type Community = {
  __typename?: 'Community';
  admins?: Maybe<Array<Maybe<Profile>>>;
  boards?: Maybe<Array<Maybe<Board>>>;
  church?: Maybe<Church>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Profile>>>;
};

export type CommunityType =
  | 'community'
  | 'home';

export type ConfirmChurchInput = {
  id: Scalars['ID'];
};

export type Contemplation = {
  __typename?: 'Contemplation';
  commentCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  likers?: Maybe<Array<Maybe<Scalars['String']>>>;
  range?: Maybe<RangeType>;
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
  timeStamp?: Maybe<Scalars['String']>;
  viewerCount?: Maybe<Scalars['Int']>;
  writer?: Maybe<Profile>;
};

export type ContemplationCommentsInput = {
  id: Scalars['ID'];
};

export type CreateBoardInput = {
  authority?: Maybe<LevelType>;
  boardPresetType: BoardPresetType;
  communityId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
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

export type CreateCommunityInput = {
  communityType?: Maybe<CommunityType>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export type CreateContemplationInput = {
  content: Scalars['String'];
  range: RangeType;
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateHomeBoardInput = {
  authority?: Maybe<LevelType>;
  boardPresetType: BoardPresetType;
  name: Scalars['String'];
};

export type CreatePostInput = {
  boardId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
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
  id: Scalars['ID'];
};

export type DeleteCommentInput = {
  id: Scalars['ID'];
};

export type DeleteContemplationInput = {
  id: Scalars['ID'];
};

export type DeleteLikeInput = {
  id: Scalars['ID'];
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

export type HomeInfo = {
  __typename?: 'HomeInfo';
  churchCount?: Maybe<Scalars['Int']>;
  userCount?: Maybe<Scalars['Int']>;
  waitingChurch?: Maybe<Scalars['Int']>;
};

export type LevelType =
  | 'admin'
  | 'user';

export type LikeCommentInput = {
  id: Scalars['ID'];
};

export type LikeContemplationInput = {
  id: Scalars['ID'];
};

export type LikeType =
  | 'board'
  | 'comment'
  | 'contemplation';

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
  confirmChurch?: Maybe<Church>;
  createBoard?: Maybe<Board>;
  createBookmark?: Maybe<Bookmark>;
  createChurch?: Maybe<Church>;
  createCode?: Maybe<Code>;
  createCommunity?: Maybe<Community>;
  createContemplation?: Maybe<Contemplation>;
  createGeneralRoom?: Maybe<RoomInfo>;
  createHomeBoard?: Maybe<Board>;
  createPost?: Maybe<Post>;
  createProfile?: Maybe<Profile>;
  deleteBookmark?: Maybe<Bookmark>;
  deleteComment?: Maybe<Scalars['Boolean']>;
  deleteContemplation?: Maybe<Contemplation>;
  exitRoom?: Maybe<Scalars['Boolean']>;
  likeComment?: Maybe<Array<Maybe<Scalars['String']>>>;
  likeContemplation?: Maybe<Array<Maybe<Scalars['String']>>>;
  sendMessage?: Maybe<Message>;
  updateBoardsOrder?: Maybe<Array<Maybe<Board>>>;
  updateChurch?: Maybe<Church>;
  updateCommunityInfo?: Maybe<Community>;
  updateCommunityUsers?: Maybe<Community>;
  updateContemplation?: Maybe<Contemplation>;
  updateContemplationViewer?: Maybe<Scalars['Int']>;
  updateFcmToken?: Maybe<Profile>;
  updateProfile?: Maybe<Profile>;
  updateRoomSetting?: Maybe<RoomInfo>;
  verifyCode?: Maybe<Profile>;
  writeComment?: Maybe<Comment>;
  writeRecomment?: Maybe<Comment>;
};


export type MutationConfirmChurchArgs = {
  input?: Maybe<ConfirmChurchInput>;
};


export type MutationCreateBoardArgs = {
  input?: Maybe<CreateBoardInput>;
};


export type MutationCreateBookmarkArgs = {
  input?: Maybe<CreateBookmarkInput>;
};


export type MutationCreateChurchArgs = {
  input?: Maybe<CreateChurchInput>;
};


export type MutationCreateCommunityArgs = {
  input?: Maybe<CreateCommunityInput>;
};


export type MutationCreateContemplationArgs = {
  input?: Maybe<CreateContemplationInput>;
};


export type MutationCreateGeneralRoomArgs = {
  input?: Maybe<CreateRoomInput>;
};


export type MutationCreateHomeBoardArgs = {
  input?: Maybe<CreateHomeBoardInput>;
};


export type MutationCreatePostArgs = {
  input?: Maybe<CreatePostInput>;
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


export type MutationExitRoomArgs = {
  input?: Maybe<ExitRoomInput>;
};


export type MutationLikeCommentArgs = {
  input?: Maybe<LikeCommentInput>;
};


export type MutationLikeContemplationArgs = {
  input?: Maybe<LikeContemplationInput>;
};


export type MutationSendMessageArgs = {
  input?: Maybe<SendMessageInput>;
  roomId: Scalars['ID'];
};


export type MutationUpdateBoardsOrderArgs = {
  input?: Maybe<UpdateBoardsOrderInput>;
};


export type MutationUpdateChurchArgs = {
  input?: Maybe<UpdateChurchInput>;
};


export type MutationUpdateCommunityInfoArgs = {
  input?: Maybe<UpdateCommunityInfoInput>;
};


export type MutationUpdateCommunityUsersArgs = {
  input?: Maybe<UpdateCommunityUsersInput>;
};


export type MutationUpdateContemplationArgs = {
  input?: Maybe<UpdateContemplationInput>;
};


export type MutationUpdateContemplationViewerArgs = {
  input?: Maybe<UpdateContemplationViewerInput>;
};


export type MutationUpdateFcmTokenArgs = {
  input?: Maybe<UpdateFcmTokenInput>;
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

export type OnboardingStep =
  | 'done'
  | 'first'
  | 'second'
  | 'watingConfirm';

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  isLast?: Maybe<Scalars['Boolean']>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Post = {
  __typename?: 'Post';
  comment?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  writer?: Maybe<Profile>;
};

export type PostsQueryInput = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  birthDay?: Maybe<Scalars['String']>;
  church?: Maybe<Church>;
  fcmToken?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards?: Maybe<Array<Maybe<Board>>>;
  communities?: Maybe<Array<Maybe<Community>>>;
  community?: Maybe<Community>;
  contemplation?: Maybe<Contemplation>;
  contemplationComments?: Maybe<Array<Maybe<Comment>>>;
  contemplations?: Maybe<Array<Maybe<Contemplation>>>;
  getBibleByChapter?: Maybe<Array<Maybe<Bible>>>;
  getBibleByVerse?: Maybe<Bible>;
  getBibleByVerseList?: Maybe<Array<Maybe<Bible>>>;
  getChurch?: Maybe<Church>;
  getChurchUsers?: Maybe<Array<Maybe<Profile>>>;
  getCode?: Maybe<Code>;
  getMyBookmarkByChapter?: Maybe<Bookmark>;
  getMyBookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  getMyChatRoomInfo?: Maybe<RoomInfo>;
  getMyChatRooms?: Maybe<Array<Maybe<RoomInfo>>>;
  getOnboardingStep?: Maybe<OnboardingStep>;
  getProfile?: Maybe<Profile>;
  getRecentMessage?: Maybe<Message>;
  getRoomMessages?: Maybe<PaginatedMessages>;
  getUserChurch?: Maybe<UserChurch>;
  homeBoards?: Maybe<Array<Maybe<Board>>>;
  homeInfo?: Maybe<HomeInfo>;
  myContemplations?: Maybe<Array<Maybe<Contemplation>>>;
  post?: Maybe<Array<Maybe<Post>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  waitingChurches?: Maybe<Array<Maybe<Church>>>;
};


export type QueryContemplationArgs = {
  input?: Maybe<GetContemplationInput>;
};


export type QueryContemplationCommentsArgs = {
  input?: Maybe<ContemplationCommentsInput>;
};


export type QueryContemplationsArgs = {
  input?: Maybe<GetContemplationsInput>;
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


export type QueryWaitingChurchesArgs = {
  input?: Maybe<WatingChurchesInput>;
};

export type RangeType =
  | 'private'
  | 'public';

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

export type UpdateBoardsOrderInput = {
  boards?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateChurchInput = {
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdateCommunityInfoInput = {
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export type UpdateCommunityUsersInput = {
  users?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateContemplationInput = {
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type UpdateContemplationViewerInput = {
  id: Scalars['ID'];
};

export type UpdateFcmTokenInput = {
  token?: Maybe<Scalars['String']>;
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
  verifyNumber?: Maybe<Scalars['String']>;
};

export type WatingChurchesInput = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type WriteCommentInput = {
  contemplationID: Scalars['ID'];
  text: Scalars['String'];
};

export type WriteRecommentInput = {
  commentId: Scalars['ID'];
  text: Scalars['String'];
};
