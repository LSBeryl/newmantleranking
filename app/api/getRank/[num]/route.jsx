import axios from "axios";

const arr = [];

async function getHint(num) {
  const data = await axios.get(
    `${process.env.NEXT_HINT_URL}${
      new Date().toISOString().split("T")[0]
    }/${num}`
  );
  return data.data;
}

async function getGuess(word) {
  const data = await axios.get(
    `${process.env.NEXT_GUESS_URL}${
      new Date().toISOString().split("T")[0]
    }/${word}`
  );
  return data.data;
}

export async function GET(request, { params }) {
  const { num } = await params;
  const start = (num - 1) * 100;
  const end = num * 100;

  try {
    // 1. 힌트 데이터를 병렬로 요청
    const hintPromises = [];
    for (let i = start; i < end; i++) {
      hintPromises.push(getHint(i));
    }
    const hintDataArr = await Promise.all(hintPromises);

    // 2. 각 단어에 대해 guess 병렬 요청
    const guessPromises = hintDataArr.map((hint) => getGuess(hint.word));
    const guessDataArr = await Promise.all(guessPromises);

    // 3. 결과 조합
    const result = hintDataArr.map((hint, i) => ({
      word: hint.word,
      rank: guessDataArr[i].rank || "정답",
      score: guessDataArr[i].score || 100,
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response("Error", { status: 500 });
  }
}
