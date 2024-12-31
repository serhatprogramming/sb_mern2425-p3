import { render, screen } from "@testing-library/react";
import Note from "./Note";
import userEvent from "@testing-library/user-event";

test("should clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with userEvent",
    important: true,
  };
  const mockHandler = vi.fn();
  render(<Note note={note} toggleImportance={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("should renders content", () => {
  const note = {
    content: "Test content",
    important: true,
  };

  const { container } = render(<Note note={note} />);
  screen.debug();
  const div = container.querySelector(".note");
  expect(div).toHaveTextContent("Test content");
  screen.debug(div);
  const element = screen.getByText("Test content");
  screen.debug(element);
  expect(element).toBeDefined();
});
