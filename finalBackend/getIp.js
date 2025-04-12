import express from 'express';
import os from 'os';

const app = express();
const PORT = 5001;

// Function to get active local IP
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1"; // Default to localhost
};

app.get("/get-ip", (req, res) => {
  res.json({ ip: getLocalIP() });
});

app.listen(PORT, () => console.log(`IP API running on port ${PORT}`));
 export default getLocalIP;