const WriteJsonFile = require('write-json-file')

const WorkersStatus = require('./const_workers_status')
const { workers: Workers, shifts: Shifts } = require('../data')

async function main() {
    try {
        const outputPath = './dir/output.json'
        const workerMap = Workers.reduce((acc, item) => {
            acc[item.id] = item
            acc[item.id].price_per_shift = WorkersStatus[acc[item.id].status]
            return acc
        }, {})

        const payload = []

        Shifts.forEach((item) => {
            const userId = item.user_id
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
            payload[userId].price += workerMap[userId].price_per_shift

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