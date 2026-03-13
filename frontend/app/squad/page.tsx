"use client";
import { useQuery } from "@tanstack/react-query";

interface Player {
  back_number: string;
  name: string;
  age: string;
  nation: string;
  position: string;
}

export default function SquadPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["players"], // 데이터의 고유 이름
    queryFn: () =>
      fetch("https://arsenal-cy44.onrender.com/api/players").then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <div>선수단 정보를 불러오는 중...</div>;
  if (error) return <div>에러 발생!</div>;

  const sortedPlayers = [...data.players].sort(
    (a, b) => parseInt(a.back_number) - parseInt(b.back_number),
  );

  return (
    <div>
      <h1>Arsenal 선수단 (React Query 적용!)</h1>
      {sortedPlayers.map((player: Player) => (
        <div key={player.back_number}>
          {player.back_number}: {player.name}
        </div>
      ))}
    </div>
  );
}
