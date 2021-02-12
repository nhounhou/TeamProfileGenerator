const fs = require('fs');
const { prompt } = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
let team = [];
let newMember = {};
function buildTeam(){
    prompt([
        {
            type: 'input',
            message: 'What is the Team Member\'s Name?',
            name: 'Name'
        },
        {
            type: 'input',
            message: 'What is the Team Member\'s Employee ID?',
            name: 'ID'
        },
        {
            type: 'input',
            message: 'What is the Team Member\'s Email Address?',
            name: 'Email'
        },
        {
            type: 'list',
            message: 'What is the Team Member\'s Position?',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'Position'
        },
    ]).then(reponse => {
        // console.log('First set of response: '+reponse);
        newMember['name']=reponse.Name;
        newMember['id']=reponse.ID;
        newMember['email']=reponse.Email;
        newMember['role']=reponse.Position;
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
        prompt([
            {
                type: 'input',
                message: `What is the Team Member\'s ${addInfo}`,
                name: 'Info'
            },
            {
                type: 'list',
                message: 'Do you want to add another Team Member?',
                choices: ['Yes', 'No'],
                name: 'moreMember'
            }
        ]).then(repondre => {
            //newMember[info]=repondre.Info;
            let myMember;
            switch (reponse.Position) {
                case 'Manager':
                    myMember = new Manager(newMember.name, newMember.id, newMember.email,repondre.Info);
                    break;
                case 'Engineer':
                    myMember = new Engineer(newMember.name, newMember.id, newMember.email,repondre.Info);
                    break;
                case 'Intern':
                    myMember = new Intern(newMember.name, newMember.id, newMember.email,repondre.Info);
                    break;
            }
            if (repondre.moreMember === 'Yes') {
                // console.log('adding:'+myMember);
                team.push(myMember);
                buildTeam();
            } else {
                // console.log('closing with:'+myMember);
                team.push(myMember);
                closeHTML();
            }
        });
        //team.push(reponse);

    });
    // console.log(team);
};

function addMember(member) {
    let mgrData=`<div class="row">
    
    `;
    let engData=`<div class="row">
    
    `;
    let intData=`<div class="row">
    
    `;

    for (i=0;i<member.length;i++){
        // console.log(member[i]);
        switch (member[i].getRole()) {
            case 'Manager':
                mgrData += `
        <div class='col'>
            <div class='manager1'>
                <p>${member[i].getName()}</p>
                <p><i class="fas fa-street-view"></i> manager</p>
            </div>
            <div class='content'>
                <p>Id: ${member[i].getId()}</p><hr>
                <p>Email: ${member[i].getEmail()}</p><hr>
                <p>Office #: ${member[i].getOfficeNumber()}</p>
            </div>
        </div>
    `            
                break;
            case 'Engineer':
                engData += `<div class='col-md-2'>
        <div class='engineer1'>
            <p>${member[i].getName()}</p>
            <p><i class="fas fa-calculator"></i> engineer</p>
        </div>
        <div class='content'>
            <p>Id: ${member[i].getId()}</p><hr>
            <p>Email: ${member[i].getEmail()}</p><hr>
            <p>Github : ${member[i].getGithub()}</p>
        </div>
    </div>
    `
                break;
            case 'Intern':
                intData += `<div class='col-md-2'>
        <div class='intern1'>
            <p>${member[i].getName()}</p()>
            <p><i class="fas fa-school"></i> intern</p>
        </div>
        <div class='content'>
            <p>Id: ${member[i].getId()}</p><hr>
            <p>Email: ${member[i].getEmail()}</p>()<hr>
            <p>School : ${member[i].getSchool()}</p>
        </div>
    `
                break;
        }
        
        //     
    };
    mgrData += `</div>
    
    `;
    engData += `</div>
    
    `;
    intData += `</div>
    
    `;

    fs.appendFileSync('./output/TeamProfile.html',mgrData);
    fs.appendFileSync('./output/TeamProfile.html',engData);
    fs.appendFileSync('./output/TeamProfile.html',intData);
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
    addMember(team);
    const HTMLdata = `</div>
</div>
<div class='footer'></div>
</body>
</html>`;

    fs.appendFileSync('./output/TeamProfile.html',HTMLdata);
};

startHTML();
