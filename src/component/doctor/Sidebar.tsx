'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard } from 'react-icons/md';
import { GiHealthNormal } from "react-icons/gi";
import { MdCoPresent } from "react-icons/md";
import { MdOutlineHistoryEdu } from "react-icons/md";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`w-56 lg:m-2 rounded-xl bg-[#44566a] text-white fixed left-0 top-0 bottom-0 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold ps-3">
            <GiHealthNormal className="inline mr-2" />
            HealthCare
          </h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {/* All Posts */}
          <Link
            href="/doctor"
            onClick={isOpen ? onClose : undefined}
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-gray-700 transition-colors"
            style={{
              backgroundColor: isActive('/') ? '#4B5563' : 'transparent',
            }}
          >
            <MdDashboard className="w-5 h-5 flex-shrink-0" />
            <span>My Profile</span>
          </Link>

          {/* Categories */}
          <Link
            href="/doctor/appointment"
            onClick={isOpen ? onClose : undefined}
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-gray-700 transition-colors"
            style={{
              backgroundColor: isActive('/doctor/appointment')
                ? '#4B5563'
                : 'transparent',
            }}
          >
            <MdCoPresent className="w-5 h-5 flex-shrink-0" />
            <span>Appointments</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
