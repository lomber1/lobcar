import { NavLink } from 'remix';
import { ClientOnly } from 'remix-utils';
import { MdMenu } from 'react-icons/md';
import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import DarkModeSwitch from '~/components/DarkModeSwitch';
import useOutsideAlerter from '~/hooks/useOutsideAlerter';
import LinkButton from '~/components/LinkButton';
import useCategory from '~/hooks/useCategory';

const routes = [
  { to: '/app/questions', title: 'Lista pytań' },
  { to: '/app/random', title: 'Losowe pytanie' },
  { to: '/app/exam', title: 'Egzamin' },
];

// TODO: Add category select button
const Navbar: React.FC = () => {
  const { selectedCategory } = useCategory();

  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = useCallback(() => setMobileMenuOpened(true), []);
  const handleMenuClose = useCallback(() => setMobileMenuOpened(false), []);

  useOutsideAlerter(drawerRef, handleMenuClose);

  return (
    <div className="shadow flex px-4 dark:bg-surface-dp2 transition duration-500">
      {/* Mobile hamburger menu */}
      <div className="flex items-center justify-center md:hidden">
        <MdMenu onClick={handleMenuOpen} className="text-3xl cursor-pointer" />
      </div>

      {/* Mobile drawer menu */}
      <div
        ref={drawerRef}
        className={clsx(
          'flex flex-col md:hidden absolute pt-4 bg-white dark:bg-surface-dp2 shadow top-0 left-0 h-screen w-64 transition 200',
          mobileMenuOpened && 'translate-x-0',
          !mobileMenuOpened && '-translate-x-64',
        )}
      >
        {routes.map((route) => (
          <NavLink
            key={`navlink-${route.to}`}
            to={route.to}
            className={({ isActive }) => clsx(
              'mx-2 px-4 py-2 font-bold rounded-lg transition',
              isActive && 'text-primary bg-primary/10',
              !isActive && 'text-gray-500 dark:text-gray-500 hover:text-gray-400',
            )}
            onClick={handleMenuClose}
          >
            {route.title}
          </NavLink>
        ))}
      </div>

      {/* Desktop navbar links */}
      <div className="hidden md:flex">
        {routes.map((route) => (
          <NavLink
            key={`navlink-${route.to}`}
            to={route.to}
            className={({ isActive }) => clsx(
              'p-4 font-bold transition',
              isActive && 'text-primary shadow-navlinkselected',
              !isActive && 'text-gray-500 dark:text-gray-500 hover:text-gray-400',
            )}
          >
            {route.title}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-1" />

      <ClientOnly fallback={null}>
        <div className="flex flex-row items-center mr-4">
          <span className="mr-2">Wybrana kategoria: </span>
          <LinkButton to="/app/category" variant="outlined">
            {selectedCategory ?? '?'}
          </LinkButton>
        </div>

        <DarkModeSwitch />
      </ClientOnly>

    </div>
  );
};

export default Navbar;
