declare module SongInfo {
    /**
     * fee: enum,
      0: 免费或无版权
      1: VIP 歌曲
      4: 购买专辑
      8: 非会员可免费播放低音质，会员可播放高音质及下载
      fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
     */

    export enum fee {

    }
    //     originCoverType: enum
    //   0: 未知
    //   1: 原曲
    //   2: 翻唱

    export interface Ar {
        id: number;
        name: string;
        tns: any[];
        alias: any[];
    }

    export interface Al {
        id: number;
        name: string;
        picUrl: string;
        tns: any[];
        pic_str: string;
        pic: number;
    }

    export interface H {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
    }

    export interface M {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
    }

    export interface L {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
    }

    export interface Sq {
        br: number;
        fid: number;
        size: number;
        vd: number;
        sr: number;
    }

    export interface Song {
        name: string;
        id: number;
        pst: number;
        t: number;
        ar: Ar[];
        alia: any[];
        pop: number;
        st: number;
        rt: string;
        fee: number;
        v: number;
        crbt?: any;
        cf: string;
        al: Al;
        dt: number;
        h: H;
        m: M;
        l: L;
        sq: Sq;
        hr?: any;
        a?: any;
        cd: string;
        no: number;
        rtUrl?: any;
        ftype: number;
        rtUrls: any[];
        djId: number;
        copyright: number;
        s_id: number;
        mark: number;
        originCoverType: number;
        originSongSimpleData?: any;
        tagPicList?: any;
        resourceState: boolean;
        version: number;
        songJumpInfo?: any;
        entertainmentTags?: any;
        single: number;
        noCopyrightRcmd?: any;
        rtype: number;
        rurl?: any;
        mst: number;
        cp: number;
        mv: number;
        publishTime: number;
        tns: string[];
    }

    export interface FreeTrialPrivilege {
        resConsumable: boolean;
        userConsumable: boolean;
        listenType?: any;
    }

    export interface ChargeInfoList {
        rate: number;
        chargeUrl?: any;
        chargeMessage?: any;
        chargeType: number;
    }

    export interface Privilege {
        id: number;
        fee: number;
        payed: number;
        st: number;
        pl: number;
        dl: number;
        sp: number;
        cp: number;
        subp: number;
        cs: boolean;
        maxbr: number;
        fl: number;
        toast: boolean;
        flag: number;
        preSell: boolean;
        playMaxbr: number;
        downloadMaxbr: number;
        maxBrLevel: string;
        playMaxBrLevel: string;
        downloadMaxBrLevel: string;
        plLevel: string;
        dlLevel: string;
        flLevel: string;
        rscl?: any;
        freeTrialPrivilege: FreeTrialPrivilege;
        chargeInfoList: ChargeInfoList[];
    }

    export interface RootObject {
        songs: Song[];
        privileges: Privilege[];
        code: number;
    }
}




export default SongInfo

