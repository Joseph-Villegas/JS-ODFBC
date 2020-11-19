const https = require('https'); 


/**
 * Searches for books of a matching title using a third party  API
 * @param {String} title
 * @returns Promise
 */
function searchByTitle(title) {
    title = title.replace(/\s+/g,'+');
    const url = `https://openlibrary.org/search.json?title=${title}`;
    return new Promise((resolve, reject) => {
        const request = https.request(url, (response) => {
            let data = ''; 
            response.on('data', (chunk) => { 
                data += chunk.toString(); 
            }); 
          
            response.on('end', () => {  
                if (response.statusCode != "200") {
                    reject("Call to api end point has failed with response code " + res.statusCode);
                } else {
                    try {
                        const body = JSON.parse(data);
                        resolve(body);
                    } catch (e) {
                        reject('Error parsing JSON!');
                    }
                }
            }); 

            response.on('error', (error) => { 
                reject(error);
            });
        });

        request.end();
    });
}

module.exports.searchByTitle = searchByTitle;