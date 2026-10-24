(function () {
  "use strict";
  const G = LuffyGame;
  const $ = (id) => document.getElementById(id);
  function show(name) {
    G.screen = name;
    document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    $("screen-" + name).classList.add("active");
  }
  function renderSeas() {
    const list = $("sea-list"); list.innerHTML = "";
    SEAS_ORDER.forEach((sea, i) => {
      const div = document.createElement("div");
      div.className = "sea-card";
      div.innerHTML = "<h3>" + (i + 1) + ". " + sea + "</h3><p>" + (SEA_DESCRIPTIONS[sea] || "") + "</p>";
      div.onclick = () => startSea(i);
      list.appendChild(div);
    });
    $("seas-score").textContent = "Всего правильных: " + G.score;
  }
  function startSea(idx) {
    G.seaIndex = idx; G.resetSea(SEAS_ORDER[idx]); renderQuiz(); show("quiz");
  }
  function renderQuiz() {
    const q = G.current;
    if (!q) { showResult(); return; }
    $("quiz-sea").textContent = SEAS_ORDER[G.seaIndex] + " · " + q.theme;
    const num = G.questionsInSea - G.pool.length;
    $("quiz-progress").textContent = "Вопрос " + num + " / " + G.questionsInSea + "  |  Верно: " + G.correctInSea;
    $("quiz-text").textContent = q.text;
    const box = $("quiz-options"); box.innerHTML = "";
    $("quiz-explain").style.display = "none"; $("quiz-next").style.display = "none";
    q.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "btn opt";
      b.textContent = String.fromCharCode(65 + i) + ".  " + opt;
      b.onclick = () => onAnswer(i);
      box.appendChild(b);
    });
  }
  function onAnswer(idx) {
    if (G.answered) return;
    const res = G.answer(idx);
    $("quiz-options").querySelectorAll(".btn").forEach((b, i) => {
      b.disabled = true;
      if (i === res.correct) b.classList.add("correct");
      else if (i === idx && !res.ok) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    const exp = $("quiz-explain");
    exp.style.display = "block";
    exp.className = "explain" + (res.ok ? "" : " bad");
    exp.innerHTML = "<b>" + (res.ok ? "Верно! 🎉" : "Неверно...") + "</b><br>" + res.explanation;
    const next = $("quiz-next");
    next.style.display = "block";
    next.textContent = G.pool.length ? "Следующий →" : "К итогам →";
  }
  $("quiz-next").onclick = () => { if (G.nextQuestion()) renderQuiz(); else showResult(); };
  function showResult() {
    const sea = SEAS_ORDER[G.seaIndex]; const pct = G.seaPct();
    $("result-title").textContent = "Море «" + sea + "» пройдено!";
    $("result-score").textContent = "Правильных: " + G.correctInSea + " из " + G.questionsInSea + " (" + pct + "%)";
    let msg, color;
    if (pct >= 80) { msg = "Отлично!"; color = "#32b450"; }
    else if (pct >= 50) { msg = "Хорошо!"; color = "#ff8c00"; }
    else { msg = "Попробуй снова!"; color = "#dc3232"; }
    $("result-msg").textContent = msg; $("result-msg").style.color = color; show("result");
  }
  $("result-next").onclick = () => {
    G.seaIndex += 1;
    if (G.seaIndex >= SEAS_ORDER.length) {
      $("final-score").textContent = "Всего: " + G.score + " из " + G.totalAnswered + " (" + G.totalPct() + "%)";
      show("final");
    } else { G.resetSea(); renderQuiz(); show("quiz"); }
  };
  $("result-retry").onclick = () => { G.resetSea(); renderQuiz(); show("quiz"); };
  $("final-menu").onclick = () => { G.resetAll(); show("menu"); };
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const go = btn.getAttribute("data-go");
      if (go === "seas") renderSeas();
      if (go === "menu") G.resetAll();
      show(go);
    });
  });
})();
