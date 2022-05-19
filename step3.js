const fs = require('fs');
const axios = require('axios');


let originalFilePath;
let outputFilePath;



if (process.argv[2] == '--out') {
    originalFilePath = process.argv[4]
    outputFilePath = process.argv[3]
}
else {
    originalFilePath = process.argv[2]
}


function handleOutput(output) {
    if (outputFilePath) {
        fs.writeFile(outputFilePath, output, (err) => {

            console.log('file written')
        })
    }
    else {
        console.log(output)
    }
}


function cat(fileNamePath) {

    fs.readFile(fileNamePath, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${fileName} =>`, err.message);
            process.exit(1)
        }
        else {
            handleOutput(data)
        }
    })
}


async function webCat(url) {
    try {
        let res = await axios.get(url)
        if (res.status == '200') {
            handleOutput(res.data)
            
        }
        else {
            console.log(`Error with status code of ${res.status}`)
        }
    }
    catch (err) {
        console.log(`Wrong site url, error "${err.code}" was thrown`)
    }
}




if (originalFilePath.includes('http')) {
    webCat(originalFilePath)
}
else {
    cat(originalFilePath)
}





