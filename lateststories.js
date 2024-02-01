// first we need to fetch html page so, we construct a function  
// below function name "fetchtmlpage" fetch HTML page data from Time.com and store this in pagetext
async function pageText() {
    const r = await fetch('https://time.com');
    const pagetext = await r.text();
    // console.log(pagetext);
    return pagetext;
}

// this function 'SixLatestStories' find the latest 6 stories from owr pagetext 
// store this 6 latest stories in "topSixStories" array 

function SixLatestStories(pagetext) {
    
    // In the website time.com there latest stories is define in list form 
    // look like this --> <li class="latest-stories__item">
    // for this we create a regular expression 
    const re = /<li class="latest-stories__item">([\s\S]*?)<\/li>/gi;

    // now find the matched text of regular expression in text   
    const matchedtext = pagetext.match(re);
    // console.log(matchedtext);

    // create topsixstories array to store all top 6 latest stories 
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
            // push the mathed title and links 
            topSixStories.push({ title, link});
        };
    }

    return topSixStories;
}

async function getAPI() {
        const text = await pageText();
        const top_six = SixLatestStories(text);
        // objrect to json format
        console.log(JSON.stringify(top_six, null,3));    
}

//API call
getAPI();
