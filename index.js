const fs = require('fs');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer')



const templateSource = fs.readFileSync('templates/index.handlebars', 'utf-8');
const css = fs.readFileSync('templates/css/output.css', 'utf-8');

const sampleJSON = fs.readFileSync('sample.json', 'utf-8');

const template = Handlebars.compile(templateSource);
generatePdf(template, css).then(r => console.log("done"));


async function generatePdf() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const jsonFile = JSON.parse(sampleJSON);
    jsonFile.css =  css;
    const content = template(jsonFile);
    await page.setContent(content);
    fs.writeFileSync('output.html', content);
    await page.pdf({ path: 'example.pdf', format: 'A4' });
    await browser.close();
}


class Invoice {
    constructor(name, isDisplayName, css) {
        this.name = name;
        this.isDisplayName = isDisplayName;
        this.css = css;
    }
}




