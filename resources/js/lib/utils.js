import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export function formatWord(name) {
//   return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
// }
export const formatWord = (word) => {
  if (!word || typeof word !== "string") {
      return ""; // Magbalik ng empty string kung undefined, null, o hindi string
  }
  return word.toLowerCase();
};

export function formatDateTime(isoString) {
  const date = new Date(isoString);
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", optionsDate);

  const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate}  ${formattedTime}`;
}

export function getAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
  }

  return age;
}
export function formatDob(isoString) {
  if (!isoString) return ""; // Handle empty or undefined input

  // Split the date manually to ensure proper parsing
  const [year, month, day] = isoString.split("-");

  // Check kung may tamang format (YYYY-MM-DD)
  if (!year || !month || !day) return "Invalid Date";

  // Create a new Date object
  const date = new Date(`${year}-${month}-${day}`);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

