'use client';
import { MdMenu } from 'react-icons/md';

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <header className="bg-[#ffffff] border-b border-gray-200 sticky top-0 lg:top-2 z-10 lg:m-2 lg:ms-4 lg:rounded-xl">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <MdMenu className="w-6 h-6" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              HealthCare System
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}
