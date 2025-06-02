"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

import { GiBigWave } from "react-icons/gi";
import { motion } from "framer-motion";

const playlist = [
  { src: "/audio/audio-machine-path-to-freedom.mp3" },
  { src: "/audio/The-Yellow-Heaven.mp3" },
  { src: "/audio/epic-saga.mp3" },
  { src: "/audio/guardians-at-the-gates.mp3" },
  { src: "/audio/heroic-song.mp3" },
  { src: "/audio/lost-raiders.mp3" },
  { src: "/audio/Twelve-Titans-Music_Act-Of-Will.mp3" },
  { src: "/audio/Twelve-Titans-Music_Protect-Us-From-Evil.mp3" },
  { src: "/audio/Victory-Epic-Remix.mp3" },
  { src: "/audio/Descent-Into-Cerberon.mp3" },
  { src: "/audio/main-theme-samanosuke.mp3" },
  { src: "/audio/we-rise.mp3" },
];

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format time to mm:ss
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Update currentTime and duration
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  // Handle track change and play/pause
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack].src;
      audioRef.current.load(); // Ensure new track loads
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  // Auto-play on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-950/50 rounded-lg border border-yellow-500/50 text-white max-w-xs sm:max-w-md hover:bg-gray-900/70 transition-all duration-300">
      <button
        onClick={handlePrevious}
        className="p-1 sm:p-2 bg-blue-700/50 rounded-full hover:bg-blue-600/70 transition-all duration-200"
      >
        <FaBackward size={12} className="sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={togglePlay}
        className="p-1 sm:p-2 bg-blue-700/50 rounded-full hover:bg-blue-600/70 transition-all duration-200"
      >
        {isPlaying ? (
          <FaPause size={12} className="sm:w-4 sm:h-4" />
        ) : (
          <FaPlay size={12} className="sm:w-4 sm:h-4" />
        )}
      </button>
      <button
        onClick={handleNext}
        className="p-1 sm:p-2 bg-blue-700/50 rounded-full hover:bg-blue-600/70 transition-all duration-200"
      >
        <FaForward size={12} className="sm:w-4 sm:h-4" />
      </button>
      <motion.div
        animate={
          isPlaying
            ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }
            : { scale: 1, opacity: 0.7 }
        }
        transition={
          isPlaying ? { repeat: Infinity, duration: 1 } : { duration: 0.2 }
        }
      >
        <GiBigWave
          size={16}
          className={
            isPlaying
              ? "text-yellow-500 sm:w-5 sm:h-5"
              : "text-gray-400 sm:w-5 sm:h-5"
          }
        />
      </motion.div>
      <div className="flex items-center gap-2 flex-grow">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:bg-yellow-500
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:hover:bg-yellow-400
            [&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:h-3
            [&::-moz-range-thumb]:bg-yellow-500
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:hover:bg-yellow-400"
        />
        <span className="text-xs sm:text-sm text-gray-200 whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <audio ref={audioRef} onEnded={handleEnded} loop={false} />
    </div>
  );
};

export default AudioPlayer;
