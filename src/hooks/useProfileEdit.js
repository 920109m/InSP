import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useAPI } from "./useAPI";
import { INITIAL_PROFILE } from "../common/consts";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import thumbnail from "../components/icon/thumbnail_default_profile.png";

export const useProfileEditInit = () => {
  const callAPI = useAPI();
  const { isLoading, error, data, isFetching } = useQuery("userMe", () =>
    callAPI({ method: "get", url: `${process.env.REACT_APP_BASEURL}/user/me`, loading: true })
  );
  if (error) return "An error has occurred: " + error.message;

  return [data, { isLoading }];
};

export const useProfileSet = (data, isLoading) => {
  const { seller: initialSeller } = INITIAL_PROFILE;

  const [seller, setSeller] = useState(initialSeller);

  useEffect(() => {
    if (!isLoading && data.seller) {
      setSeller(data?.seller);
    } else if (!isLoading && !data.seller) {
      setSeller({ ...initialSeller, info: { ...initialSeller.info, phone: data.user.phone } });
    }
  }, [isLoading]);

  const publicId = data => {
    const filterId = data.replace(/[^0-9a-zA-Z-_]/gi, "");
    setSeller(value => {
      return {
        ...value,
        publicId: filterId,
      };
    });
  };

  const bank = (name, data) => {
    setSeller(value => {
      return {
        ...value,
        bank: {
          ...value.bank,
          [name]: data,
        },
      };
    });
  };

  const info = (name, data) => {
    if (name === "name") {
      setSeller(value => {
        return {
          ...value,
          info: {
            ...value.info,
            [name]: data,
          },
        };
      });
    }
  };

  const profile = data => {
    setSeller(value => {
      return {
        ...value,
        info: {
          ...value.info,
          profile: data,
        },
      };
    });
  };

  const sns = {
    url: (data, nowIndex) => {
      setSeller(value => {
        const filterData = value.sns.map((item, index) => {
          if (index !== nowIndex) return item;
          return {
            ...item,
            url: data,
          };
        });
        return {
          ...value,
          sns: filterData,
        };
      });
    },
    type: (data, nowIndex) => {
      setSeller(value => {
        const changeData = value.sns.map((item, index) => {
          if (index !== nowIndex) {
            return item;
          }
          return {
            ...item,
            type: data,
            // url: "",
          };
        });
        return {
          ...value,
          sns: changeData,
        };
      });
    },
    add: (type = "") => {
      setSeller(value => {
        const concatData = value.sns.concat({ type: type, url: "" });

        return {
          ...value,
          sns: concatData,
        };
      });
    },
    delete: nowIndex => {
      setSeller(value => {
        const filterData = value.sns.filter((option, index) => {
          return index !== nowIndex;
        });
        return {
          ...value,
          sns: filterData,
        };
      });
    },
  };

  const msg = data => {
    setSeller(value => {
      return {
        ...value,
        msg: data,
      };
    });
  };

  const inquiry = (name, data) => {
    setSeller(value => {
      return {
        ...value,
        inquiry: {
          ...value.inquiry,
          [name]: data,
        },
      };
    });
  };

  const business = (name, data) => {
    setSeller(value => {
      return {
        ...value,
        business: {
          ...value.business,
          [name]: data,
        },
      };
    });
  };
  const category = data => {
    setSeller(value => {
      return {
        ...value,
        category: [data],
      };
    });
  };

  return [seller, { publicId, bank, info, profile, msg, sns, inquiry, business, category }];
};

