export function initializeGame(playerA, playerB) {
  if (!playerA || !playerB) throw new Error("initializeGame requires two player objects");
  if (typeof playerA.name !== "string" || playerA.name.trim() === "") throw new Error("playerA.name must be a nonempty string");
  if (typeof playerB.name !== "string" || playerB.name.trim() === "") throw new Error("playerB.name must be a nonempty string");
  if (typeof playerA.hp !== "number" || !Number.isFinite(playerA.hp) || playerA.hp < 0) throw new Error("playerA.hp must be a nonnegative number");
  if (typeof playerB.hp !== "number" || !Number.isFinite(playerB.hp) || playerB.hp < 0) throw new Error("playerB.hp must be a nonnegative number");
  const hps = {
    [playerA.name]: playerA.hp,
    [playerB.name]: playerB.hp
  };
  return { hps, logs: [] };
}
export const initGame = initializeGame;

export function performAttack(gameState, attacker, defender) {
  if (!gameState || typeof gameState !== "object") throw new Error("performAttack requires a gameState object");
  const { hps, logs } = gameState;
  if (!hps || typeof hps !== "object") throw new Error("performAttack requires hps object in gameState");
  if (!Array.isArray(logs)) throw new Error("performAttack requires logs array in gameState");
  if (!attacker || typeof attacker.name !== "string") throw new Error("performAttack requires an attacker with a valid name");
  if (!defender || typeof defender.name !== "string") throw new Error("performAttack requires a defender with a valid name");

  const moves = Array.isArray(attacker.attacks) && attacker.attacks.length > 0
    ? attacker.attacks
    : [{ name: "Tackle", minDmg: 1, maxDmg: 5 }];
  const move = moves[randomInRange(0, moves.length - 1)];
  const damage = randomInRange(move.minDmg, move.maxDmg);

  const currentHp = typeof hps[defender.name] === "number"
    ? hps[defender.name]
    : (defender.hp || 0);
  const newHp = Math.max(currentHp - damage, 0);
  const newHps = { ...hps, [defender.name]: newHp };

  const timestamp = new Date().toISOString();
  const entry = `${timestamp} - ${attacker.name} used ${move.name}, dealing ${damage} damage to ${defender.name}!`;
  const newLogs = [...logs, entry];

  return { hps: newHps, logs: newLogs };
}

export function checkDefeat(hps) {
  if (!hps || typeof hps !== "object") throw new Error("checkDefeat requires hps object");
  return Object.entries(hps)
    .filter(([, hp]) => hp <= 0)
    .map(([name]) => name);
}

export function randomInRange(min, max) {
  const a = Number(min);
  const b = Number(max);
  if (Number.isNaN(a) || Number.isNaN(b)) throw new Error("randomInRange requires numeric min and max");
  let minVal = a;
  let maxVal = b;
  if (minVal > maxVal) [minVal, maxVal] = [maxVal, minVal];
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}