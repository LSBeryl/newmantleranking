import axios from "axios";

async function getHint(index) {
  const date = new Date().toISOString().split("T")[0];
  const res = await axios.get(`${process.env.NEXT_HINT_URL}${date}/${index}`);
  return res.data;
}

async function getGuess(word) {
  const date = new Date().toISOString().split("T")[0];
  const res = await axios.get(`${process.env.NEXT_GUESS_URL}${date}/${word}`);
  return res.data;
}

export async function GET(request, { params }) {
  const { num } = params;
  const start = (num - 1) * 100;
  const end = num * 100;

  try {
    // 힌트 요청 (안전하게)
    const hintResults = await Promise.allSettled(
      Array.from({ length: 100 }, (_, i) => getHint(start + i))
    );

    const validHints = hintResults
      .map((res, i) => {
        if (res.status === "fulfilled") return res.value;
        console.error(`❌ getHint 실패 - index ${start + i}`, res.reason);
        return null;
      })
      .filter(Boolean);

    // guess 요청 (안전하게)
    const guessResults = await Promise.allSettled(
      validHints.map((hint) => getGuess(hint.word))
    );

    const validGuesses = guessResults
      .map((res, i) => {
        if (res.status === "fulfilled") return res.value;
        console.error(
          `❌ getGuess 실패 - word: ${validHints[i].word}`,
          res.reason
        );
        return null;
      })
      .filter(Boolean);

    // 결과 조합 (길이 mismatch 방지)
    const result = validHints.slice(0, validGuesses.length).map((hint, i) => ({
      word: hint.word,
      rank: validGuesses[i].rank || "정답",
      score: validGuesses[i].score || 100,
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("API 실패:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
