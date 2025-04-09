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
  arr.length = 0; // 매번 요청마다 초기화 (안 하면 누적됨)
  const { num } = await params;

  console.log(num);

  for (let i = (num - 1) * 100; i < num * 100; i++) {
    const hintData = await getHint(i);
    const guessData = await getGuess(hintData.word);
    arr.push({
      word: hintData.word,
      rank: guessData.rank ? guessData.rank : "정답",
      score: guessData.score ? guessData.score : 100,
    });
  }

  return new Response(JSON.stringify(arr), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
