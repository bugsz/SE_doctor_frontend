export type CurrentUser = {
  name: string;
  avatar: string;
  userid: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
};

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
