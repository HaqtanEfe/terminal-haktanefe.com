document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const terminal = document.querySelector(".terminal");
  const input = document.getElementById("commandInput");

  const bootMessages = [
    "Loading modules...",
    "Checking scripts...",
    "Initializing portfolio...",
    "Setting up terminal environment..."
  ];

  let messageIndex = 0;
  let charIndex = 0;

  function typeMessage() {
    if (messageIndex < bootMessages.length) {
      const currentMessage = bootMessages[messageIndex];

      // Create a new line for each message
      let line = loader.children[messageIndex];
      if (!line) {
        line = document.createElement("div");
        line.classList.add("line");
        loader.appendChild(line);
      }

      if (charIndex < currentMessage.length) {
        line.textContent = currentMessage.slice(0, charIndex + 1) + "|";
        charIndex++;
        setTimeout(typeMessage, 80);
      } else {
        line.textContent = currentMessage; // remove cursor after finished
        charIndex = 0;
        messageIndex++;
        setTimeout(typeMessage, 300); // short pause between messages
      }
    } else {
      // finished all messages, show terminal
      loader.style.display = "none";
      terminal.style.display = "flex";
      input.focus();
    }
  }

  typeMessage();
});


const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");

const commands = {
	 about: () => {
	  const aboutText = `Hi! I'm Haktan (HaqtanEfe), a Roblox developer with quite a lot of experience in scripting and game design.
	I specialize in creating systems and fully coded experiences within Roblox Studio.
	Some highlights of my Roblox work:
	- I have scripted games from scratch both in backend and frontend with millions of visits.
	- I have optimized game performances for studios with millions of visits.
	- I have developed easy to modify cosmetics systems.
	- I have developed multi-server lobby systems.
	- I have developed an ai system for cars to move around in an open world game.
	- I have developed custom building systems.
	- I have developed a free ugc project with a partner and more!
	My goal is to help groups / studios achive their goals for their game.
	For commision requests please reach out via Discord.`;

	  aboutText.split("\n").forEach(line => addLine(line));
	},

  skills: () => {
	  const skillsText = `Roblox Skills:
	- Scripting:
	  • Lua (Roblox Studio): Backend systems, frontend mechanics, GUI
	  • Server-client communication and replication
	- Systems & Game Mechanics:
	  • Multi-server lobby creation
	  • Custom building systems
	  • AI behavior for NPCs or vehicles
	  • Cosmetics and inventory systems
	  • Free UGC integration
	- Optimization:
	  • Performance tuning for high-traffic games
	  • Memory and server optimization
	- Tools & Workflows:
	  • Roblox Studio: Full game development
	  • Version control with Git
	  • Testing and debugging large projects
	- Collaboration & Project Management:
	  • Team collaboration on UGC projects
	  • Designing modular and reusable systems
	  • Client communication and commissions`;

	  skillsText.split("\n").forEach(line => addLine(line));
	},

  projects: () => {
  const projectList = [
    { visits: "82.3M", url: "https://rblx.games/12452509832", desc: "I had worked on the skin system and some small optimization stuff." },
    { visits: "25.0M", url: "https://rblx.games/71575927487690", desc: "I scripted the entire game." },
    { visits: "88.5K", url: "https://rblx.games/78172197449896", desc: "I scripted the entire game." },
    { visits: "18.3K", url: "https://rblx.games/6258962270", desc: "I scripted the first level and tv videos (before Roblox introduced videos)." },
    { visits: "9.5K", url: "https://rblx.games/14839350618", desc: "I scripted the entire game and it was mine and a partner's project." }
  ];

  addLine("Projects:");
  projectList.forEach(project => {
    const line = document.createElement("div");
    line.classList.add("line");

    const link = document.createElement("a");
    link.href = project.url;
    link.textContent = `(${project.visits}) ${project.url}`;
    link.target = "_blank";
    link.style.color = "#00ff7f"; // keep the terminal color
    link.style.textDecoration = "underline";

    line.appendChild(link);
    line.insertAdjacentText("beforeend", " " + project.desc);

    terminal.insertBefore(line, document.querySelector(".input-line"));
  });

  addLine("In total I contributed to 107.4M Visits!");
	},
  contact: () => {
    const contactText = `You can contact me from:
- Discord: HaqtanEfe
- Roblox: HaqtanEfe or Haktan0001
- Email: business@haktanefe.com`;
    contactText.split("\n").forEach(line => addLine(line));
  },
  help: () => {
  const commandList = Object.keys(commands).sort(); // alphabetical order
  addLine("Available commands: " + commandList.join(", "));
	},
	
	old: () => {
  addLine("Redirecting you to the old website..."); // optional message
  setTimeout(() => {
    window.location.href = "https://old-website.haktanefe.com";
  }, 200); // small delay to show the message before redirect
}

};

// function to append output lines
function addLine(text) {
  const line = document.createElement("div");
  line.classList.add("line");
  line.textContent = text;
  terminal.insertBefore(line, document.querySelector(".input-line"));
  terminal.scrollTop = terminal.scrollHeight;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim();

    // Clear previous outputs except the input line
    Array.from(terminal.children).forEach(child => {
      if (!child.classList.contains("input-line")) terminal.removeChild(child);
    });

    // Print the command line
    const line = document.createElement("div");
    line.classList.add("line");
    line.innerHTML = `<span class="prompt">HaqtanEfe@portfolio:~$ </span>${command}`;
    terminal.insertBefore(line, input.parentElement);

    // Clear the input
    input.value = "";

    // Run the command
    if (commands[command]) {
      commands[command]();
    } else if (command.length > 0) {
      addLine(`Command not found. Type 'help' for a list of commands.`);
    }

    // Scroll to bottom
    terminal.scrollTop = terminal.scrollHeight;
  }
});



