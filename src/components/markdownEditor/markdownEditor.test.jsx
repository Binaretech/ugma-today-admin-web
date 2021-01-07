import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MarkDownEditor from "./markdownEditor.jsx";

test("should render without crash", () => {
  render(<MarkDownEditor />);
});

test("should change value", () => {
  const utils = render(<MarkDownEditor />);
  const textarea = utils.getByLabelText("markdown-field");
  const preview = utils.getByLabelText("markdown-preview");

  fireEvent.change(textarea, { target: { value: "# Hello world" } });

  expect(textarea.value).toBe("# Hello world");
  expect(preview.innerHTML).toBe("<h1>Hello world</h1>");
});
