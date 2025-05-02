import NavbarButtons from "./navbar-buttons";
import Logo from "./logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavbarButtons />
        </div>
      </div>
    </nav>
  );
}
