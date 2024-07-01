window.onload = function() {
    const consoleIn = document.getElementById('console-in');
    const consoleText = document.getElementById('console-text');

    // Add a welcome message to the console on page load
    consoleText.innerHTML += 'Welkom bij Thijmen\'s console!<br> Type help om te beginnen <br>';

    consoleIn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            processCommand(consoleIn.value);
            consoleIn.value = '';
            consoleText.scrollTop = consoleText.scrollHeight;

        }
    });

    async function processCommand(command) {
        command = command.trim().toLowerCase(); // Normalize the command
        const commandParts = command.split(' '); // Split the command into parts
        const mainCommand = commandParts[0]; // The main command is the first part
        const subCommand = commandParts[1]; // The sub-command (if any) is the second part
        consoleText.innerHTML += '<span class="console-prefix">Thijmen@web:~: </span>' + command + '<br>';




        switch (mainCommand) {
            case 'help':
                consoleText.innerHTML += 'Beschikbare commands<br>help | Laat de help tekst zien<br>projects | Laat alle projecten zien<br>project -[naam] | Laat informatie over een bebaalde project zien<br>';
                break;
            case 'projects':
                const projects = await getProjectsData();
                consoleText.innerHTML += 'Projects:<br>';
                projects.forEach(project => {
                    consoleText.innerHTML += '* ' + project.name + '<br>'; // Display each project name with a '*'
                });
                break;
            case 'clear':
                consoleText.innerHTML = ''; // Clear the console text
                break;
            case 'thijmen':
                consoleText.innerHTML += '<br>> Ik ben Thijmen, 16 jaar, en ik zit op De OSG Westfriesland in Hoorn ik ben nu bezig met vwo 4 met als profiel richting van N&G met O&O en informatica als je vragen hebt kan of meer informatie wilt weten, klik hier voor <a href="mailto:b136117@atlascollege.nl">Voor O&O en school</a> en <a href="mailto:Thijmen@groen5.nl">voor persoonelijke</a> zaken'
                break
            case 'project':
                const subCommand = commandParts.length > 1 ? commandParts[1] : null;
                if (subCommand.startsWith('-')) {
                    const projectName = subCommand.slice(1); // Remove the '-' from the sub-command to get the project name
                    const projects = await getProjectsData();
                    const project = projects.find(project => project.name === projectName); // Find the project with the given name
                    if (project) {
                        consoleText.innerHTML += 'Project naam: ' + project.name + '<br><br>';
                        consoleText.innerHTML += 'Beschrijving: ' + project.description + '<br><br>';
                        consoleText.innerHTML += 'Status: ' + project.status + '<br>';
                    } else {
                        // If the project is not found, display an error message
                        consoleText.innerHTML += 'Project ' + projectName + ' not found.<br>';
                    }
                } else {
                    // If the sub-command does not start with '-', display an error message
                    consoleText.innerHTML += 'Verkeede command. Gebruik "project -<name>" om de informatie over een project met de naam te weertegeven <br>';
                }
                break;
            default:
                consoleText.innerHTML += 'Onbekend: ' + command + '. Type "help" voor een list van alle commands<br>';
        }
                    }
}



async function getProjectsData() {
    const response = await fetch('projects.json');
    const data = await response.text();
    try {
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.log("Error parsing JSON data: ", error);
    }
}