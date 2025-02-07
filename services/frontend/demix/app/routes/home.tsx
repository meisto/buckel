// author: meisto
// date: 2025-02-07 21:22:49
//
import React from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const getFormatedDate = () => {
  const t = new Date();
  const hour = t.getHours().toString().padStart(2, "0");
  const minutes = t.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
};

export default function Page() {
  const dow = React.useMemo(() => {
    const t = new Date();
    return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"][t.getDay()];
  }, []);

  const [time, setTime] = React.useState(getFormatedDate());

  React.useEffect(() => {
    setTime(getFormatedDate());

    const intervalId = setInterval(() => setTime(getFormatedDate()), 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1
        className={`text-6xl font-extrabold font-libre-franklin w-full text-center drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white/80 select-none`}
      >
        {dow}, {time}
      </h1>
    </div>
  );
}
