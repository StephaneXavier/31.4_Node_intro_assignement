const fs = require('fs');
const axios = require('axios');




async function webCat(url) {
    try {
        let res = await axios.get(url)
        if (res.status == '200') {
            console.log(res.data)
        }
        else {
            console.log(`Error with status code of ${res.status}`)
        }
    }
    catch (err) {
        console.log(`Wrong site url, error "${err.code}" was thrown`)
    }
}


function cat(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${fileName} =>`, err.message);
            process.exit(1)
        }
        console.log(data)
    })
}



if (process.argv[2].includes('http')) {
    webCat(process.argv[2])
}
else {
    cat(process.argv[2])
}





