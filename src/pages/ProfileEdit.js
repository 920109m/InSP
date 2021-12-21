import React from "react";

import Layout from "../components/style/Layout";
import {
  InputProfileImg,
  useProfileConfirm,
  useProfileEditInit,
  useProfileSet,
} from "../hooks/useProfileEdit";
import { BANK_LIST, CATEGORY_SET, TYPE_OF_SNS } from "../common/consts";

import styled from "styled-components";
import { Button, Carousel, Divider, Dropdown, Image, Input, Menu, Radio, Typography } from "antd";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { pixelToRem, theme } from "../common/theme";
import useCopyClipBoard from "../hooks/useCopyClipBoard";

export default function ProfileEdit() {
  const [data, { isLoading }] = useProfileEditInit();
  const user = data?.user;
  const [seller, setSeller] = useProfileSet(data, isLoading);
  const [uploadSeller, flag] = useProfileConfirm(seller);

  return (
    <>
      {!isLoading && (
        <>
          <Layout Bar={bar()} minPadding>
            {/* 프로필이미지 */}
            <ProfileImage seller={seller} setSeller={setSeller} flag={flag} />
            {/* 아이디, 작가명, 작가소개  */}
            <SellerIdentity seller={seller} setSeller={setSeller} flag={flag} />
            {/* 작가 카테고리 */}
            {/* 스타일 정리해야함! */}
            <SellerCategory seller={seller} setSeller={setSeller} flag={flag} />
            {/* 작가 링크 SNS */}
            <SellerSns seller={seller} setSeller={setSeller} flag={flag} />
            <Divider />
            {/* 문의가능 시간, 판매 계좌, 카카오 계정 연락처 */}
            <SellerInquiry seller={seller} setSeller={setSeller} user={user} flag={flag} />
          </Layout>
          <ConfimContainer seller={seller} setSeller={setSeller} confirm={uploadSeller} />
        </>
      )}
    </>
  );
}

const bar = () => {
  return (
    <ScBarContainer>
      <Button className="bar-btn " icon={<ArrowLeftOutlined />} />
      <Typography className="bar-title ">프로필</Typography>
      <Button className="bar-btn right">사업자 정보 등록</Button>
    </ScBarContainer>
  );
};
const ScBarContainer = styled.div`
  display: grid;

  grid-template-columns: 1fr 6fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
  .bar-title {
    margin: auto;
  }
  .bar-btn {
    border: none;
    background-color: transparent;
  }
`;

const ProfileImage = ({ seller, setSeller }) => {
  return <InputProfileImg seller={seller} setSeller={setSeller} />;
};

const SellerIdentity = ({ seller, setSeller, flag }) => {
  return (
    <>
      <Input.Group>
        <Typography>내 아이디</Typography>
        <Input
          value={seller.publicId}
          onChange={e => {
            setSeller.publicId(e.target.value);
          }}
        />
        <ScFlagAlertText>
          <ExclamationCircleOutlined /> 아이디를 작성해주세요.
        </ScFlagAlertText>

        <Typography>작가명 (브랜드 또는 활동명)</Typography>
        <Input
          value={seller.info.name}
          onChange={e => {
            setSeller.info("name", e.target.value);
          }}
        />
        <Typography>작가 소개</Typography>
        <Input.TextArea
          value={seller.msg}
          onChange={e => {
            setSeller.msg(e.target.value);
          }}
        />
      </Input.Group>
    </>
  );
};

const SellerCategory = ({ seller, setSeller }) => {
  return (
    <>
      <Input.Group>
        <Typography>취향 발견 (최대 1개)</Typography>
        <div
          style={{
            width: "100%",
            height: "50px",
            justifyContent: "center",
            backgroundColor: "rgba(119, 190, 152, 0.06)",
            padding: "0px 10px",
            margin: "10px 0px",
            borderRadius: "4px",
          }}
        >
          <Typography variant="caption" style={{ fontSize: "14px", color: "#77BE98" }}>
            선택하신 카테고리에 작가님을 추천해드려요.
          </Typography>
        </div>
        <Radio.Group
          onChange={e => {
            setSeller.category(e.target.value);
          }}
          value={`${seller.category}`}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
          {CATEGORY_SET.map((e, i) => {
            let checked = seller.category == e.key;
            return (
              <RadioButton value={e.key} key={i}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    color: `${checked ? "black" : "gray"}`,
                  }}
                >
                  <img
                    src={checked ? e.selected : e.icon}
                    style={{ width: "60px", height: "60px" }}
                  />
                  {e.desc}
                </div>
              </RadioButton>
            );
          })}
        </Radio.Group>
      </Input.Group>
    </>
  );
};

const RadioButton = styled(Radio.Button)`
  border: none !important;
  width: 80px;
  height: auto;
  padding: 0px;
  &::before {
    width: 0px !important;
  }
`;

