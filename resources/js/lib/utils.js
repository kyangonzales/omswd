import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export const splitByTwentyChars = (text) => {
  if (!text) return "";

  if (text.length > 15) {
      return text.substring(0, 15) + "...";
  }

  return text;
};



export function getTimeGap(prevTimestamp, currentTimestamp) {
  const prevDate = new Date(prevTimestamp);
  const currentDate = new Date(currentTimestamp);
  const diffInSeconds = Math.floor((currentDate - prevDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 15) {
    return ""; // Do not display time if gap is less than 15 minutes
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`; // Show minutes if gap is between 15m to 59m
  } else if (diffInHours < 24) {
    return `${diffInHours}h`; // Show hours if gap is between 1h to 24h
  } else if (diffInDays === 1) {
    return "Yesterday"; // Show 'Yesterday' if gap is exactly 1 day
  } else {
    return currentDate.toLocaleString("en-US", {
      month: "short", // "Mar"
      day: "2-digit", // "10"
      year: "numeric", // "2025"
      hour: "2-digit", // "06"
      minute: "2-digit", // "26"
      hour12: true, // AM/PM format
    });
  }
}


export function hasTimeGap(prevTimestamp, currentTimestamp) {
  const prevDate = new Date(prevTimestamp);
  const currentDate = new Date(currentTimestamp);
  const diffInSeconds = Math.floor((currentDate - prevDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);

  return diffInMinutes >= 15; // Return true if the gap is 15 minutes or more
}



export function getMessengerTimestamp(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
      return "Just now";
  } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
      return "Yesterday";
  } else {
      return date.toLocaleString("en-US", {
          month: "short",  // "Mar"
          day: "2-digit",  // "10"
          year: "numeric", // "2025"
          hour: "2-digit", // "06"
          minute: "2-digit", // "26"
          hour12: true     // AM/PM format
      });
  }
}


export const formatLetter = (name) => {
  if (!name) return "N/A";
  return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

