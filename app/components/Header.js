"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-gray-900 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="https://logos-world.net/wp-content/uploads/2023/02/LoL-Symbol.png" alt="Logo" className="w-12 text-white text-xl font-bold" />
            <span className="text-white text-xl font-bold ml-2">LOL Guide</span>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search champions..."
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
