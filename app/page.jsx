/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";

export default function App() {
  const [data, setData] = useState([]);
  const [menuNum, setMenuNum] = useState(1);
  const [showAns, setShowAns] = useState(false);
  const [isDamned, setIsDamned] = useState(false);
  const [mountTime, _] = useState(new Date());

  const cache = useRef({}); // menuNum별 캐시

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data; // 최신값 유지
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const curTime = new Date();
      const elapsed = curTime - mountTime;
      const isTimeout = elapsed >= 10000;
      const isDataEmpty = dataRef.current.length === 0;

      if (isTimeout && isDataEmpty) {
        setIsDamned(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (cache.current[menuNum]) {
        // 이미 캐시된 데이터가 있으면 그걸 사용
        setData(cache.current[menuNum]);
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const res = await axios.get(baseUrl + `/${menuNum}`);
        setData(res.data);
        cache.current[menuNum] = res.data; // 캐시에 저장
      } catch (e) {
        console.error("Error fetching data", e);
      }
    }

    fetchData();
  }, [menuNum]);

  return (
    <Wrapper>
      <h2>뉴맨틀 - 단어 랭킹</h2>
      <div
        css={css`
          font-size: 0.8rem;
        `}
      >
        {new Date().toISOString().split("T")[0]} 기준
      </div>
      {isDamned && (
        <div
          css={css`
            margin: 0.5rem 0;
            font-size: 0.8rem;
            color: #d00000;
          `}
        >
          앗! 서버가 터졌나봐요! 잠시 후에 다시 시도해주세요.
        </div>
      )}
      <Table>
        <thead>
          <tr>
            <Th>순위</Th>
            <Th>단어</Th>
            <Th>점수</Th>
          </tr>
        </thead>
        <tbody>
          {data[0] ? (
            data.map((item, index) => {
              const isTop = index === 0 && menuNum === 1;
              const Row = isTop ? HighlightedRow : Tr;
              console.log(isTop);
              return (
                <Row key={index}>
                  <Td
                    css={css`
                      color: ${item.rank === "순위 밖" ? "#9ca3af" : "#4b5563"};
                    `}
                  >
                    {item.rank}
                  </Td>
                  <Td
                    css={
                      isTop
                        ? css`
                            filter: ${showAns ? "blur(0px)" : "blur(4px)"};
                            transition: all 0.2s ease;
                            cursor: pointer;
                          `
                        : null
                    }
                    onClick={(e) => {
                      if (isTop) {
                        if (showAns) {
                          setShowAns(false);
                        } else {
                          const isConfirmed = confirm("정답을 보시겠습니까?");
                          setShowAns(isConfirmed);
                        }
                      }
                    }}
                  >
                    {item.word}
                  </Td>

                  <Td
                    css={css`
                      color: ${item.rank === "순위 밖" ? "#9ca3af" : "#4b5563"};
                    `}
                  >
                    {item.score.toFixed(2)}
                  </Td>
                </Row>
              );
            })
          ) : (
            <Tr>
              <Td colSpan="3">Loading...</Td>
            </Tr>
          )}
        </tbody>
      </Table>
      <MenuCon>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <Menu
            key={v}
            css={
              menuNum == v
                ? css`
                    border: 1px solid #989898;
                  `
                : null
            }
            onClick={(e) => {
              setData([]);
              setMenuNum(v);
            }}
          >
            {v}
          </Menu>
        ))}
      </MenuCon>
      <Footer>
        <Link href="/inquiry">문의하기</Link>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  width: 50vw;
  table-layout: fixed;
  text-align: center;
  font-size: 0.875rem;
  border-collapse: collapse;

  @media (max-width: 1024px) {
    width: 90vw;
  }
`;

const Th = styled.th`
  padding: 1rem;
  font-weight: 500;
  color: #6b7280; /* text-muted-foreground */
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tr = styled.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: #f9fafb; /* hover:bg-muted/50 */
  }
`;

const HighlightedRow = styled(Tr)`
  background-color: #f3f4f6; /* bg-muted */
  font-weight: 500;
`;

const MenuCon = styled.ul`
  display: flex;
  padding: 0;
  margin: 1rem 0;
  gap: 0.5rem;
  list-style: none;
`;
const Menu = styled.li`
  box-sizing: border-box;
  width: 1.8rem;
  height: 1.8rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid #989898;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  padding: 1rem 0;
  font-size: 0.85rem;
  color: #6b7280;
  text-align: center;
  border-top: 1px solid #e5e7eb;
  width: 100%;
  & > a {
    color: #6b7280;
    text-decoration: none;
  }
`;
