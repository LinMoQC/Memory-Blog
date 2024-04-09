import {SocialType} from "./SocialType";

export default interface UserState{
    token: string | null;
    avatar: string;
    talk: string;
    name: string;
    social: SocialType | null;
    blogTitle: string;
    blogIcp: string;
}