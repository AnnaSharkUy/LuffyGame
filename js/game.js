/**
 * LuffyGame — логика игры (HTML5 / Wick)
 */
(function (global) {
  "use strict";
  const Game = {
    score: 0, totalAnswered: 0, seaIndex: 0, pool: [], current: null,
    answered: false, correctInSea: 0, questionsInSea: 0, screen: "menu",
    resetSea(seaName) {
      const name = seaName || SEAS_ORDER[this.seaIndex];
      this.pool = QUESTIONS.filter((q) => q.sea === name).map((q) => ({ ...q })).sort(() => Math.random() - 0.5);
      this.questionsInSea = this.pool.length; this.correctInSea = 0; this.answered = false; this.nextQuestion();
    },
    nextQuestion() {
      if (this.pool.length === 0) { this.current = null; return false; }
      this.current = this.pool.shift(); this.answered = false; return true;
    },
    answer(idx) {
      if (this.answered || !this.current) return null;
      this.answered = true; this.totalAnswered += 1;
      const ok = idx === this.current.correct;
      if (ok) { this.score += 1; this.correctInSea += 1; }
      return { ok, correct: this.current.correct, explanation: this.current.explanation };
    },
    seaPct() { return Math.round((100 * this.correctInSea) / Math.max(1, this.questionsInSea)); },
    totalPct() { return Math.round((100 * this.score) / Math.max(1, this.totalAnswered)); },
    resetAll() {
      this.score = 0; this.totalAnswered = 0; this.seaIndex = 0; this.pool = [];
      this.current = null; this.answered = false; this.correctInSea = 0; this.questionsInSea = 0; this.screen = "menu";
    }
  };
  global.LuffyGame = Game;
})(typeof window !== "undefined" ? window : globalThis);
