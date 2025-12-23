"use client";

import { useState } from "react";
import { ratePlugin } from "@/app/actions/rate";
import { ObsidianPlugin } from "@/lib/obsidian-api";

interface Props {
  plugin: ObsidianPlugin;
  ratingInfo?: { averageRating: number; totalRatings: number };
}

export default function PluginCard({ plugin, ratingInfo }: Props) {
  const [userRating, setUserRating] = useState(0);
  const [isRating, setIsRating] = useState(false);

  const handleRate = async (rating: number) => {
    setIsRating(true);
    setUserRating(rating);
    const result = await ratePlugin(plugin.id, rating);
    if (result.error) {
      alert(result.error);
      setUserRating(0);
    }
    setIsRating(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plugin.name}</h3>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {plugin.downloads?.toLocaleString()} downloads
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {plugin.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-500">Author: {plugin.author}</span>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                disabled={isRating}
                onClick={() => handleRate(star)}
                className={`w-5 h-5 ${(userRating || Math.round(ratingInfo?.averageRating || 0)) >= star
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                  } transition-colors`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-xs text-gray-500">
              ({ratingInfo?.totalRatings || 0})
            </span>
          </div>
        </div>

        <a
          href={`https://github.com/${plugin.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          GitHub →
        </a>
      </div>
    </div>
  );
}
