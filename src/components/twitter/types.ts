export type TweetData = {
  reply_tweet_id: string;
  similarity: number;
  sentiment: string;
  weight: number;
  url: string;
};
  
export type TwitterEdge = {
  id: string;
  to: string;
  from: string;
  to_label: string;
  from_label: string;
  tweets: TweetData[];
  value: number;
};

export type TwitterNode = {
  id: string;
  label: string;
  title: string;
  value: number;
};