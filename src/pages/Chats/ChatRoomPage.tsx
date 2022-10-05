import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/ko";
import Stomp from "stompjs";
import { chatApi } from "../../APIs/ChatApi";
import { UserInfoApi } from "../../APIs/UserInfoApi";
import { getCookieToken } from "../../config/cookies";
import { chatDataState } from "../../store/chatDataState";
import { chatData } from "../../types/chatType";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRoomMemList } from "./ChatRoomMemList";
import { ExpandIcon, GoBackIcon, SendIcon, Spinner } from "../../assets/icons";
import { useInView } from "react-intersection-observer";

// const fetchPostList = async (pageParam: number) => {
//   const { data } = await instance.post(
//     `/api/channels/83/test?page=${pageParam}&size=20`,
//     {},
//   );
//   const { content, last } = data;
//   return { content, nextPage: pageParam + 1, last };
// };

export const ChatRoomPage = ({ client }: { client: Stomp.Client }) => {
  const textRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [chatdata, setChatData] = useRecoilState<chatData[]>(chatDataState);
  const { id } = useParams();
  const [chatInfosToggle, setChatInfosToggle] = useState(false);
  const channelNum = Number(id);
  const queryClient = useQueryClient();

  const { data: thisChatRoom } = chatApi.getChatRoomInfo(Number(id));

  const { data: userinfo } = UserInfoApi.getUserInfo();

  // const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
  //   useInfiniteQuery<IchatInifite, Error, IchatInifite, [string]>(
  //     ["chatList"],
  //     ({ pageParam = 0 }) => fetchPostList(pageParam),
  //     {
  //       getNextPageParam: lastPage =>
  //         !lastPage.last ? lastPage.nextPage : undefined,
  //     },
  //   );

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    chatApi.getPastMessage(channelNum);

  const usertoken = {
    Authorization: getCookieToken(),
  };

  useEffect(() => {
    if (status === "success") {
      data.pages[data.pages.length - 1].content.map(cd => {
        setChatData(chatdatas => [...chatdatas, cd]);
      });
    }
  }, [data, status]);

  useEffect(() => {
    chatConnect();

    return () => {
      chatDisconnect();
    };
  }, []);

  // 채팅 연결
  const chatConnect = () => {
    if (client.connected) {
      chatSub();
    } else {
      client.connect(usertoken, () => {
        chatSub();
      });
    }
  };
  // 콜백함수를 통해 한번만 렌더링 되게.
  const chatSub = useCallback(() => {
    client.subscribe(
      `/sub/channels/${id}`,
      data => {
        const newMessage = JSON.parse(data.body);
        setChatData(chatdatas => [newMessage, ...chatdatas]);
        if (data) scrollToBottom();
      },
      { id },
    );
  }, []);

  // 채팅 연결해제
  const chatDisconnect = () => {
    if (client !== null) {
      if (client.connected) client.unsubscribe(`${id}`);
    }
  };

  // 채팅보내기
  const enterToSendChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendChat();
      if (e.target === textRef.current) {
        textRef.current.value = "";
      }
    }
  };

  const sendChat = () => {
    if (textRef.current === null || textRef.current.value === "") return;
    client.send(
      `/pub/channels/${id}`,
      usertoken,
      JSON.stringify({ content: textRef.current.value }),
    );
    queryClient.invalidateQueries(["chat", channelNum]);
    textRef.current.value = "";
  };

  // 새글 올라오면 항상밑에서부터
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // 스크롤 해서 이전 채팅 불러오기.
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div
      className="h-screen w-full overflow-y-scroll overflow-x-hidden pb-[4rem]"
      ref={messageBoxRef}
    >
      {/* 채팅방 헤더 */}
      <div
        className="w-full absolute top-0 left-0 right-0 z-40 rounded-b-lg bg-white shadow-md"
        style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="flex justify-between px-6 py-3 ">
          <button onClick={() => navigate(-1)} className="mr-4 text-white">
            <GoBackIcon />
          </button>
          <h1 className="text-2xl truncate font-cookie py-1">
            {thisChatRoom?.channelName}
          </h1>

          <button onClick={() => setChatInfosToggle(!chatInfosToggle)}>
            <ExpandIcon />
          </button>
        </div>
      </div>
      {/* 채팅글들 */}
      <div>
        <div className="flex flex-col-reverse mt-16 pb-10 px-4">
          {status === "loading" ? (
            <Spinner />
          ) : status === "error" ? (
            <p>메세지를 가져오는데 실패했습니다.</p>
          ) : (
            chatdata?.map((cD, idx) =>
              cD.memberId !== userinfo.id ? (
                <div className="pt-3" key={idx}>
                  <div className="flex ">
                    <div
                      className="w-[32px] h-[32px] cursor-pointer"
                      onClick={() => {
                        navigate(`/user/${cD.memberId}`);
                      }}
                    >
                      <img
                        src={cD.profileImg}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div className="ml-4 ">
                      <p className="mb-1 text-sm font-semibold text-gray-800">
                        {cD.nickname}
                      </p>
                      <div className="flex ">
                        <div className="bg-[#4B23B819] px-4 py-2 rounded-lg rounded-tl-none max-w-[200px]">
                          <p className="break-all text-xs">{cD.content}</p>
                        </div>
                        <div className="ml-2 relative">
                          <p className="text-[10px] text-gray-700 w-12 absolute bottom-0">
                            {moment(cD.createdAt).format("LT")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-3 flex justify-end" key={idx}>
                  <div className="relative">
                    <p className="text-[10px] text-gray-700 w-12 absolute bottom-0 right-0">
                      {moment(cD.createdAt).format("LT")}
                    </p>
                  </div>
                  <div className="bg-brandBlue max-w-[200px] px-4 py-2 rounded-lg rounded-tr-none">
                    <p className="text-white text-xs break-all">{cD.content}</p>
                  </div>
                </div>
              ),
            )
          )}
          {/* 여기 수정 필요  */}
          {isFetchingNextPage ? (
            <div
              className="w-full flex justify-center "
              ref={ref}
              onClick={() => fetchNextPage()}
            >
              <Spinner />
            </div>
          ) : hasNextPage ? (
            <div
              className="w-full flex justify-center"
              ref={ref}
              onClick={() => fetchNextPage()}
            ></div>
          ) : null}
        </div>
      </div>

      {/* 채팅입력창 */}
      <div
        className={classNames(
          "w-full absolute bottom-0 left-0 right-0 z-40 bg-white",
        )}
      >
        <div className="flex bg-white my-4 mx-4 rounded-3xl border-[2px] focus-within:border-brandBlue">
          <input
            ref={textRef}
            onKeyUp={enterToSendChat}
            placeholder="채팅을 입력해주세요!"
            className="bg-white rounded-3xl text-gray-900 text-sm outline-none w-full h-12 px-3.5 py-2.5"
          />
          <button
            onClick={sendChat}
            className="rounded-full w-10 h-10 mr-1 my-1 px-3 py-1 bg-brandBlue "
          >
            <SendIcon />
          </button>
        </div>
      </div>
      {thisChatRoom && (
        <ChatRoomMemList
          roomInfo={thisChatRoom}
          tgVal={chatInfosToggle}
          tg={setChatInfosToggle}
        />
      )}
    </div>
  );
};
