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

export type Contemplation = {
  __typename?: 'Contemplation';
  content: Scalars['String'];
  date: Scalars['String'];
  range?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type CreateContemplationInput = {
  content: Scalars['String'];
  range: Scalars['String'];
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateUserIput = {
  birthDay?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
};

export type DeleteBookmarkInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
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
  chapter: Scalars['Int'];
  title: Scalars['String'];
  verse: Array<Maybe<Scalars['Int']>>;
};

export type GetMyBookmarkByChapterInput = {
  chapter: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark?: Maybe<Bookmark>;
  createChurch?: Maybe<Church>;
  createContemplation?: Maybe<Contemplation>;
  createProfile?: Maybe<Profile>;
  deleteBookmark?: Maybe<Bookmark>;
  updateChurch?: Maybe<Church>;
  updateProfile?: Maybe<Profile>;
};


export type MutationCreateBookmarkArgs = {
  input?: Maybe<CreateBookmarkInput>;
};


export type MutationCreateChurchArgs = {
  input?: Maybe<CreateChurchInput>;
};


export type MutationCreateContemplationArgs = {
  input?: Maybe<CreateContemplationInput>;
};


export type MutationCreateProfileArgs = {
  input?: Maybe<CreateUserIput>;
};


export type MutationDeleteBookmarkArgs = {
  input?: Maybe<DeleteBookmarkInput>;
};


export type MutationUpdateChurchArgs = {
  input?: Maybe<UpdateChurchInput>;
};


export type MutationUpdateProfileArgs = {
  input?: Maybe<UpdateUserInfo>;
};

export type OnboardingStep = {
  __typename?: 'OnboardingStep';
  step?: Maybe<OnboardingStepType>;
};

export enum OnboardingStepType {
  End = 'end',
  Onboarding = 'onboarding'
}

export type Profile = {
  __typename?: 'Profile';
  birthDay?: Maybe<Scalars['String']>;
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
  getContemplationAll?: Maybe<Array<Maybe<Contemplation>>>;
  getMyBookmarkByChapter?: Maybe<Bookmark>;
  getMyBookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  getOnboardingStep?: Maybe<OnboardingStep>;
  getProfile?: Maybe<Profile>;
  getUserChurch?: Maybe<UserChurch>;
};


export type QueryGetBibleByChapterArgs = {
  input: GetBibleByChapterInput;
};


export type QueryGetBibleByVerseArgs = {
  input: GetBibleByVerseInput;
};


export type QueryGetBibleByVerseListArgs = {
  input: GetBibleByVerseInput;
};


export type QueryGetChurchArgs = {
  chuchId: Scalars['ID'];
};


export type QueryGetMyBookmarkByChapterArgs = {
  input?: Maybe<GetMyBookmarkByChapterInput>;
};

export enum Range {
  Public = 'public'
}

export type UpdateChurchInput = {
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
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
