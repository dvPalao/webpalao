document.addEventListener('DOMContentLoaded', function() {
  // Get references to DOM elements
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var blurredBox = document.getElementById('blurred-box');

  // Initial terminal text content
  var terminalTextContent = [
      "Usuario: unknown",
      "IP: Loading...",
      "System: Loading...", // System information placeholder
      "Successful injection",
      "Press Enter..",
  ];
  var currentIndex = 0;

  // Pause background video
  videoBackground.pause();
  loadTrack(trackIndex);
  playTrack();
  
  // Function to type out terminal text
  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, 50);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners(); // Add event listeners when typing is done
              }
          }
      }

      typeChar();
  }


  // Handle key press event or touch event
  function handleInput() {
      // Hide terminal, play background video, and show blurred box
      terminalContainer.style.display = 'none';
      videoBackground.play();
      blurredBox.style.display = 'block';
      removeEventListeners(); // Remove event listeners after handling input
  }

  // Add event listeners for both key press and touch events
  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput); // For touch support
  }

  // Remove event listeners
  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput); // For touch support
  }

  // Handle key press event
  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }

  // Fetch IP address using API
  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          var ipAddress = data.ip;
          terminalTextContent[1] = "IP: " + ipAddress;
          typeWriter();
      })
      .catch(error => {
          console.error('Error fetching IP address:', error);
          terminalTextContent[1] = "IP: Unable to fetch IP address";
          typeWriter();
      });

  // Extract system information from user agent
  var userAgent = navigator.userAgent;
  var systemInfo;
  
  // Function to get the operating system name based on user agent
  function getOperatingSystem() {
      if (userAgent.match(/Windows/)) {
          // Windows OS detected
          return getWindowsVersion();
      } else if (userAgent.match(/Macintosh/)) {
          // macOS detected
          return getMacOSVersion();
      } else if (userAgent.match(/Linux/)) {
          // Linux OS detected
          return "Linux";
      } else if (userAgent.match(/Android/)) {
          // Android OS detected
          return getAndroidVersion();
      } else if (userAgent.match(/iPhone|iPad|iPod/)) {
          // iOS detected
          return getiOSVersion();
      } else {
          // Default to "Unknown" if system information cannot be determined
          return "Unknown";
      }
  }
  
  // Function to map Windows version numbers to their corresponding releases
  function getWindowsVersion() {
      var version = userAgent.match(/Windows NT ([\d.]+)/);
      if (version) {
          version = version[1];
          switch (version) {
              case "5.1":
                  return "Windows XP";
              case "6.0":
                  return "Windows Vista";
              case "6.1":
                  return "Windows 7";
              case "6.2":
                  return "Windows 8";
              case "6.3":
                  return "Windows 8.1";
              case "10.0":
                  return "Windows 10";
              case "10.0":
                  return "Windows 11";
              default:
                  return "Windows";
          }
      } else {
          return "Windows";
      }
  }
  
  // Function to get the macOS version
  function getMacOSVersion() {
      var version = userAgent.match(/Mac OS X ([\d_]+)/);
      if (version) {
          // Replace underscores with dots for macOS version
          version = version[1].replace(/_/g, '.');
          return "macOS " + version;
      } else {
          return "macOS";
      }
  }
  
  // Function to get the Android version
  function getAndroidVersion() {
      var version = userAgent.match(/Android ([\d.]+)/);
      if (version) {
          return "Android " + version[1];
      } else {
          return "Android";
      }
  }
  
  // Function to get the iOS version
  function getiOSVersion() {
      var version = userAgent.match(/OS ([\d_]+)/);
      if (version) {
          // Replace underscores with dots for iOS version
          version = version[1].replace(/_/g, '.');
          return "iOS " + version;
      } else {
          return "iOS";
      }
  }
  
  // Get the operating system information
  var operatingSystem = getOperatingSystem();
  terminalTextContent[2] = "System: " + operatingSystem;

  // Center the terminal window on the screen
  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  // Center the terminal initially and on window resize
  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  // Center the ASCII art within the terminal window
  terminalText.style.textAlign = 'center';

  // Function to generate ASCII art
  function getAsciiArt() {
      return `
      ____ ____ ____ ____ ____
      ||P |||A |||L |||A |||O ||
      ||__|||__|||__|||__|||__||
     ----------------------------
  `;
  }


});
