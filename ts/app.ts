import express from 'express'
import {getLCOHData, getLCOH2Data, getData, getDataDetailed, readSimpleSheme, readSheme} from './services/sheetService'

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/getlcohdata', async (req, res) => {
    res.json(getLCOHData())
})

app.get('/getlcoh2data',async (req, res) => {
    res.json(getLCOH2Data())
})

app.get('/getcalcdata',async (req, res) => {
    res.json(getData())
})

app.get('/bar_charts',async (req, res) => {
    res.render('bar_charts', {
        labelsArrayLCOH1: getLCOHData().labels,
        labelsArrayLCOH2: getLCOH2Data().labels,
        colorsLCOH1: ["#2a5d6b", "#495f68", "#606164", "#736360", "#86645d", "#976659", "#a86655", "#b96751", "#c9674d", "#da6649", "#ea6544"],
        colorsLCOH2: ["#2a5d6b","#f05e1b"]
    })
})

app.get('/calc', async (req, res) => {
    res.render('calc', {
        calcData: getData().data
    })
})

app.get('/getcalcdatadetails/:id',async (req, res) => {
    const row_id = Number(req.params.id)
    const data_detailed = getDataDetailed(row_id - 1)
    const simpleSheme = readSimpleSheme(row_id) ?? []
    const sheme = readSheme(row_id) ?? []

    res.render('calc_details', {
        details: data_detailed,
        simpleSheme: simpleSheme,
        sheme: sheme
    })
})

app.get('/', async (req, res) => {
    res.render('index')
})



app.listen(port)