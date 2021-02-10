const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
let team=[];

function buildTeam(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the Team Member"s Name?',
            name: 'Name'
        },
        {
            type: 'input',
            message: 'What is the Team Member"s Employee ID?',
            name: 'ID'
        },
        {
            type: 'input',
            message: 'What is the Team Member"s Email Address?',
            name: 'Email'
        },
        {
            type: 'list',
            message: 'What is the Team Member"s Position?',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'Position'
        },
    ]).then(reponse => {
        let addInfo='';
        switch (reponse.Position) {
            case 'Manager':
                addInfo='Office Number?';
                break;
            case 'Engineer':
                addInfo='GitHub Username?';
                break;
            case 'Intern':
                addInfo='School Name?';
                break;
        }
        inquirer.prompt([
            {
                type: 'input',
                message: `What is the Team Member"s ${addInfo}`,
                name: 'Info'
            },
            {
                type: 'list',
                message: 'Do you want to add another Team Member?',
                choices: ['Yes', 'No'],
                name: 'moreMember'
            }
        ]).then(repondre => {
            let myMember;
            switch (reponse.Position) {
                case 'Manager':
                    myMember = new Manager(reponse.name, reponse.id,reponse.email,repondre.Info);
                    break;
                case 'Engineer':
                    myMember = new Engineer(reponse.name, reponse.id,reponse.email,repondre.Info);
                    break;
                case 'Intern':
                    myMember = new Intern(reponse.name, reponse.id,reponse.email,repondre.Info);
                    break;
            }
            if (repondre.moreMember === 'Yes') {
                addMember(myMember);
                buildTeam();
            } else {
                closeHTML();
            }
        });
        team.push(reponse);

    });
};

function addMember(member) {
    let HTMLdata;

    switch (member.getRole()) {
        case 'Manager':
            HTMLdata=`<div class="row">
    <div class='col'>
        <div class='manager1'>
            <p>${member.name}</p>
            <p><i class="fas fa-street-view"></i> manager</p>
        </div>
        <div class='content'>
            <p>Id: ${member.id}</p><hr>
            <p>Email: ${member.email}</p><hr>
            <p>Office #: ${member.getOfficeNumber()}</p>
        </div>
    </div>
</div>`            
            break;
        case 'Engineer':
            HTMLdata=`<div class='col-md-2'>
    <div class='engineer1'>
        <p>${member.name}</p>
        <p><i class="fas fa-calculator"></i> engineer</p>
    </div>
    <div class='content'>
        <p>Id: ${member.id}</p><hr>
        <p>Email: ${member.email}</p><hr>
        <p>Github : ${member.getGithub()}</p>
    </div>
</div>`
            break;
        case 'Intern':
            HTMLdata=`<div class='col-md-2'>
    <div class='intern1'>
        <p>${member.name}</p>
        <p><i class="fas fa-school"></i> intern</p>
    </div>
    <div class='content'>
        <p>Id: ${member.id}</p><hr>
        <p>Email: ${member.email}</p><hr>
        <p>School : ${member.getSchool()}</p>
    </div>
</div>`
            break;
    }
    
    fs.appendFileSync('./output/TeamProfile.html',HTMLdata);    
};

function startHTML() {
    const HTMLdata=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Team Profile Generator</title>
</head>
<body>
    <div class='header'>
        My Team
    </div>
    <div class='team'>`

    fs.writeFileSync('./output/TeamProfile.html',HTMLdata);

    buildTeam();
};

function closeHTML() {
const HTMLdata=`</div>
</div>
<div class='footer'></div>
</body>
</html>`;

fs.appendFileSync('./output/TeamProfile.html',HTMLdata);
};

startHTML();
