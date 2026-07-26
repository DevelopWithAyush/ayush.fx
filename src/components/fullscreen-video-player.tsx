"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X } from "lucide-react";

interface FullscreenVideoPlayerProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}

export function FullscreenVideoPlayer({
  videoUrl,
  isOpen,
  onClose,
}: FullscreenVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isClient = useIsClient();

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Keyboard navigation: Space to toggle play, Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, togglePlay]);

  // Autoplay video on load
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isOpen, videoUrl]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      videoRef.current.volume = 0.5;
      setVolume(0.5);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseMove={handleMouseMove}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl select-none overflow-hidden cursor-default"
        >
          {/* Backdrop Close click area */}
          <div className="absolute inset-0 z-0" />

          {/* Video Wrapper */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center p-4 md:p-8"
          >
            <video
              ref={videoRef}
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              onClick={togglePlay}
              className="w-full h-full object-contain rounded-lg shadow-2xl cursor-pointer"
              playsInline
            />

            {/* Floating Top Right Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all duration-200 z-30"
            >
              <X className="size-6" />
            </button>

            {/* Glassmorphic Custom Control Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl rounded-2xl bg-black/60 hover:bg-black/75 border border-white/15 px-6 py-4 backdrop-blur-xl shadow-2xl flex flex-col gap-3 z-20 transition-colors duration-300"
            >
              {/* Timeline Progress Bar */}
              <div className="flex items-center gap-4 w-full">
                <span className="text-xs text-white/80 font-mono">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  step="0.1"
                  onChange={handleSeek}
                  className="flex-1 h-1.5 rounded-full appearance-none bg-white/20 cursor-pointer accent-white hover:accent-purple-400 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <span className="text-xs text-white/80 font-mono">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Play/Pause, Volume, Fullscreen Buttons */}
              <div className="flex items-center justify-between w-full mt-1">
                <div className="flex items-center gap-5">
                  {/* Play Button */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-purple-400 transition-colors duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="size-6 fill-white" />
                    ) : (
                      <Play className="size-6 fill-white" />
                    )}
                  </button>

                  {/* Volume Section */}
                  <div className="flex items-center gap-2 group">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-purple-400 transition-colors duration-200"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="size-6" />
                    ) : (
                        <Volume2 className="size-6" />
                    )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-0 overflow-hidden group-hover:w-20 focus:w-20 h-1 rounded-full appearance-none bg-white/20 cursor-pointer accent-white transition-all duration-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-purple-400 transition-colors duration-200"
                >
                  {isFullscreen ? (
                    <Minimize className="size-6" />
                  ) : (
                    <Maximize className="size-6" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
