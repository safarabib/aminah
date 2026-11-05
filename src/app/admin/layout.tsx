import Link from "next/link";
import { LayoutDashboard, Book, Users, FileText, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-wider">AMINAH ADMIN</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg text-white">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/books" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <Book className="w-5 h-5" /> Bookstore
          </Link>
          <Link href="/admin/library" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <FileText className="w-5 h-5" /> Library & Blogs
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <Users className="w-5 h-5" /> Members
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <LogOut className="w-5 h-5" /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">Super Admin</span>
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs">SA</div>
          </div>
        </header>
        {/* Page Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}