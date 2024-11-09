'use client';

import useProfile from '@/hooks/useProfile';
import Image from 'next/image';
import Link from 'next/link';

import './Navbar.css';

const Navbar = () => {
  const { profile } = useProfile();

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <Link href="/" className="nav-logo">
          <Image src="/asset/logo.svg" alt="logo" width={250} height={140} />
        </Link>
        <div className="navbar-leftside">
          <Link href="/challen-log" className="nav-link">
            {'challen-log'}
          </Link>
          <Link href={profile?.accessToken ? '/profile' : '/login'} className="nav-link">
            {profile?.accessToken ? 'Profile ' : 'Sign in'}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
