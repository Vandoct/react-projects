import { useState } from "react";
import "./App.scss";

const teams = ["red", "green", "blue", "orange", "violet", "lavender"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomChar = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomTeam = () => getRandomInt(0, 5);

const App = () => {
  const [player, setPlayer] = useState([]);
  const [chosen, setChosen] = useState({
    home: [],
    away: [],
  });

  const handleAddPlayer = () => {
    let team;
    let isTeamFull;
    const isAllTeamFull = player.length === teams.length * 3;

    do {
      team = getRandomTeam();
      isTeamFull =
        player.filter((item) => item.team === teams[team]).length === 3;
    } while (isTeamFull && !isAllTeamFull);

    if (!isAllTeamFull) {
      setPlayer([
        ...player,
        {
          name: generateRandomChar(2),
          team: teams[team],
        },
      ]);
    } else {
      alert("All team already filled up!");
    }
  };

  const handlePickTeam = () => {
    const availableTeams = teams
      .map((team) => {
        return player.filter((player) => player.team === team);
      })
      .filter((team) => team.length === 3);

    if (availableTeams.length < 2) {
      alert("Need two teams that has three players on each");
      return;
    }

    const firstTeam = getRandomInt(0, availableTeams.length - 1);
    let secondTeam = getRandomInt(0, availableTeams.length - 1);

    while (firstTeam === secondTeam) {
      secondTeam = getRandomInt(0, availableTeams.length - 1);
    }

    setChosen({
      home: availableTeams[firstTeam],
      away: availableTeams[secondTeam],
    });
  };

  return (
    <>
      <nav>
        <h1>Picker</h1>
        <button onClick={handleAddPlayer}>Add</button>
      </nav>

      <div>
        <h5>Players</h5>

        <div className="players">
          {player.map((item, index) => {
            return (
              <p key={index} style={{ background: item.team }}>
                {item.name}
              </p>
            );
          })}
        </div>
      </div>

      <main>
        <h5>Teams</h5>

        <div className="content">
          <div className="team">
            {chosen.home.map((player, index) => (
              <div
                key={index}
                className="item"
                style={{ background: player.team }}
              >
                {player.name}
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="team">
            {chosen.away.map((player, index) => (
              <div
                key={index}
                className="item"
                style={{ background: player.team }}
              >
                {player.name}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handlePickTeam}>Pick</button>
      </main>
    </>
  );
};

export default App;
