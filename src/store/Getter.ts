const Getter = {
  loginStatus: (store: any): boolean => {
    return !!store.app.cookie;
  },
  userInfo: (store: any) => {
    const { userInfo } = store.app;
    const { account, profile } = userInfo;

    return {
      ...account,
      title: profile?.avatarUrl,
      backgroundUrl: profile?.backgroundUrl,
      name: profile?.nickname,
      uid: profile?.userId,
    };
  },

  curPlaySong: (store: any) => {
    return store.song.curPlaySong;
  },
  tagColor: (store: any): string => {
    let i = Math.floor(Math.random() * 14);
    return store?.app?.tagColor?.[i];
  },
};
export default Getter;
