import ModeToggle from "../dropdown-toggle-menu";
import LoginButtons from "./login-buttons";

export default function NavbarButtons() {
  return (
    <div className="flex items-center gap-1.5">
      <ModeToggle />
      <LoginButtons />
    </div>
  );
}
