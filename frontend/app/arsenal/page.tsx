async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/players");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

interface Player {
  back_number: string;
  name: string;
  age: string;
  nation: string;
  position: string;
}

// 2. 받아오는 데이터의 전체 구조를 정의합니다.
interface Data {
  players: Player[];
}

export default async function Page() {
  const data: Data = await getData();

  const sortedPlayers = [...data.players].sort((a, b) => {
    return parseInt(a.back_number) - parseInt(b.back_number);
  });

  return (
    <div>
      <h1>Arsenal 선수단 (등번호 순)</h1>
      {sortedPlayers.map((player: Player) => (
        <div key={player.back_number}>
          {player.back_number}: {player.name} : {player.age}
        </div>
      ))}
    </div>
  );
}
