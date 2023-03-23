<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table id="people" >
        <tr>
            <td><h1>Full Name</h1></td>

        </tr>
    </table>
    <script>
        const xhr = (url, method = `GET`) => new Promise((resolve) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                resolve(this);
            }
        };
        xhttp.open(method, url);
        xhttp.send();
    });

       function createPersonRow (parsedPerson) {
            const content = `
                <tr>
                  <td>${parsedPerson.firstName} ${parsedPerson.lastName}</td> 
                </tr>
            `;

            return stringToNode(content);
       }

       function parsePerson (person) {
            const firstName = person.getElementsByTagName(`firstName`)[0].childNodes[0].nodeValue;
            const lastName = person.getElementsByTagName(`lastName`)[0].childNodes[0].nodeValue;

            return {firstName, lastName};
       }

        function stringToNode (content) {
        const template = document.createElement(`template`);
        const html = content.trim();
        template.innerHTML = html;
        return template.content.firstChild;
       }

       function displayData(xmlDoc) {
            const table = document.getElementById(`people`);
            const persons = xmlDoc.getElementsByTagName(`person`);
            for(let i=0; i< persons.length; i++) {
                const person = persons[i];
                const parsedPerson = parsePerson(person);
                const personElementRow = createPersonRow(parsedPerson);
                table.appendChild(personElementRow);
            }
        }
        fetch("people.xml")
            .then((data) => data.text())
            .then((data) => {
                const parser = new DOMParser();
                const parsed = parser.parseFromString(data, 'text/xml');
                displayData(parsed);
            });
    </script>
</body>
</html>