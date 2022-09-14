/**
 * Data pertaining to a tweet.
 */
export type TweetData = {
  reply_tweet_id: string;
  similarity: number;
  sentiment: string;
  weight: number;
  url: string;
};

/**
 * The edge between two Twitter users.
 */
export type TwitterEdge = {
  id: string;
  to: string;
  from: string;
  to_label: string;
  from_label: string;
  tweets: TweetData[];
  value: number;
};

/**
 * Data pertaining to a Twitter user.
 */
export type TwitterNode = {
  id: string;
  label: string;
  title: string;
  value: number;
};