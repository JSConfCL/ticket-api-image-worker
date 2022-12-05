import React from "react";
import qr from "qr-pure-image";

import { halfJsconfSVG, jsconfSVG } from "./svg";

interface Props {
  username: string;
  ticketId: string;
  fullName: string | null;
  imageUrl: string | null;
}

const colors = {
  jsconfBackground: "#333",
  jsconfBlack: "#262626",
  jsconfYellow: "#F0E040",
  jsconfRed: "#F45B69",
  violetBlue: "#3A41A4",
  white: "#FFFFFF",
  black: "#000000",
};

const halfJsconfAsBase64 = "data:image/svg+xml;base64," + btoa(halfJsconfSVG);
const jsconfAsBase64 = "data:image/svg+xml;base64," + btoa(jsconfSVG);

const normalizedString = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const Ticket = ({ username, ticketId, fullName, imageUrl }: Props) => {
  const svg = qr.svg(ticketId, 250);

  return (
    <div
      style={{
        display: "flex",
        background: colors.jsconfBackground,
        padding: "1rem",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxSizing: "border-box",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 16px 48px",
          borderWidth: 16,
          color: colors.white,
          borderStyle: "solid",
          borderColor: colors.jsconfYellow,
          borderRadius: 0,
          fontFamily: "Inter",
          lineHeight: "1em",
          backgroundColor: colors.jsconfBackground,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          id="HEADER"
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            id="LEFT_SIDE_CONTAINER"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div id="IMAGE_CONTAINER" style={{ display: "flex" }}>
              <img
                src={imageUrl}
                style={{
                  height: "120px",
                  width: "120px",
                  borderRadius: "50%",
                  marginRight: "2rem",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: colors.jsconfYellow,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 32,
                  fontFamily: "Koulen",
                  lineHeight: "2rem",
                  height: 60,
                  verticalAlign: "center",
                  fontWeight: "bold",
                  color: colors.jsconfYellow,
                  margin: 0,
                }}
              >
                @{username}
              </span>
              <span
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  fontFamily: "Koulen",
                  lineHeight: "2rem",
                  verticalAlign: "center",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                {fullName ? normalizedString(fullName) : "SETEA TU NOMBRE 😱!"}
              </span>
            </div>
          </div>
          <div id="RIGHT_SIDE_CONTAINER" style={{ display: "flex" }}>
            <img src={jsconfAsBase64} width={90} height={90} />
          </div>
        </div>
        <div
          id="BODY"
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "row",
            lineHeight: "0.5em",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: 168,
                lineHeight: "168px",
                fontFamily: "Koulen",
                margin: 0,
                padding: 0,
                transform: "translateY(30px)",
              }}
            >
              JSCONF CHILE
            </h1>
            <h3
              style={{
                fontSize: 68,
                fontFamily: "Koulen",
                lineHeight: "60px",
                margin: 0,
                padding: 0,
                transform: "translateY(-30px)",
              }}
            >
              FEB.03-04 2023 | Santiago
            </h3>
          </div>
          <div
            style={{
              height: 340,
              width: 340,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              overflow: "hidden",
              top: "249px",
              left: "80px",
            }}
          >
            <img src={halfJsconfAsBase64} width={340} height={340} />
          </div>
        </div>
      </div>
    </div>
  );
};
