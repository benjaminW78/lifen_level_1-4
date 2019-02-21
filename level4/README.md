# Level 4 result
## how to run the code

 - step 1 : install NodeJs >= 8.9.3
 - step 2 : run `npm i` 
 - step 3 : run `npm start`
 - step 4 : go check inside newly created directory `./dir/output.json`
 - step 5 (optionnal) : run unit test with `npm test`

## exercice Level 4

Our (fictional) business model is to price our service 5% of each shift.
In addition to that we also help hospitals to fill in unassigned shifts with interim workers.

An interim is paid 480 € per shift.
We also take a fixed fee of 80 € on each shift for which we provided an interim worker.

Adapt the price computation to take these new rules into account and to calculate our commission.