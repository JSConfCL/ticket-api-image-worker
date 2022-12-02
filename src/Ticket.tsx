import React from "react";
import qr from "qr-pure-image";

import { halfJsconfSVG, jsconfSVG } from './svg'

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

export const Ticket = ({ username, ticketId, fullName, imageUrl }: Props) => {
  const svg = qr.svg(ticketId, 250);

  return (
    <div style={{ display: "flex", background: colors.jsconfBackground, padding: '1rem' }}>  <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxSizing: "border-box",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderWidth: 8,
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
            padding: "1rem",
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
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  marginRight: "1rem",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: colors.jsconfYellow,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 16,
                  fontFamily: "Koulen",
                  lineHeight: "1rem",
                  height: 30,
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
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: "Koulen",
                  lineHeight: "1rem",
                  verticalAlign: "center",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                {fullName || "SETEA TU NOMBRE 😱!"}
              </span>
            </div>
          </div>
          <div id="RIGHT_SIDE_CONTAINER" style={{ display: "flex" }}>
            <img src={jsconfAsBase64} width={45} height={45} />
          </div>
        </div>
        <div
          id="BODY"
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "row",
            lineHeight: "0.5em",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", }}>
            <h1
              style={{
                fontSize: 84,
                lineHeight: '84px',
                fontFamily: "Koulen",
                margin: 0,
                padding: 0,
                transform: "translateY(25px)"
              }}
            >
              JSCONF CHILE
            </h1>
            <h3 style={{ fontSize: 60, fontFamily: "Koulen", lineHeight: '60px', margin: 0, padding: 0, transform: "translateY(-25px)"}}>FEB.03-04</h3>
          </div>
          <div
            style={{
              display: "flex",
              width: 230,
              height: 230,
              justifyContent: "flex-start",
              alignItems: "flex-end",
              overflow: "hidden",
              top: '63px',
              left: '50px'
            }}
          >
          <img
            src={halfJsconfAsBase64}
            width={230}
            height={230}
          />
          </div>
        </div>
      </div>
    </div>
  );
};
