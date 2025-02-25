export const dateMonth = (myUgcXpHistory) => {
  const arr = myUgcXpHistory.split(","); // Convert to array
  const result = [];
  const today = new Date(); // Get today's date

  // Iterate through pairs
  for (let i = 0; i < arr.length; i += 2) {
    const dayOffset = parseInt(arr[i], 10); // Convert to integer
    const value = parseFloat(arr[i + 1]); // Convert to float

    // Calculate the date based on offset
    const date = new Date();
    date.setDate(today.getDate() + dayOffset); // Adjust date
    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    result.push({
      date: formattedDate, // Format as YYYY-MM-DD
      value: String(value),
    });
  }
  return result;
};
