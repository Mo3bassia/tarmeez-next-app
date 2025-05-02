import NavbarButtons from "./button/navbar-buttons";
import Logo from "./logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-sm bg-background/80 dark:bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavbarButtons />
        </div>
      </div>
    </nav>
  );
}
