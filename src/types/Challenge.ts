export type ChallengeType = {
  id: 0;
  district: 'string';
  attraction: 'string';
  address: 'string';
  bigCategory: 'string';
  smallCategory: 'string';
};

export type DetailChallengeType = {} & ChallengeType;
