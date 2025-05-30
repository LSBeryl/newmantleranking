"use client";

import emailjs from "@emailjs/browser";
import { useRef } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Inquiry() {
  const form = useRef();
  const router = useRouter();

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_KEY,
        process.env.NEXT_PUBLIC_TEMPLATE_KEY,
        form.current,
        process.env.NEXT_PUBLIC_KEY
      );
      alert("성공적으로 문의가 접수되었습니다.");
      router.push("/"); // 홈으로 이동
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <TopBar>
        <BackButton onClick={() => router.push("/")}>&lt; 메인으로</BackButton>
      </TopBar>

      <Titles>
        <Title>문의 및 건의 사항</Title>
        <Subtitle>
          서비스에 대한 궁금한 점, 제안하고 싶은 내용을 자유롭게 남겨주세요.
          <br />
          문의에 대한 답변이 필요한 경우, 답변을 받을 수신 이메일 주소를 함께
          작성해 주세요. 이메일을 작성하여 보내는 경우,{" "}
          <Link href="/policy">개인정보처리방침</Link>에 동의한 것으로
          간주합니다.
        </Subtitle>
      </Titles>

      <Form ref={form} onSubmit={onSubmitForm}>
        <MessageContainer>
          <label htmlFor="message">
            문의 내용 <Red>*</Red>
          </label>
          <Message
            id="message"
            name="message"
            placeholder="내용을 입력해주세요."
            required
          />
        </MessageContainer>

        <input type="hidden" name="from_name" value="뉴맨틀 단어 랭킹" />
        <ButtonCon>
          <Button type="submit" value="문의하기" />
        </ButtonCon>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 720px;
  width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
  color: #1f1f1f;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #aaa;
  padding-bottom: 1rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  line-height: 1.4;
  color: #555;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Red = styled.span`
  color: red;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  & > label {
    min-width: 80px;
    font-weight: 500;
    margin-top: 0.3rem;
    font-size: 0.8rem;

    @media (max-width: 768px) {
      font-size: 0.7rem;
      min-width: 70px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Message = styled.textarea`
  flex-grow: 1;
  resize: none;
  height: 6rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9rem;
  outline: none;
  color: #1f1f1f;
  font-family: Arial, Helvetica, sans-serif;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ButtonCon = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.input`
  width: fit-content;
  /* min-width: 100px; */
  /* height: 3rem; */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #f0f0f0;
  border: 1px solid #d7d7d7;
  color: #1f1f1f;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #e5e5e5;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
