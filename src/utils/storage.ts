/**
 * Safe localStorage utility for PrepForge
 * Handles incognito mode, restricted iframes, quota limits, and corrupted data gracefully.
 */

const STORAGE_KEY = "prepforge_solved_questions";
const LEGACY_KEY = "dkoder_solved_questions";

// In-memory fallback if localStorage is disabled or throws SecurityError
let memoryStorageFallback: string[] = ["two-sum"];

/**
 * Checks whether localStorage is supported and writable in the current runtime environment
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__prepforge_storage_test__";
    window.localStorage.setItem(testKey, "ok");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely loads the array of solved question IDs.
 * Falls back to default starter list if storage is unavailable or corrupt.
 */
export function loadSolvedIds(): string[] {
  if (!isLocalStorageAvailable()) {
    return memoryStorageFallback;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_KEY);
    if (!raw) {
      return ["two-sum"];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      memoryStorageFallback = parsed;
      return parsed;
    }
    return ["two-sum"];
  } catch (error) {
    console.warn("Unable to parse solved questions from localStorage, using defaults.", error);
    return memoryStorageFallback;
  }
}

/**
 * Safely persists the array of solved question IDs.
 */
export function saveSolvedIds(ids: string[]): boolean {
  memoryStorageFallback = ids;

  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return true;
  } catch (error) {
    console.warn("Unable to persist solved questions to localStorage", error);
    return false;
  }
}
