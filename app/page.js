"use client"
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen" style={{ 
      backgroundImage: "url('https://images8.alphacoders.com/128/1289648.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat" 
    }}>
      <div className="ml-4 mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black">League of Legends Guide</h1>
        <p className="text-xl text-gray-800">Your comprehensive resource for mastering the game</p>
        <div className="flex justify-start my-4">
          <div className="border-4 border-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              width="900"
              height="600"
              src="https://www.youtube.com/embed/hsffPST-x1k?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      </div>
    </main>
  );
}
