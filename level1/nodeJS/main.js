const Jsonfile = require('jsonfile')
const writeJsonFile = require('write-json-file')

const { workers: Workers, shifts: Shifts } = require('../data')

async function main() {
    try {
        const outputPath = './dir/output.json'
        const workerMap = Workers.reduce((acc, item) => {
            acc[item.id] = item
            return acc
        }, {})

        Shifts.forEach((item) => {
            const userId = item.user_id
            if (!workerMap[userId]) {
                console.log(`warning worker with user_id ${userId} don't exist `)
                return
            }
            if (!workerMap[userId].price) {
                workerMap[userId].price = 0
            }
            workerMap[userId].price += workerMap[userId].price_per_shift
            return workerMap[userId]
        })

        await writeJsonFile(outputPath, Workers.map(item => ({ id: item.id, price: item.price })))
        console.log('output.json successfully created')
    } catch (err) {
        console.log(err)
    }
}

main()