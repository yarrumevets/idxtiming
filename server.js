import express from "express";
const app = express();
const port = 3838;

// These are not already avaialable with ES modules.
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check line validity
// It just checks that the line starts with "timestamp:"
// Required format: timestamp: 00:00:00:000, filepos: 000000000
// ex regex:
// const timeFormatRegex = /^\d{2}:\d{2}:\d{2}:\d{3},$/; // HH:MM:SS:000, (including the comma).
const isValidLine = (line) => {
  const ln = line.trimStart();
  const hasTimestampLabel = ln.startsWith("timestamp:");
  return hasTimestampLabel;
};

// Get the time + offset (ms) and return it in the original strick format.
const getAdjustedTime = (rawTime, offset) => {
  // Get time in miliseconds.
  const [hr, min, sec, ms] = rawTime.split(":").map(Number);
  const totalTimeMs = ms + sec * 1000 + min * 60 * 1000 + hr * 60 * 60 * 1000;
  const updatedTimeMs = totalTimeMs + offset;

  // Negative times are impossible so just return 00:00:00:000,
  if (updatedTimeMs <= 0) {
    return "00:00:00:000,";
  }

  const newHr = Math.floor(updatedTimeMs / (60 * 60 * 1000));
  const remainingAfterHours = updatedTimeMs % (60 * 60 * 1000);
  const newMin = Math.floor(remainingAfterHours / (60 * 1000));
  const remainingAfterMinutes = remainingAfterHours % (60 * 1000);
  const newSec = Math.floor(remainingAfterMinutes / 1000);
  const newMs = remainingAfterMinutes % 1000;
  const formattedTime =
    String(newHr).padStart(2, "0") +
    ":" +
    String(newMin).padStart(2, "0") +
    ":" +
    String(newSec).padStart(2, "0") +
    ":" +
    String(newMs).padStart(3, "0");
  return formattedTime + ",";
};

// Process IDX file.
const processIdxFile = (data, offset) => {
  const lines = data.split(/\r?\n/); // Handles both \n and \r\n
  let newData = "";
  lines.forEach((line) => {
    if (isValidLine(line)) {
      const lineParts = line.trimStart().split(" ");
      const rawTimeString = lineParts[1].slice(0, -1); // remove the ','
      const newTimeString = getAdjustedTime(rawTimeString, offset);
      lineParts[1] = newTimeString;
      let newLine = `${lineParts[0]} ${newTimeString} ${lineParts[2]} ${lineParts[3]}`;
      newData = newData + newLine + "\n";
    } else {
      newData = newData + line + "\n";
    }
  });
  return newData;
};

// Process uploaded IDX File and return an updated version.
app.post("/upload", (req, res) => {
  const offset = parseInt(req.query.offset, 10) || 0;

  let fileData = "";
  req.on("data", (chunk) => {
    fileData += chunk;
  });

  req.on("end", () => {
    console.log("Offset:", offset);
    console.log("File Data:", fileData);

    const processedData = processIdxFile(fileData, offset);
    console.log("Processing IDX file complete!");
    res.setHeader("Content-Disposition", 'attachment; filename="updated.idx"');
    res.send(processedData);
  });
});

app.use("/", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Learning reference:

// Return a text file.
app.get("/textfiletest", (req, res) => {
  res.setHeader("Content-Disposition", 'attachment; filename="textfile.txt"');
  res.send("test text file.");
});

// POST text file and print the contents.
app.post("/uploadtest", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    console.log("Multipart Data:", data);
    res.send("File received!");
  });
});
