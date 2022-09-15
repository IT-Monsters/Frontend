import { useState } from "react";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { PostsAdd } from "../types/postsaddType";
import { useRecoilValue } from "recoil";
import { loginInfoState } from "../store/loginInfoState";

export const AddPosts = () => {
  const userToken = getCookieToken();
  const navigate = useNavigate();

  const [title, titleHandler] = useInput("");
  const [content, setContent] = useState("");
  const [stacks, setStacks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [backend, setBackend] = useState<number>(0);
  const [frontend, setFrontend] = useState<number>(0);
  const [designer, setDesigner] = useState<number>(0);
  const [fullstack, setFullstack] = useState<number>(0);

  const postInfo = {
    title,
    content,
    duration,
    stacks,
    backend,
    frontend,
    designer,
    fullstack,
  };

  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const copy = [...stacks];
    copy.push(e.target.value);
    setStacks(copy);
  };

  const addPost = async (postInfo: PostsAdd) => {
    const { data } = await instance.post("api/quests", postInfo, {
      headers: { authorization: userToken },
    });
    return data;
  };
  const addPostsMutation = () => {
    return useMutation((data: PostsAdd) => {
      return addPost(data);
    });
  };

  const { mutateAsync } = addPostsMutation();

  const onSubmitHandler = async () => {
    if (content && title) {
      console.log("onSubmitHandler");
      const responce = await mutateAsync(postInfo);
      console.log(responce);
      alert("게시글 작성 완료!");
      navigate("/search");
      return;
    }
    if (!title) {
      return alert("제목을 입력해 주세요!!");
    }
    if (!content) {
      return alert("프로젝트 내용을 입력해 주세요!!");
    }
  };

  const userProfile = useRecoilValue(loginInfoState);
  console.log(userProfile);

  return (
    <div className="w-full h-full overflow-y-scroll pb-[3.5rem] p-4">
      <div className="flex justify-start">
        <div className="m-5 overflow-hidden relative w-24 h-24 bg-gray-100 rounded-full">
          {/* <img src={userProfile[0].profileImage} /> */}
        </div>
        <div className="grid justify-items-start mt-5 m-3">
          {/* <p>닉네임:{userProfile[0].nickname}</p> */}
        </div>
      </div>
      {/* 제목 입력 란 */}
      <input
        className="border-b-gray-200 border-t-transparent border-r-transparent border-l-transparent outline-none border-double border-4 border-gray-600 w-full mb-5 text-3xl placeholder:italic placeholder:text-slate-300"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={titleHandler}
      />
      {/* DropDown */}
      <div>
        <div className="my-6">
          <div className="flex justify-between">
            <p>구인스택</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              onChange={addStack}
            >
              <option selected>스택 선택</option>
              <option value="React">React</option>
              <option value="Vue Js">Vue js</option>
              <option value="Javascript">JavaScript</option>
              <option value="Typescript">Typecript</option>
              <option value="Next Js">Next js</option>
              <option value="Svelte">Svelte</option>
              <option value="CSS3">CSS3</option>
              <option value="Angular Js">Angular js</option>
              <option value="jQuery">jQuery</option>
              <option value="Java">Java</option>
              <option value="Spring Boot">Spring Boot</option>
              <option value="Node Js">Node js</option>
              <option value="Python">Python</option>
              <option value="Django">Django</option>
              <option value="PHP">PHP</option>
              <option value="C++">C++</option>
              <option value="C#">C#</option>
              <option value="AWS">AWS</option>
              <option value="MySqal">MySQL</option>
              <option value="Oracle">Oracle</option>
            </select>
          </div>
          <div className="flex row">
            {stacks.map(s => (
              <p className="mr-2 border border-black p-2">#{s}</p>
            ))}
          </div>
          <div className="flex justify-between">
            <p>프로젝트 예상 기간</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              onChange={e => {
                setDuration(parseInt(e.target.value));
              }}
            >
              <option selected>예상 기간</option>
              <option value="1">1주</option>
              <option value="2">2주</option>
              <option value="3">3주</option>
              <option value="4">4주</option>
              <option value="5">5주</option>
              <option value="6">6주</option>
              <option value="7">6주 이상</option>
            </select>
          </div>
        </div>
        <p>- 모집인원 -</p>
        <div className="mt-5">
          <div className="flex justify-between">
            <p>Backend</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              onChange={e => {
                setBackend(parseInt(e.target.value));
              }}
            >
              <option selected>0</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">6명이상</option>
            </select>
          </div>{" "}
          <div className="flex justify-between ">
            <p>Frontend</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              onChange={e => {
                setFrontend(parseInt(e.target.value));
              }}
            >
              <option selected>0</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">6명이상</option>
            </select>
          </div>{" "}
          <div className="flex justify-between">
            <p>Designer</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              onChange={e => {
                setDesigner(parseInt(e.target.value));
              }}
            >
              <option selected>0</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">6명이상</option>
            </select>
          </div>{" "}
          <div className="flex justify-between">
            <p>Fullstack</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              onChange={e => {
                setFullstack(parseInt(e.target.value));
              }}
            >
              <option selected>0</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">6명이상</option>
            </select>
          </div>
        </div>
      </div>

      <textarea
        id="message"
        rows={5}
        className="block p-2.5 mt-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="프로젝트 내용을 입력해주세요."
        value={content}
        onChange={contentHandler}
      />
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="cursor-pointer bg-cyan-300 hover:bg-cyan-400 w-20 h-10 rounded-lg border-none
           mt-5"
          onClick={onSubmitHandler}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};
