stop();
if (typeof window.LUFFY_INIT === "undefined") {
  window.LUFFY_INIT = true;
  window.LUFFY = {
    score: 0, totalAnswered: 0, seaIndex: 0, pool: [], current: null,
    answered: false, correctInSea: 0, questionsInSea: 0,
    seas: ["East Blue", "West Blue", "North Blue", "South Blue", "Grand Line"],
    questions: (typeof QUESTIONS !== "undefined") ? QUESTIONS : []
  };
}
function luffyStartSea(index) {
  var L = window.LUFFY;
  L.seaIndex = index;
  var sea = L.seas[index];
  L.pool = L.questions.filter(function (q) { return q.sea === sea; });
  L.pool.sort(function () { return Math.random() - 0.5; });
  L.questionsInSea = L.pool.length; L.correctInSea = 0; L.answered = false;
  luffyNextQuestion();
}
function luffyNextQuestion() {
  var L = window.LUFFY;
  if (!L.pool.length) { L.current = null; return false; }
  L.current = L.pool.shift(); L.answered = false; return true;
}
function luffyAnswer(idx) {
  var L = window.LUFFY;
  if (L.answered || !L.current) return null;
  L.answered = true; L.totalAnswered++;
  var ok = idx === L.current.correct;
  if (ok) { L.score++; L.correctInSea++; }
  return { ok: ok, correct: L.current.correct, explanation: L.current.explanation };
}
function luffySeaPct() {
  var L = window.LUFFY;
  return Math.round(100 * L.correctInSea / Math.max(1, L.questionsInSea));
}
function luffyResetAll() {
  var L = window.LUFFY;
  L.score = 0; L.totalAnswered = 0; L.seaIndex = 0; L.pool = [];
  L.current = null; L.answered = false; L.correctInSea = 0; L.questionsInSea = 0;
}
