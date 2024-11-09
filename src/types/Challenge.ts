export type ChallengeType = {
  id: 0;
  district: string;
  bigCategory: string;
  text: string;
  attraction: string;
  address: string;
  smallCategory: string;
};

export type DetailChallengeType = {
  imageURL: string;
  text: string;
  mission: string;
  attractions: Omit<ChallengeType, 'text'>[];
};

export type MissionType = {
  email: string;
  team: number;
  challengeId: number;
  mission: string;
};
