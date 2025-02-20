export const calculateTimeRemaining = (epochStartTime = 0, epochEndTime) => {
  const now = Date.now();
  const endEpochTime = epochEndTime * 1000;
  const startEpochTime = epochStartTime * 1000;
  const totalDuration = endEpochTime - startEpochTime;
  const timeRemaining = endEpochTime - now;
  if (timeRemaining <= 0) {
    return { message: "Time is up!", percentage: 0 };
  }

  const percentageRemaining = ((timeRemaining / totalDuration) * 100).toFixed(
    2
  );

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    percentage: Number(percentageRemaining),
  };
};

export const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1_000_000) {
    return Math.floor(num / 1000) + "K";
  } else if (num < 1_000_000_000) {
    return Math.floor(num / 1_000_000) + "M";
  } else if (num < 1_000_000_000_000) {
    return Math.floor(num / 1_000_000_000) + "B";
  } else {
    return Math.floor(num / 1_000_000_000_000) + "T";
  }
};

export const truncateWalletAddress = (str) => {
  console.log(`str => ${str}`);
  if (str.length <= 10) {
    return str;
  }
  return `${str.slice(0, 8)}......${str.slice(-8)}`;
};

export const truncateTextWithEllipsis = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};
