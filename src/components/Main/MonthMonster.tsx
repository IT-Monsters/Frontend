import { IMonthMonster } from "../../types/mainpageType";

export const MonthMonster = ({ monster }: { monster: IMonthMonster }) => {
  const { nickname, profileImage, stacks } = monster;
  console.log(monster);
  return (
    <li className="flex w-[500px] flex-col shadow-[4px_4px_4px_rgba(0,0,0,0.1)] px-[47px] rounded-[16px]">
      <div className="mb-[20px] w-[100px] h-[100px] mt-[30px]">
        <img src={profileImage} alt="" />
      </div>
      <div className="text-center border rounded-[10px]">
        <span className="px-[14px] text-xs">{nickname}</span>
      </div>
      <ul className="mb-[14px]">
        {stacks.map(stack => (
          <li key={stack}>{stack}</li>
        ))}
      </ul>
    </li>
  );
};