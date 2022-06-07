export type apiAnnounceResultType = {
  return_count: Number; // unused
  announce: AnnounceType[];
};

export type AnnounceType = {
  id: string;
  title: string;
  date: string;

  poster: {
    name: string;
    avatar?: string;
  };

  content: string;
};
