"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";

interface MusicPlayerProps {
  /** Name of the track without extension (e.g. "theme-stella"). null = silence. */
  track: string | null;
  /** Target playback volume 0..1. Default 0.55. */
  volume?: number;
  /** Crossfade duration in ms. Default 800. */
  fadeMs?: number;
}

/**
 * Simple crossfading music player. Keeps a single howl per track, fades
 * between them when `track` changes, and stops everything on unmount.
 *
 * Track files are expected at /audio/<track>.mp3. Loops by default.
 *
 * Usage:
 *   <MusicPlayer track={currentMusic} />                         // driven by ink store
 *   <MusicPlayer track="theme-title" />                          // static page
 *   <MusicPlayer track={null} />                                 // silence
 */
export default function MusicPlayer({
  track,
  volume = 0.55,
  fadeMs = 800,
}: MusicPlayerProps) {
  // Persist one howl per track across renders. Keyed by track name.
  const howlsRef = useRef<Record<string, Howl>>({});
  const currentRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = currentRef.current;
    const next = track;
    if (prev === next) return;
    currentRef.current = next;

    // Fade out the previous one
    if (prev) {
      const prevHowl = howlsRef.current[prev];
      if (prevHowl && prevHowl.playing()) {
        const v = prevHowl.volume();
        prevHowl.fade(typeof v === "number" ? v : volume, 0, fadeMs);
        // Stop after the fade finishes so it doesn't consume resources
        setTimeout(() => {
          try {
            prevHowl.stop();
          } catch {
            /* noop */
          }
        }, fadeMs + 50);
      }
    }

    // Fade in the new one
    if (next) {
      let howl = howlsRef.current[next];
      if (!howl) {
        howl = new Howl({
          src: [`/audio/${next}.mp3`],
          loop: true,
          volume: 0,
          html5: false,
        });
        howlsRef.current[next] = howl;
      }
      try {
        howl.volume(0);
        if (!howl.playing()) howl.play();
        howl.fade(0, volume, fadeMs);
      } catch {
        /* noop */
      }
    }
  }, [track, volume, fadeMs]);

  // On unmount: stop everything. Prevents music from bleeding across
  // route changes when a MusicPlayer instance goes away.
  useEffect(() => {
    const howls = howlsRef.current;
    return () => {
      for (const key of Object.keys(howls)) {
        try {
          howls[key].stop();
          howls[key].unload();
        } catch {
          /* noop */
        }
      }
    };
  }, []);

  return null;
}
