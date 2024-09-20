import { GiFruitBowl } from "react-icons/gi";

function Header() {
  return (
    <div className="flex items-center p-4">
      <GiFruitBowl className="text-3xl mr-4" />
      <h1 className="text-3xl font-mono font-bold">Products Management</h1>
    </div>
  );
}

export default Header;
