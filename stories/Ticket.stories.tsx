import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Ticket } from "../src/Ticket";

export default {
  title: "Example/Header",
  component: Ticket,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Ticket>;

const Template: ComponentStory<typeof Ticket> = (args) => <Ticket {...args} />;

export const DefaultImage = Template.bind({});
DefaultImage.args = {
  username: "felipe",
  ticketId: "someId",
};
