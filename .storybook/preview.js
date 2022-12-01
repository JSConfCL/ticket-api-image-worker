import * as Constrants from "../src/constants";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

console.log({ Constrants });
export const decorators = [
  (Story) => (
    <div
      style={{
        width: Constrants.TicketWidth,
        height: Constrants.TicketHeight,
        margin: "1rem",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "lightgray",
        display: "flex",
        flexShrink: 0,
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      <Story />
    </div>
  ),
];
