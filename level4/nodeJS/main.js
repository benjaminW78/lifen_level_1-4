const WriteJsonFile = require('write-json-file')
const Moment = require('moment')

const WorkersStatus = require('./const_workers_status')
const DaysMultiplicators = require('./const_day_price_multiplicator')
const { workers: Workers, shifts: Shifts } = require('../data')
const outputPath = './dir/output.json'

async function main() {
    try {
        const workerMap = Workers.reduce((acc, item) => {
            acc[item.id] = item
            acc[item.id].price_per_shift = WorkersStatus[acc[item.id].status]
            return acc
        }, {})

        const workerPayload = []
        const commission = {
            pdg_fee: 0,
            interim_shifts: 0
        }

        Shifts.forEach((item) => {
            const userId = item.user_id
            const weekDay = Moment(item.start_date, 'YYYY-MM-DD').isoWeekday()

            if (!workerMap[userId]) {
                console.log(`warning worker with user_id ${userId} don't exist `)

                return
            }

            if (!workerPayload[userId]) {
                workerPayload[userId] = { id: userId }
            }

            if (!workerPayload[userId].price) {
                workerPayload[userId].price = 0
            }

            const priceToSum = workerMap[userId].price_per_shift * DaysMultiplicators[weekDay].multi
            workerPayload[userId].price += priceToSum

            commission.pdg_fee += (priceToSum * 5) / 100
            if (workerMap[userId].status === 'interim') {
                commission.interim_shifts += 1
                commission.pdg_fee += 80
            }
        })

        // add 5% sur chaques shift
        await WriteJsonFile(outputPath, {
            workers: workerPayload.filter(item => item !== null),
            commission
        })

        console.log('output.json successfully created')
    } catch (err) {
        console.log(err)
    }
}

main()