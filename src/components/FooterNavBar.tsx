import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { HomeIcon, ChatIcon, WriteIcon, MyPageIcon } from "../assets/icons";
import { UserInfoApi } from "../APIs/UserInfoApi";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginInfoState } from "../store/loginInfoState";
import { LoginInfoType } from "../types/loginInfoType";
import { getCookieToken } from "../config/cookies";

export const FooterNavBar = () => {
  const { data: userinfo, isSuccess } = UserInfoApi.getUserInfo();
  const setLoginInfo = useSetRecoilState<LoginInfoType>(loginInfoState);
  const usertoken = getCookieToken();

  useEffect(() => {
    if (usertoken && isSuccess) {
      setLoginInfo(userinfo);
    }
  }, [isSuccess]);

  const { pathname } = useLocation();
  return (
    <footer className="flex justify-center items-center gap-x-16 h-[3.75rem] w-full left-0 bottom-0 z-10 shadow-[4px_0_30_1px_rgba(194,194,194,0.5)] bg-bgWhite">
      <Link to="/mypage">
        <MyPageIcon
          className={classNames("fill-black", {
            "fill-brandBlue": pathname === "/mypage",
          })}
        />
      </Link>
      <Link to="/">
        <HomeIcon
          className={classNames("fill-black", {
            "fill-brandBlue": pathname === "/",
          })}
        />
      </Link>
      <Link to="/chats">
        <ChatIcon
          className={classNames("fill-black", {
            "fill-brandBlue": pathname === "/chats",
          })}
        />
      </Link>
      <Link to="/addposts">
        <WriteIcon
          className={classNames("fill-black", {
            "fill-brandBlue": pathname === "/addposts",
          })}
        />
      </Link>
    </footer>
  );
};
