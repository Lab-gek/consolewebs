window.onload = function() {
    const consoleIn = document.getElementById('console-in');
    const consoleText = document.getElementById('console-text');

    // Add a welcome message to the console on page load
    consoleText.innerHTML += 'Welcome to Thijmen\'s console!<br>';

    consoleIn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            processCommand(consoleIn.value);
            consoleIn.value = '';
        }
    });

    async function processCommand(command) {
        command = command.trim().toLowerCase(); // Normalize the command
        const commandParts = command.split(' '); // Split the command into parts
        const mainCommand = commandParts[0]; // The main command is the first part
        const subCommand = commandParts[1]; // The sub-command (if any) is the second part
        const maxLines = 100; // Maximum number of lines to display in the console



        switch (mainCommand) {
            case 'help':
                consoleText.innerHTML += 'Beschikbare commands<br>help - Laat de help tekst zien<br>projects - List all projects<br>project -<name> - Display information about the project with the given name<br>';
                break;
            case 'projects':
                const projects = await fetch('data.json').then(response => response.json()); // Fetch the projects from the data.json file
                consoleText.innerHTML += 'Projects:<br>';
                projects.forEach(project => {
                    consoleText.innerHTML += '* ' + project.name + '<br>'; // Display each project name with a '*' in front
                });
                break;
            case 'project':
                if (subCommand.startsWith('-')) {
                    const projectName = subCommand.slice(1); // Remove the '-' from the sub-command to get the project name
                    const projects = await fetch('data.json').then(response => response.json()); // Fetch the projects from the data.json file
                    const project = projects.find(project => project.name === projectName); // Find the project with the given name
                    if (project) {
                        consoleText.innerHTML += 'Project Name: ' + project.name + '<br>';
                        consoleText.innerHTML += 'Description: ' + project.description + '<br>';
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