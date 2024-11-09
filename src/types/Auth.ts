export type SignRequestType = {
  email: string;
  password: string;
};

export type ProfileType = {
  email: string;
  accessToken: string;
  team: number;
  challengeId: number;
  nickName: string;
  level: number;
  challengeCount: number;
  miniGameCount: number;
};
