import Link from "next/link";

export default function Sidebar() {
  const navItems = [
    { href: "/champions", label: "Champions" },
    { href: "/items", label: "Items" },
    { href: "/strategies", label: "Strategies" },
    { href: "/tier-list", label: "Tier List" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-16 p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className="block p-2 hover:bg-gray-800 rounded transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 