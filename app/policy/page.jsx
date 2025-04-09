/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

function PrivacyPolicy() {
  return (
    <Wrapper>
      <Title>개인정보처리방침</Title>

      <Paragraph>
        본 개인정보처리방침은 이용자의 이메일 주소 수집 및 이용에 관한 내용을
        안내하기 위한 것입니다.
      </Paragraph>

      <Section>
        <SubTitle>1. 수집하는 개인정보 항목</SubTitle>
        <Paragraph>운영자는 아래와 같은 개인정보를 수집합니다.</Paragraph>
        <List>
          <li>이메일 주소</li>
        </List>
      </Section>

      <Section>
        <SubTitle>2. 개인정보의 수집 및 이용 목적</SubTitle>
        <Paragraph>
          수집한 이메일 주소는 다음의 목적을 위해 이용됩니다.
        </Paragraph>
        <List>
          <li>이용자 문의사항에 대한 확인 및 이메일을 통한 답변 제공</li>
        </List>
      </Section>

      <Section>
        <SubTitle>3. 보유 및 이용기간</SubTitle>
        <Paragraph>
          수집한 이메일 주소는 문의 대응 완료 후 지체 없이 파기됩니다.
          <br />※ 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관할 수
          있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>4. 개인정보의 제3자 제공</SubTitle>
        <Paragraph>
          운영자는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>5. 개인정보의 처리 위탁</SubTitle>
        <Paragraph>
          운영자는 개인정보 처리를 외부에 위탁하지 않습니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>6. 이용자의 권리</SubTitle>
        <Paragraph>
          이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제를 요청할 수
          있으며, 이에 대해 운영자는 지체 없이 필요한 조치를 취합니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>7. 문의처</SubTitle>
        <Paragraph>
          개인정보와 관련된 문의는 아래 연락처를 통해 접수하실 수 있습니다.
          <br />
          이메일:{" "}
          <EmailLink href="mailto:dltjgus8098@naver.com">
            dltjgus8098@naver.com
          </EmailLink>
        </Paragraph>
      </Section>
    </Wrapper>
  );
}

export default PrivacyPolicy;

const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;

  li {
    margin-bottom: 0.5rem;
  }
`;

const EmailLink = styled.a`
  color: #0070f3;
  text-decoration: none;
`;
