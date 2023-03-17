const Getter = {
  loginStatus: (store: any): boolean => {
    return JSON.stringify(store.app.userInfo) !== "{}";
  },
  userInfo: (store: any): object => {
    return {
      ...store.app.userInfo.account,
      title: store.app.userInfo.profile.avatarUrl,
      backgroundUrl: store.app.userInfo.profile.backgroundUrl,
      name: store.app.userInfo.profile.nickname,
      uid: store.app.userInfo.profile.userId,
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
