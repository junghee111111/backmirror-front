import Logo from "./logo";
import HeaderRightNav from "./header-right-nav";

export default function Header() {
  return (
    <header className="p-4 border-b border-zinc-300 flex items-center justify-between px-4">
      <Logo />
      <HeaderRightNav />
    </header>
  );
}
