export const schema = `type HomeInfo {
  userCount: Int
  churchCount: Int
  waitingChurch: Int
}

input WatingChurchesInput {
  limit: Int
  offset: Int
}

type Query {
  homeInfo: HomeInfo
  waitingChurches(input: WatingChurchesInput): [Church]
  getBibleByChapter(input: GetBibleByChapterInput!): [Bible]
  getBibleByVerse(input: GetBibleByVerseInput!): Bible
  getBibleByVerseList(input: GetBibleByVerseListInput!): [Bible]
  getMyBookmarks: [Bookmark]
  getMyBookmarkByChapter(input: GetMyBookmarkByChapterInput): Bookmark
  getMyChatRooms: [RoomInfo]
  getMyChatRoomInfo(input: GetMyChatRoomInfoInput): RoomInfo
  getRoomMessages(input: GetRoomMessagesInput): PaginatedMessages
  getRecentMessage(input: GetRecentMessageInput): Message
  getChurch(chuchId: ID!): Church
  communities: [Community]
  community: Community
  boards: [Board]
  homeBoards: [Board]
  board(input: GetBoardInput): Board
  posts: [Post]
  post: [Post]
  contemplations(input: GetContemplationsInput): [Contemplation]
  contemplation(input: GetContemplationInput): Contemplation
  myContemplations: [Contemplation]
  contemplationComments(input: ContemplationCommentsInput): [Comment]
  getProfile: Profile
  getChurchUsers: [Profile]
  getUserChurch: UserChurch
  getOnboardingStep: OnboardingStep
  getCode: Code
}

type Bible {
  PK: ID!
  SK: ID!
  title: String!
  chapter: Int!
  verse: Int!
  isLast: Boolean
  text: String!
}

type Bookmark {
  id: String
  title: String
  chapter: Int
  date: String
}

input GetBibleByChapterInput {
  title: String!
  chapter: Int!
}

input GetBibleByVerseInput {
  title: String!
  chapter: Int!
  verse: Int!
}

input GetBibleByVerseListInput {
  keys: [String]
}

input CreateBookmarkInput {
  title: String!
  chapter: Int!
}

input DeleteBookmarkInput {
  id: ID!
}

input GetMyBookmarkByChapterInput {
  title: String!
  chapter: Int!
}

type Mutation {
  createBookmark(input: CreateBookmarkInput): Bookmark
  deleteBookmark(input: DeleteBookmarkInput): Bookmark
  createGeneralRoom(input: CreateRoomInput): RoomInfo
  sendMessage(roomId: ID!, input: SendMessageInput): Message
  updateRoomSetting(input: UpdateRoomSettingInput): RoomInfo
  exitRoom(input: ExitRoomInput): Boolean
  createChurch(input: CreateChurchInput): Church
  updateChurch(input: UpdateChurchInput): Church
  confirmChurch(input: ConfirmChurchInput): Church
  createCommunity(input: CreateCommunityInput): Community
  updateCommunityUsers(input: UpdateCommunityUsersInput): Community
  updateCommunityInfo(input: UpdateCommunityInfoInput): Community
  createBoard(input: CreateBoardInput): Board
  createHomeBoard(input: CreateHomeBoardInput): Board
  createPost(input: CreatePostInput): Post
  updateBoardsOrder(input: UpdateBoardsOrderInput): [Board]
  deleteBoard(input: DeleteBoardInput): Board
  updateBoard(input: UpdateBoardInput): Board
  createContemplation(input: CreateContemplationInput): Contemplation
  likeContemplation(input: LikeContemplationInput): [String]
  deleteContemplation(input: DeleteContemplationInput): Contemplation
  updateContemplation(input: UpdateContemplationInput): Contemplation
  writeComment(input: WriteCommentInput): Comment
  likeComment(input: LikeCommentInput): [String]
  deleteComment(input: DeleteCommentInput): Boolean
  writeRecomment(input: WriteRecommentInput): Comment
  updateContemplationViewer(input: UpdateContemplationViewerInput): Int
  updateFcmToken(input: UpdateFcmTokenInput): Profile
  createProfile(input: CreateUserIput): Profile
  updateProfile(input: UpdateUserInfo): Profile
  verifyCode(input: VerifyCodeInput): Profile
  createCode: Code
  resignUser(input: ResignUserInput): Profile
}

type RoomInfo {
  roomId: ID!
  users: [Profile]
  roomName: String
  roomType: String
  recentMessage: Message
  unReadCount: Int
  photo: String
}

type Message {
  roomId: ID!
  key: ID!
  message: String
  photo: String
  timeStamp: String
  writer: String
  type: String
}

type PaginatedMessages {
  messages: [Message]
  isLast: Boolean
}

input CreateRoomInput {
  users: [String]
  name: String
  photoUri: String
}

input SendMessageInput {
  message: String
  photo: String
}

input GetRecentMessageInput {
  roomId: String!
}

input GetRoomMessagesInput {
  roomId: String!
  key: String
  limit: Int
}

input UpdateRoomSettingInput {
  roomId: String!
  title: String
  photoUri: String
}

input GetMyChatRoomInfoInput {
  roomId: String!
}

input ExitRoomInput {
  roomId: String!
}

type Subscription {
  sentMessage(roomId: ID!): Message @aws_subscribe(mutations: ["sendMessage"])
}

type Church {
  id: String
  name: String!
  description: String
  address: String!
  phoneNumber: String!
  photo: String
  type: String
}

input CreateChurchInput {
  name: String!
  description: String
  address: String!
  phoneNumber: String!
  photo: String
  type: String
}

input UpdateChurchInput {
  name: String!
  description: String
  address: String!
  phoneNumber: String!
  photo: String
  type: String
}

input ConfirmChurchInput {
  id: ID!
}

enum BoardPresetType {
  list
  card
  weeklyInfo
}

enum CommunityType {
  home
  community
}

type Community {
  id: String
  name: String
  photo: String
  createdAt: String
  boards: [Board]
  admins: [Profile]
  users: [Profile]
  church: Church
}

type Board {
  id: String
  name: String
  boardPreset: BoardPresetType
  authority: LevelType
  posts: [Post]
}

input PostsQueryInput {
  limit: Int!
  cursor: String
}

input CreateCommunityInput {
  name: String
  photo: String
  communityType: CommunityType
}

input UpdateCommunityUsersInput {
  users: [String]
}

input UpdateCommunityInfoInput {
  name: String
  photo: String
}

input UpdateBoardsOrderInput {
  boards: [String]
}

input CreateBoardInput {
  communityId: String
  name: String!
  boardPresetType: BoardPresetType!
  authority: LevelType
}

input CreateHomeBoardInput {
  name: String!
  boardPresetType: BoardPresetType!
  authority: LevelType
}

input CreatePostInput {
  boardId: String
  title: String
  content: String
  photos: [String]
}

input GetBoardInput {
  boardId: String
}

input DeleteBoardInput {
  boardId: String
  name: String
  boardPreset: BoardPresetType
}

input UpdateBoardInput {
  boardId: String
  name: String
  boardPresetType: BoardPresetType
  authority: LevelType
}

type Post {
  id: String
  title: String
  content: String
  createdAt: String
  comment: [Comment]
  photos: [String]
  writer: Profile
}

enum LikeType {
  board
  contemplation
  comment
}

enum RangeType {
  public
  private
}

type Contemplation {
  id: ID!
  references: [String]
  content: String
  range: RangeType
  writer: Profile
  likers: [String]
  viewerCount: Int
  commentCount: Int
  comments: [Comment]
  timeStamp: String
}

type Comment {
  id: ID!
  writer: Profile
  text: String
  likers: [String]
  recomments: [Comment]
  timeStamp: String
}

input CreateContemplationInput {
  references: [String]
  content: String!
  range: RangeType!
}

input GetContemplationsInput {
  key: String
  limit: Int
}

input GetContemplationInput {
  id: ID!
}

input LikeContemplationInput {
  id: ID!
}

input DeleteContemplationInput {
  id: ID!
}

input UpdateContemplationInput {
  id: ID!
  text: String
}

input WriteCommentInput {
  contemplationID: ID!
  text: String!
}

input WriteRecommentInput {
  commentId: ID!
  text: String!
}

input LikeCommentInput {
  id: ID!
}

input DeleteCommentInput {
  id: ID!
}

input DeleteLikeInput {
  id: ID!
}

input ContemplationCommentsInput {
  id: ID!
}

input UpdateContemplationViewerInput {
  id: ID!
}

enum LevelType {
  user
  admin
}

enum OnboardingStep {
  first
  second
  watingConfirm
  done
}

type Profile {
  id: String
  name: String
  phoneNumber: String
  photo: String
  birthDay: String
  position: String
  church: Church
  level: String
  fcmToken: String
}

type UserChurch {
  name: String
}

type Code {
  id: ID
  verifyNumber: String
  createdAt: String
  expiredAt: String
}

input CreateUserIput {
  name: String
  phoneNumber: String
  birthDay: String
  photo: String
  position: String
  church: String
}

input UpdateUserInfo {
  name: String
  phoneNumber: String
  photo: String
  position: String
}

input GetProfilesInput {
  users: [String]
}

input VerifyCodeInput {
  verifyNumber: String
}

input UpdateFcmTokenInput {
  token: String
}

input ResignUserInput {
  userId: String
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`