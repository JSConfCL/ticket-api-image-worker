import React from "react";
import qr from "qr-pure-image";

import { halfJsconfSVG, jsconfSVG } from './svg'

interface Props {
  username: string;
  ticketId: string;
  fullName: string | null;
  imageUrl: string | null;
  ticketName?: string;
  ticketType?: string;
  ticketDescription?: string;
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

const normalizedString = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const Ticket = ({ username, ticketId, fullName, imageUrl, ticketName = 'JSConf Chile', ticketType = 'jsconf', ticketDescription }: Props) => {
  const theme = {
    jsconf: {
      color: "white",
      altColor: "#F0E040",
      bgColor: "#1E2019",
      logoColor: "white",
      halfIcon: halfJsconfSVG('#000'),
      icon: jsconfSVG('#F0E040'),
      primaryFontSize: 84,
      secondaryFontSize: 34,
    },
    workshop: {
      color: "white",
      altColor: "#F0E040",
      bgColor: "#000",
      logoColor: "white",
      halfIcon: halfJsconfSVG('#fff'),
      icon: jsconfSVG('#F0E040'),
      primaryFontSize: 84,
      secondaryFontSize: 20,
    },
    meetup: {
      color: "#333",
      altColor: "#F45B69",
      bgColor: "white",
      logoColor: "#333",
      halfIcon: halfJsconfSVG('#333'),
      icon: jsconfSVG('#F45B69'),
      primaryFontSize: 60,
      secondaryFontSize: 34,
    },
  }[ticketType];

  const svg = qr.svg(ticketId, 250);

  return (
    <div style={{ display: "flex", background: theme.bgColor, padding: '1rem' }}>  <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxSizing: "border-box",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderWidth: 8,
          color: theme.color,
          borderStyle: "solid",
          borderColor: theme.altColor,
          borderRadius: 0,
          fontFamily: "Inter",
          lineHeight: "1em",
          backgroundColor: theme.bgColor,
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
                  borderColor: theme.altColor,
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
                  color: theme.altColor,
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
                {fullName ? normalizedString(fullName) : "SETEA TU NOMBRE 😱!"}
              </span>
            </div>
          </div>
          <div id="RIGHT_SIDE_CONTAINER" style={{ display: "flex" }}>
            <img src={theme.icon} width={45} height={45} />
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
                fontSize: theme.primaryFontSize,
                lineHeight: '80px',
                fontFamily: "Koulen",
                margin: 0,
                padding: 0,
                transform: "translateY(30px)"
              }}
            >
              {ticketName}
          </h1>
          <h3 style={{ fontSize: theme.secondaryFontSize, fontFamily: "Koulen", lineHeight: '60px', margin: 0, padding: 0, transform: "translateY(-30px)"}}>{ticketType === 'meetup' || ticketType === 'workshop' ? ticketDescription : 'FEB.03-04 2023 | Santiago'}</h3>


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
            src={theme.halfIcon!}
            width={230}
            height={230}
          />
          </div>
        </div>
      </div>
    </div>
  );
};
