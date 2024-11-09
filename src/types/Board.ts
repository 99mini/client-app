export type BoardType = {
  id: number;
  title: string;
  nickName: string;
  writingText: string;
  image: string;
  district: string;
  bigCategory: string;
  challengeId: number;
};

export type BoardCommentType = {
  id: number;
  boardId: number;
  comment: string;
  nickName: string;
};
