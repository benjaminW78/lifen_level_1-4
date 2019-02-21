const WriteJsonFile = require('write-json-file')
const Moment = require('moment')

const WorkersStatus = require('./const_workers_status')
const DaysMultiplicators = require('./const_day_price_multiplicator')
const { workers: Workers, shifts: Shifts } = require('../data')
const outputPath = './dir/output.json'

async function main() {
    const payload = []

    try {
        const workerMap = Workers.reduce((acc, item) => {
            acc[item.id] = item
            acc[item.id].price_per_shift = WorkersStatus[acc[item.id].status]
            return acc
        }, {})

        Shifts.forEach((item) => {
            const userId = item.user_id
            const weekDay = Moment(item.start_date, 'YYYY-MM-DD').isoWeekday()

            if (!workerMap[userId]) {
                console.log(`warning worker with user_id ${userId} don't exist `)
                return
            }

            if (!payload[userId]) {
                payload[userId] = { id: userId }
            }

            if (!payload[userId].price) {
                payload[userId].price = 0
            }

            payload[userId].price += workerMap[userId].price_per_shift * DaysMultiplicators[weekDay].multi

        })

        await WriteJsonFile(outputPath, {
            workers: payload.filter(item => item !== null)
        })

        console.log('output.json successfully created')
    } catch (err) {
        console.log(err)
    }
}

main()