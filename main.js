window.onload = function() {
    const consoleIn = document.getElementById('console-in');
    const consoleText = document.getElementById('console-text');

    // Add a welcome message to the console on page load
    consoleText.innerHTML += 'Welkom bij Thijmen\'s console!<br> Type help en druk op enter om te beginnen <br>';

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
                consoleText.innerHTML += 'Beschikbare commands<br>help | Laat de help tekst zien<br>projects | Laat alle projecten zien<br>project -[naam] | Laat informatie over een bepaalde project zien <br> meer -[naam] |Laat meer nog meer informatie van een project zien<br> thijmen | Laat meer informatie over mij zien. <br>clear | Maak de console leeg<br> woord | Laat alle woorden uit het woorden boek zien <br> woord -[naam] | Laat informatie over een bebaald woord zien<br>' +
                    'Doelmatigheid | Een inspirerende quote. <br>';
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
                consoleText.innerHTML += ' Ik ben Thijmen, 16 jaar, en ik zit op De OSG Westfriesland in Hoorn ik ben nu bezig met vwo 4 met als profiel richting van N&G met O&O en informatica als je vragen hebt kan of meer informatie wilt weten, klik hier voor de e-mail addressen als je het over<a href="mailto:b136117@atlascollege.nl"> O&O en school</a> of <a href="mailto:Thijmen@groen5.nl">voor persoonelijke</a> zaken wilt hebben<br>'
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
                    consoleText.innerHTML += 'Verkeede command. Gebruik "project -[name]" om de informatie over een project met de naam te weertegeven <br>';
                }
                break;
            case 'woorden':
                const woorden = await getwoordenData();
                consoleText.innerHTML += 'Woorden:<br>';
                woorden.forEach(woord => {
                    consoleText.innerHTML += '* ' + woord.woord + '<br>'; // Display each project name with a '*'
                });
                break;
            case 'woord':
                subCommandw = commandParts.length > 1 ? commandParts[1] : null;
                if (subCommandw.startsWith('-')) {
                    const woordName = subCommandw.slice(1);
                    const woorden = await getwoordenData();
                    const woord = woorden.find(woord => woord.woord === woordName);
                    if (woord) {
                        consoleText.innerHTML += 'Woord: ' + woord.woord + '<br>';
                        consoleText.innerHTML += 'Betekenis: ' + woord.beschrijving + '<br>';
                    } else {
                        consoleText.innerHTML += 'Woord ' + woordName + ' not found.<br>';
                    }
                } else {
                    consoleText.innerHTML += 'Verkeede command. Gebruik "woord -[name]" om de informatie over een woord met de naam te weertegeven <br>';
                }
                break;
            case 'meer':
                const meerSubCommand = commandParts.length > 1 ? commandParts[1] : null;
                if (meerSubCommand && meerSubCommand.startsWith('-')) {
                    const projectName = meerSubCommand.slice(1);
                    const projects = await getProjectsData();
                    const project = projects.find(project => project.name === projectName);
                    if (project && project.descriptionl) {
                        document.querySelector('.meer-content').innerHTML = `${project.descriptionl} <button onclick="closeMeerScreen()" class="sluitbutton">X</button>`;
                        document.getElementById('meerScreen').style.display = 'block';
                    } else {
                        consoleText.innerHTML += 'Project ' + projectName + ' Niet gevonden of dit project heeft geen extra beschrijving nodig.<br>';
                    }
                } else {
                    consoleText.innerHTML += 'Incorrect command. Use "meer -[name]" to display extended information about a project.<br>';
                }
                break;
            case 'versie':
                consoleText.innerHTML += 'Dit is versie eeehhmmm????????? 0.1Alpha relase 5 build 42 "de mol is een mol"<br>';
                break;
            case 'doelmatigheid':
                consoleText.innerHTML += 'Doelmatigheid is een verhouding van hoe doelmatig je hebt gewerkt, 1:1 is dat je de tijd die je er in hebt gestop even veel er uit hebt gehaald bij.v 0,1:1 is heel slecht. <br> Alles is doelmatig, de hoeveelheid verschilt - S.Aken, O&O docent'
                break
            case 'hobbies':
                consoleText.innerHTML += 'Sommige van mijn hobbies zijn: Muziek spelen (trompet) Fietsen, (Natuur)Fotografie, Zwemmen en progameren<br>'
            default:
                consoleText.innerHTML += 'Commando niet gevonden. Type "help" voor een lijst met beschikbare commands<br>';
                break
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
async function getwoordenData(){
    const response = await fetch('woordenboek.json');
    const data = await response.text();
    try {
        const jsonDataW = JSON.parse(data);
        return jsonDataW;
    } catch (error) {
        console.log("Error parsing JSON data: ", error);
    }
}

function closeMeerScreen() {
    document.getElementById('meerScreen').style.display = 'none';
}
