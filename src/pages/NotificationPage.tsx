import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { notificationApi } from "../APIs/NotificationApi";
import { notiType } from "../types/notificationType";

export const NotificationPage = () => {
  const { data: notifications } = notificationApi.getQuestOffer();
  const queryClient = useQueryClient();

  const { mutateAsync: approveQuestoffer } =
    notificationApi.approveQuestOffer();

  const onApproveRequest = (offerId: number) => {
    approveQuestoffer(offerId).then(() => {
      queryClient.invalidateQueries(["questoffer"]);
    });
  };

  const { mutateAsync: cancelQuestoffer } = notificationApi.cancelQuestOffer();

  const onCancelRequest = (offerId: number) => {
    cancelQuestoffer(offerId).then(() => {
      queryClient.invalidateQueries(["questoffer"]);
    });
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[4.5rem]">
      <div className="flex py-4 px-6 absolute top-0 left-0 right-0 z-50 bg-white border-b-2">
        <h1 className="mr-2 text-2xl font-cookie">알림</h1>{" "}
        <svg
          width="18"
          height="23"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.48921 22.7285V22.0611H3.4757C2.67806 22.0599 1.91347 21.7424 1.34973 21.1781C0.785988 20.6138 0.469156 19.8489 0.468769 19.0512V18.5423C0.466668 17.9066 0.642675 17.283 0.976845 16.7422C1.31101 16.2014 1.78998 15.765 2.35947 15.4825C2.61567 15.3558 2.83505 15.1655 2.99659 14.9297C3.15814 14.694 3.25644 14.4207 3.28208 14.136L3.87907 7.57063C4.06971 5.50449 5.02526 3.58408 6.55837 2.18592C8.09148 0.787757 10.0916 0.0126953 12.1665 0.0126953C14.2414 0.0126953 16.2415 0.787757 17.7746 2.18592C19.3077 3.58408 20.2632 5.50449 20.4539 7.57063L21.0509 14.136C21.0757 14.4198 21.1731 14.6923 21.3336 14.9276C21.4942 15.1629 21.7125 15.353 21.9676 15.4796C22.5383 15.7619 23.0185 16.1985 23.3537 16.7398C23.6889 17.2811 23.8658 17.9056 23.8642 18.5423V19.0512C23.8634 19.8486 23.5464 20.6132 22.9827 21.1771C22.419 21.7411 21.6546 22.0585 20.8572 22.0596H15.8423V22.727C15.823 23.6894 15.4272 24.6059 14.7399 25.2797C14.0525 25.9534 13.1283 26.3309 12.1657 26.3309C11.2032 26.3309 10.279 25.9534 9.59162 25.2797C8.90423 24.6059 8.50844 23.6894 8.48921 22.727V22.7285ZM10.4943 22.7285C10.4943 23.1718 10.6704 23.5969 10.9839 23.9104C11.2973 24.2238 11.7225 24.3999 12.1657 24.3999C12.609 24.3999 13.0342 24.2238 13.3476 23.9104C13.6611 23.5969 13.8372 23.1718 13.8372 22.7285V22.0611H10.4958L10.4943 22.7285ZM5.87538 7.75251L5.2784 14.3179C5.22316 14.9427 5.00808 15.5428 4.65383 16.0604C4.29958 16.578 3.81809 16.9958 3.25568 17.2735C3.01901 17.3902 2.81985 17.571 2.68086 17.7953C2.54187 18.0196 2.46863 18.2784 2.46948 18.5423V19.0512C2.46948 19.3171 2.57498 19.5721 2.76282 19.7602C2.95065 19.9483 3.20547 20.0541 3.4713 20.0545H20.8572C21.1232 20.0541 21.3782 19.9483 21.5662 19.7603C21.7543 19.5722 21.8601 19.3172 21.8605 19.0512V18.5423C21.8614 18.279 21.7884 18.0207 21.65 17.7967C21.5116 17.5727 21.3132 17.392 21.0773 17.275C20.5151 16.9964 20.0338 16.5783 19.6794 16.0605C19.325 15.5428 19.1093 14.9428 19.0531 14.3179L18.4561 7.75251C18.3122 6.18348 17.5872 4.72484 16.4233 3.66281C15.2594 2.60077 13.7406 2.01199 12.165 2.01199C10.5894 2.01199 9.07063 2.60077 7.90674 3.66281C6.74284 4.72484 6.01782 6.18348 5.87391 7.75251H5.87538Z"
            fill="#141124"
          />
        </svg>
      </div>
      <ul className="mx-6 mt-[5rem]">
        {notifications?.map((noti: notiType) => (
          <li
            className="flex flex-col mb-4 bg-white rounded-lg border shadow-md hover:bg-gray-100"
            key={noti.offerId}
          >
            <div className="flex px-2 ">
              <Link to={`/user/${noti.offeredMemberId}`}>
                <div className="m-5 w-14 h-14">
                  <img
                    className="w-full h-full border rounded-full"
                    src={noti.profileImg}
                  />
                </div>
              </Link>
              <div className="w-[65%] py-4">
                <Link to={`/user/${noti.offeredMemberId}`}>
                  <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    {noti.offeredMemberNickname}
                  </p>
                </Link>
                <Link to={`/posts/${noti.questId}`}>
                  <p className="truncate text-sm">
                    원문 :{" "}
                    <span className="font-semibold">{noti.questTitle}</span>
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex justify-between px-10 pb-4">
              <button
                onClick={() => {
                  onApproveRequest(noti.offerId);
                }}
                className="text-brandBlue"
              >
                승인
              </button>
              <button
                onClick={() => {
                  onCancelRequest(noti.offerId);
                }}
                className="text-red-700"
              >
                거절
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
