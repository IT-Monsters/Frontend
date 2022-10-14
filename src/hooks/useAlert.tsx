import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Stomp from "stompjs";
import { UserInfoApi } from "../APIs/UserInfoApi";
import { getCookieToken } from "../config/cookies";
import { alertState, onAlertState } from "../store/alertState";

export const useAlert = ({ client }: { client: Stomp.Client }) => {
  const usertoken = {
    Authorization: getCookieToken(),
  };

  const { data, isSuccess } = UserInfoApi.getUserInfo();

  const id = data?.id;

  const [tgVal, tg] = useRecoilState(onAlertState);

  const setAlertContent = useSetRecoilState(alertState);

  useEffect(() => {
    if (isSuccess && id !== undefined) {
      alertConnect();
    }

    return () => {
      alertDisconnect();
    };
  }, [isSuccess]);

  // 채팅 연결
  const alertConnect = () => {
    if (client.connected && id !== undefined) {
      alertSub();
    } else {
      client.connect(usertoken, () => {
        if (id !== undefined) {
          alertSub();
        }
      });
    }
  };

  const alertSub = useCallback(() => {
    client.subscribe(
      `/sub/members/${id}`,
      data => {
        const newAlert = JSON.parse(data.body);
        setAlertContent(newAlert.content);
        tg(!tgVal);
      },
      { id: `alert-${id}` },
    );
  }, [id]);

  const alertDisconnect = () => {
    if (client !== null) {
      if (client.connected) client.unsubscribe(`${id}`);
    }
  };
};
