
import { spawn } from 'child_process';
import * as commander from 'commander';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as tempy from 'tempy';
import { promisify } from 'util';
import * as inquirer from 'inquirer';
const UI = require('console-ui');
import * as gitDownload from 'download-git-repo';
const logSymbols = require('log-symbols');

const collect = (val: any, memo: any[]) => memo.concat(val);
const last = (val: any) => val;

commander
    .option('-i, --input [value]', 'Apib source files', collect, [])
    .option('-o, --output [value]', 'Output folder', last, './docs-output')
    .option('--tempDir [value]', 'Temp directory', last, tempy.directory())
    .parse(process.argv);

export interface Options {
    input: string[];
    output: string;
    tempDir: string;
}

export default async function docs(args: any[], options: Options) {
    const ui = new UI({
        inputStream: process.stdin,
        outputStream: process.stdout,
        errorStream: process.stderr,
        writeLevel: 'INFO',
        ci: false,
    });
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'Which kind of project you want to create?',
            choices: [
                'Backend API',
                'Node package',
            ],
            filter:(val: string) => val.toLowerCase(),
        },
    ];
    const answers = await ui.prompt(questions);
    let repo;
    const repoPath = './ttt';
    switch (answers.type) {
        case 'backend api':
            repo = 'direct:git@gitlab.ack.ee:Ackee/node-template.git';
            break;
        case 'node package':
            repo = 'github:AckeeCZ/package-template';
            break;
        default: break;
    }
    // console.log({answers, repo});
    if (repo) {
        ui.startProgress('cloning repo...');
        // await promisify(gitDownload)(repo, repoPath, { clone: true });
        ui.stopProgress();
        ui.write(logSymbols.success);
        ui.writeInfoLine(' Repo cloned!');
    }

    ui.writeInfoLine(`Repo cloned! 🎉\nYou can find it here: ${repoPath}`);
}
