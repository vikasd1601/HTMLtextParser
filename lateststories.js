// first we need to fetch the HTML page so, we construct a function  
// below function name "page text" fetches HTML page data from Time.com and stores this in pagetext
async function pageText() {
    const r = await fetch('https://time.com');
    const pagetext = await r.text();
    // console.log(pagetext);
    return pagetext;
}

// this function 'SixLatestStories' find the latest 6 stories from our pagetext 
// store these 6 latest stories in "topSixStories" array 

function SixLatestStories(pagetext) {
    
    //On the website time.com the latest stories is defined in list form 
    // look like this --> <li class="latest-stories__item">
    //For this we create a regular expression 
    const re = /<li class="latest-stories__item">([\s\S]*?)<\/li>/gi;

    //Now find the matched text of regular expression in text   
    const matchedtext = pagetext.match(re);
    // console.log(matchedtext);

    //Create topsixstories array to store all the top 6 latest stories 
    const topSixStories = [];
    
    if(matchedtext) {
        // we go first 6 latest stories 

        for (let i = 0; i < Math.min(6, matchedtext.length); i++) { 
            // Extracting the title of item 
            // Regular expression for title 
            // item <h3 class="latest-stories__item-headline">UMG to Remove Music From TikTok</h3>
            const title_re = /<h3 class="latest-stories__item-headline">([\s\S]*?)<\/h3>/i;

            //find match with RE
            const titleMatch = matchedtext[i].match(title_re);
            let title= "";
            if(titleMatch){
                title= titleMatch[1].trim();
            }
            else{
                title= 'Title not found';
            }

             // same as links
            const link_RE = /<a href="([^"]*)">/i;
            const linkMatch = matchedtext[i].match(link_RE);

            let link= "https://time.com"; // in the links of items not cantain the starting 'https://time.com' so, we add it first
            if(linkMatch){
                link += linkMatch[1].trim();
            }
            else{
                link=  'Link not found';
            } 
            //Push the matched title and links 
            topSixStories.push({ title, link});
        };
    }

    return topSixStories;
}

async function getAPI() {
        const text = await pageText();
        const top_six = SixLatestStories(text);
        // object to json format
        console.log(JSON.stringify(top_six, null,3));    
}

//API call
getAPI();