const SellerSns = ({ seller, setSeller }) => {
  const linkList = i => {
    return (
      <Menu>
        <Menu.Item key="" disabled>
          <a>링크 선택</a>
        </Menu.Item>
        {TYPE_OF_SNS.map(list => {
          return (
            <div>
              <Menu.item
                key={list.case}
                onClick={e => {
                  setSeller.sns.type(e, i);
                }}
              >
                <a>{list.case}</a>
              </Menu.item>
            </div>
          );
        })}
      </Menu>
    );
  };
  return (
    <Input.Group>
      <Typography>작가 링크</Typography>
      {/* 질문 */}
      {seller.sns.length !== 0 &&
        seller.sns.map((sns, i) => {
          return (
            <ScSnsLink key={i}>
              <div className="group-top">
                <Dropdown className="group-first" overlay={linkList(i)} trigger={["click"]}>
                  <Button>{sns.type}</Button>
                </Dropdown>
                <Button
                  className="group-second"
                  onClick={() => {
                    setSeller.sns.delete(i);
                  }}
                >
                  삭제
                </Button>
              </div>
              <Input
                className="group-third"
                value={sns.url}
                onChange={e => {
                  setSeller.sns.url(e.target.value, i);
                }}
              />
            </ScSnsLink>
          );
        })}

      <Button
        onClick={() => {
          setSeller.sns.add();
        }}
      >
        + 링크 추가
      </Button>
    </Input.Group>
  );
};
const ScSnsLink = styled.div`
  display: flex;
  flex-direction: column;
  .group-top {
    display: flex;
    flex-direction: row;
  }
  .group-first {
    width: 70%;
    border-bottom: none;
  }
  .group-second {
    width: 30%;
    border-bottom: none;
  }
  .group-third {
    width: 100%;
  }
`;

const SellerInquiry = ({ seller, setSeller, user }) => {
  const bankList = () => {
    return (
      <Menu>
        <Menu.Item key="" disabled>
          <a>은행 선택</a>
        </Menu.Item>
        {BANK_LIST.map((v, i) => (
          <div key={i}>
            <Menu.Divider />
            <Menu.Item
              onClick={e => {
                setSeller.bank("type", v);
                console.log(e);
              }}
            >
              <a>{v}</a>
            </Menu.Item>
          </div>
        ))}
      </Menu>
    );
  };

  return (
    <Input.Group>
      <Typography>문의가능 시간</Typography>
      <Input
        value={seller.inquiry.time}
        onChange={e => {
          setSeller.inquiry("time", e.target.value);
        }}
      />
      <Typography>판매 계좌</Typography>
      <ScBankAccount>
        <div className="group-top">
          <Dropdown className="group-first" overlay={bankList()} trigger={["click"]}>
            <Button>{seller.bank.type}</Button>
          </Dropdown>
          <Input
            className="group-second"
            value={seller.bank.name}
            onChange={e => {
              setSeller.bank("name", e.target.value);
            }}
          />
        </div>
        <Input
          className="group-third"
          value={seller.bank.no}
          onChange={e => {
            setSeller.bank("no", e.target.value);
          }}
        />
      </ScBankAccount>
      <Typography>카카오 계정 연락처</Typography>
      <Input value={seller.info.phone} disabled />
    </Input.Group>
  );
};

const ScBankAccount = styled.div`
  display: flex;
  flex-direction: column;
  .group-top {
    display: flex;
    flex-direction: row;
  }
  .group-first {
    width: 35%;
    border-bottom: none;
  }
  .group-second {
    width: 65%;
    border-bottom: none;
  }
  .group-third {
    width: 100%;
  }
`;

const ConfimContainer = ({ seller, setSeller, confirm }) => {
  const [isCopy, onCopy] = useCopyClipBoard();

  return (
    <ConfirmContainerBox>
      <Button
        className="btn copy"
        onClick={() => {
          onCopy(`${process.env.REACT_APP_REDIRECTURL}/${seller.publicId}`);
        }}
      >
        프로필 주소 복사
      </Button>
      <Button
        className="btn confirm"
        onClick={() => {
          confirm(seller);
        }}
      >
        프로필 저장
      </Button>
    </ConfirmContainerBox>
  );
};

const ConfirmContainerBox = styled.div`
  position: sticky;
  display: flex;
  bottom: 0;
  height: ${pixelToRem(80)};
  /* max-width: ${pixelToRem(414)}; */
  width: 100%;
  padding: 10px;
  background-color: ${theme.backgroundSet.background};

  .copy {
    ${theme.colorSet.third};
    width: 50%;
    height: 100%;
  }
  .confirm {
    ${theme.colorSet.primary};
    width: 50%;
    height: 100%;
  }
`;
const ScFlagAlertText = styled(Typography)`
  ${theme.colorSet.sm}
`;
