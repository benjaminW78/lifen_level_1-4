const writeJsonFile = require('write-json-file')

const { workers: Workers, shifts: Shifts } = require('../data')
const outputPath = './dir/output.json'

async function main() {
    const payload = []

    try {
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

            if (!payload[userId]) {
                payload[userId] = { id: userId }
            }

            if (!payload[userId].price) {
                payload[userId].price = 0
            }

            payload[userId].price += workerMap[userId].price_per_shift
        })

        await writeJsonFile(outputPath, {
            workers: payload.filter(item => item !== null)
        })

        console.log('output.json successfully created')
    } catch (err) {
        console.log(err)
    }
}

main()