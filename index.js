import{getStockData} from './fakeStockAPI.js'

let previousPrice= null

function renderStockTicker(stockData) {
    const stockDisplayName = document.getElementById('name')
    const stockDisplaySymbol = document.getElementById('symbol')
    const stockDisplayPrice = document.getElementById('price')
    const stockDisplayPriceIcon = document.getElementById('price-icon')
    const stockDisplayTime = document.getElementById('time')

// update text content
stockDisplayName.innerText= stockData.name
stockDisplaySymbol.innerText= stockData.symbol
stockDisplayPrice.innerText = `$${stockData.price.toFixed(2)}`
stockDisplayTime.innerText= new Date(stockData.timestamp).toLocaleTimeString()


if(previousPrice !== null){
  if(stockData.price> previousPrice){
    stockDisplayPriceIcon.innerText ='▲';
    stockDisplayPriceIcon.style.color= 'green'
  }
  else if (stockData.price< previousPrice){
    stockDisplayPriceIcon.innerText ='▼';
    stockDisplayPriceIcon.style.color= 'red'
  }
  else{
     stockDisplayPriceIcon.innerText ='▶';
    stockDisplayPriceIcon.style.color= 'gray'
  }
}

previousPrice= stockData.price
}


function updateStock(){
  getStockData().then(data=>{
    renderStockTicker(data)
  }).catch(err => console.error(err))
}

updateStock()
// update at interval

setInterval(updateStock,2000)