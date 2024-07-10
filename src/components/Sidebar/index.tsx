import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/header-logo.webp';
import { FaHome } from 'react-icons/fa';
import { TbTheater, TbTicket } from 'react-icons/tb';
import { LuFilm } from 'react-icons/lu';
import { GiFilmSpool } from 'react-icons/gi';
import { MdPeople } from 'react-icons/md';
import { GoGift } from 'react-icons/go';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 px-8">
        <Link to="/">
          <img src={Logo} className="h-12 w-auto" alt="Logo" />
        </Link>
      </div>

      {/* Sidebar Links */}
      <div className="overflow-y-auto py-4 px-3">
        {/* Your sidebar links go here */}
        <SidebarLinkGroup
          title="Admin Panel"
          items={[
            {
              title: 'Dashboard',
              icon: <FaHome />,
              path: '/dashboard',
              active: pathname.startsWith('/dashboard'),
            },
            {
              title: 'Cinema',
              icon: <TbTheater />,
              path: '/cinema',
              active: pathname.startsWith('/cinema'),
            },
            {
              title: 'Film',
              icon: <LuFilm />,
              path: '/film',
              active: pathname.startsWith('/film'),
            },
            {
              title: 'Show',
              icon: <GiFilmSpool />,
              path: '/show',
              active: pathname.startsWith('/show'),
            },
            {
              title: 'Ticket',
              icon: <TbTicket />,
              path: '/ticket',
              active: pathname.startsWith('/ticket'),
            },
            {
              title: 'User',
              icon: <MdPeople />,
              path: '/user',
              active: pathname.startsWith('/user'),
            },
            {
              title: 'Voucher',
              icon: <GoGift />,
              path: '/voucher',
              active: pathname.startsWith('/voucher'),
            },
          ]}
        />
      </div>

      {/* Sidebar Footer */}
      <div className="flex items-center justify-center h-20 px-8">
        {/* Add any footer content */}
      </div>
    </aside>
  );
};

export default Sidebar;
