import cute from "../components/icon/cute.png";
import story from "../components/icon/story.png";
import witty from "../components/icon/witty.png";
import detail from "../components/icon/detail.png";
import simple from "../components/icon/simple.png";
import kitsch from "../components/icon/kitsch.png";
import sense from "../components/icon/sense.png";
import deco from "../components/icon/deco.png";
import cute_selected from "../components/icon/cute_selected.png";
import story_selected from "../components/icon/story_selected.png";
import witty_selected from "../components/icon/witty_selected.png";
import detail_selected from "../components/icon/detail_selected.png";
import simple_selected from "../components/icon/simple_selected.png";
import kitsch_selected from "../components/icon/kitsch_selected.png";
import sense_selected from "../components/icon/sense_selected.png";
import deco_selected from "../components/icon/deco_selected.png";

export const TYPE_OF_SNS = [
  { case: "인스타그램", text: "https://www.instagram.com/" },
  { case: "페이스북", text: "https://www.facebook.com/" },
  { case: "트위터", text: "https://twitter.com/" },
  { case: "네이버 블로그", text: "https://blog.naver.com/" },
  { case: "유튜브", text: "https://www.youtube.com/" },
  { case: "카카오스토리", text: "https://story.kakao.com/" },
  { case: "기타", text: "" },
];

export const CATEGORY_SET = [
  { key: "cute", desc: "귀여운", icon: cute, selected: cute_selected },
  { key: "story", desc: "스토리", icon: story, selected: story_selected },
  { key: "witty", desc: "재미", icon: witty, selected: witty_selected },
  { key: "detail", desc: "섬세한", icon: detail, selected: detail_selected },
  { key: "simple", desc: "심플", icon: simple, selected: simple_selected },
  { key: "kitsch", desc: "키치", icon: kitsch, selected: kitsch_selected },
  { key: "sense", desc: "감성", icon: sense, selected: sense_selected },
  { key: "deco", desc: "데코", icon: deco, selected: deco_selected },
];

export const BANK_LIST = [
  "BNK경남은행",
  "BNK부산은행",
  "IBK기업은행",
  "KB국민은행",
  "KEB하나은행",
  "NH농협은행",
  "SC제일은행",
  "대구은행",
  "신한은행",
  "산업은행",
  "수협은행",
  "시티은행",
  "우리은행",
  "전북은행",
  "카카오뱅크",
  "케이뱅크",
  "제주은행",
  "우체국",
  "광주은행",
  "새마을금고",
];

/**
 * Initial Data
 */

export const INITIAL_PROFILE = {
  user: {
    authFrom: "",
    state: 0,
    gender: "",
    sns: { type: 0, id: "" },
    joinDate: 0,
    email: "",
    editDate: 0,
    level: 0,
    name: "",
    cashReceipt: { no: "", useYN: false, isPersonal: false },
    phone: "",
    birthyear: "",
    profileImage: "",
    account: { no: "", name: "", type: "" },
    delivery: {
      addr: "",
      name: "",
      tel: "",
      addr2: "",
      msg: "",
      zip: "",
    },
  },
  cards: [],
  seller: {
    info: { profile: "", name: "", phone: "" },
    subscribe: 0,
    joinDate: 0,
    inquiry: { tel: "", time: "" },
    sns: [{ type: "", url: "" }],
    editDate: 0,
    publicId: "",
    category: [],
    bank: { no: "", name: "", type: "" },
    msg: "",
    state: 0,
    business: {
      tel: "",
      addr: "",
      regNo: "",
      mailOrderNo: "",
      email: "",
      ceo: "",
      name: "",
      terms: "d",
    },
    openedmarketList: [],
  },
};
