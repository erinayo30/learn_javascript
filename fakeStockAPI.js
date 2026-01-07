
const stocks =[
{ name: "Apple Inc.", symbol: "AAPL", basePrice: 175.50 },
  { name: "Microsoft Corp.", symbol: "MSFT", basePrice: 330.20 },
  { name: "Google LLC", symbol: "GOOGL", basePrice: 135.75 },
  { name: "Amazon.com Inc.", symbol: "AMZN", basePrice: 145.80 },
  { name: "Tesla Inc.", symbol: "TSLA", basePrice: 170.25 },
  { name: "NVIDIA Corp.", symbol: "NVDA", basePrice: 425.50 },
  { name: "Meta Platforms", symbol: "META", basePrice: 485.15 }

]

// Track current stock index and previous price for continuity
let currentStockIndex = 0
let previousPrice= null

function generatePriceChange(basePrice){
    const changePercent = (Math.random() *4-2/100)
    return basePrice*(1 + changePercent)
}

export function getStockData(){
    return new Promise((resolve)=>{
        const delay= Math.random() *500

        setTimeout(()=>{
            const stock= stocks[currentStockIndex]
            const newPrice = generatePriceChange(stock.basePrice)
                
                // create the data object
                const stockData = {
                    name: stock.name,
                    symbol: stock.symbol,
                    price: parseFloat(newPrice.toFixed(2)),
                    timestamp: new Date().toISOString()
                }
                // update for next call
                previousPrice = newPrice
                currentStockIndex = (currentStockIndex +1)%stock.length

                resolve(stockData)
        }, delay)

    })
}

export function getStockBySymbol(symbol){
    return new Promise((resolve, reject)=>{
        const delay = Math.random() * 500

        setTimeout(()=>{
            const stock = stocks.find(s => s.symbol === symbol)

            if (!stock){
                reject(new Error(`stock with sybol ${symbol} not found`))
                return
            }
            const newPrice = generatePriceChange(stock.basePrice)

            const stockData = {
                    name: stock.name,
                    symbol: stock.symbol,
                    price: parseFloat(newPrice.toFixed(2)),
                    timestamp: new Date().toISOString()
                }
                resolve(stockData)
        }, delay)
    })
}