export const InputProfileImg = ({ seller, setSeller }) => {
  const profile = seller.info.profile;
  const [imgRate, setImgRate] = useState("width");
  const { getRootProps, getInputProps } = useDropzone({
    // accept: "image/*",
    accept: [".png", ".jpeg", ".jpg"],
    maxFiles: 1,
    onDrop: acceptedFiles => {
      let flag = [];
      const filterData = acceptedFiles.filter(value => value.size < 8000000);
      acceptedFiles.forEach(data => {
        flag = [];
        if (data.size > 8000000) {
          flag.push("size");
        }
        if (acceptedFiles.length >= 20) {
          flag.push("amount");
        }
      });
      if (flag.length > 0) {
        console.log("이미지를 저장 할 수 없습니다. 이미지는 최대 20장/8MB 이하로 올려주세요.");
      } else {
        const imgFile = filterData.map(file =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          })
        );
        let img = document.createElement("img");
        let blob = URL.createObjectURL(imgFile[0]);
        img.src = blob;
        img.onload = function () {
          let w = img.width;
          let h = img.height;
          if (h > w) {
            setImgRate("height");
          } else {
            setImgRate("width");
          }
        };
        setSeller.profile(imgFile[0]);
      }
    },
  });
  useEffect(() => {
    if (typeof profile === "string") {
      let newImg = document.createElement("img");
      newImg.src = `${process.env.REACT_APP_BASEURL_CDN}/${profile}`;
      newImg.onload = function () {
        let w = newImg.width;
        let h = newImg.height;
        if (h > w) {
          setImgRate("height");
        } else {
          setImgRate("width");
        }
      };
    }
  }, [profile]);

  return (
    <ScImageContainer className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {profile === "" ? (
          <img src={thumbnail} alt="이미지 에러" align="center" className="thumbnail" />
        ) : (
          <div>
            {imgRate === "width" ? (
              <div className="img-container">
                {typeof profile !== "string" ? (
                  <img
                    src={profile.url}
                    alt="이미지 에러"
                    align="center"
                    className="profile-width-img"
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_BASEURL_CDN}/${profile}`}
                    alt="이미지 에러"
                    align="center"
                    className="profile-width-img"
                  />
                )}
              </div>
            ) : (
              <div className="img-container">
                {typeof profile !== "string" ? (
                  <img
                    src={profile.url}
                    alt="이미지 에러"
                    align="center"
                    className="profile-height-img"
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_BASEURL_CDN}/${profile}`}
                    alt="이미지 에러"
                    align="center"
                    className="profile-height-img"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ScImageContainer>
  );
};
const ScImageContainer = styled.section`
  div {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    texta-align: center;
    justify-content: normal;
    padding: 0;
    .thumbnail {
      width: 100%;
      height: 100%;
    }
  }
  .profile-width-img {
    height: 120px;
  }
  .profile-height-img {
    width: 120px;
  }
`;

export const useProfileConfirm = seller => {
  const callAPI = useAPI();
  const [flag, setFlag] = useState([]);

  const flagInit = () => {
    return setFlag([]);
  };
  const uploadSeller = seller => {
    // 질문
    flagInit();
    if (seller.info.profile === "") setFlag([...flag, "profileImg"]);
    if (seller.publicId === "") setFlag([...flag, "publicId"]);
    if (seller.info.name === "") setFlag([...flag, "sellerId"]);
    if (seller.msg === "") setFlag([...flag, "msg"]);
    if (seller.category === "") setFlag([...flag, "category"]);
    if (seller.inquiry.time === "") setFlag([...flag, "inquiryTime"]);
    if (seller.inquiry.tel === "") setFlag([...flag, "inquiryTel"]);
    if (seller.bank.type === "") setFlag([...flag, "bankType"]);
    if (seller.bank.name === "") setFlag([...flag, "bankName"]);
    if (seller.bank.no === "") setFlag([...flag, "bankNo"]);
    if (seller.info.phone === "") setFlag([...flag, "Phone"]);
    if (flag.length > 0) {
      return;
    } else {
      console.log("success");
    }
    // const uploadSeller = callAPI({
    //   method: "post",
    //   url: `${process.env.REACT_APP_BASEURL}/user/seller`,
    //   loading: true,
    // });
  };
  return [uploadSeller, flag];
};
