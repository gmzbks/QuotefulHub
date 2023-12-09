const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const backBtn = document.getElementById('back-quote')

let apiQuotes = [];
let quoteHistory = [];

// show new quote
function newQuote(){
// pick a random quote from apiQuotes array
const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// check if author field is blank and replace it with 'Unknown'
if (!quote.author){
    authorText.textContent = "Unknown";
} else {
    authorText.textContent = quote.author;
}

// check quote length to determine styling
if(quoteText.textContent > 120){
    quoteText.classList.add('long-quote')
} else {
    quoteText.classList.remove('long-quote')
}
quoteText.textContent = quote.text;

// add the current quote to history
quoteHistory.push({ text: quote.text, author: authorText.textContent });

}

/******************************************************************************************************/ 


// go back to the previous quote

function goBack() {
    // remove last quote from history
    const previousQuote = quoteHistory.pop();

    if (previousQuote) {
        quoteText.textContent = previousQuote.text;
        authorText.textContent = previousQuote.author;
    } else {
        // If there is no previous quote, fetch a new one
        newQuote();
    }
}

/******************************************************************************************************/ 

// get quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        // catch error here
    }
}

/******************************************************************************************************/ 

//tweet quote
function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(twitterUrl, '_blank');
}

/******************************************************************************************************/ 
 //event listeners
newQuoteBtn.addEventListener('click', newQuote )
twitterBtn.addEventListener('click', tweetQuote)
backBtn.addEventListener('click', goBack);
/******************************************************************************************************/
// on Load
getQuotes();