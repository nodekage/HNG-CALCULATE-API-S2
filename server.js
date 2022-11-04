const express = require('express')
require('dotenv').config()
const { evaluate } = require('./aiconfig')


const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req,res) => {
    res.status(200).send("Script is Running")
})


app.post('/execute' , async (req,res) => {
    let operation = String(req.body.operation_type).toLowerCase()
    let x = (req.body.x)
    let y = (req.body.y)

    try {
        // check if the payload is without technicalities

        if (operation == 'addition' || 
            operation == 'subtraction' ||
            operation == 'multiplication' ||
            operation == 'division' ||
            operation == 'add' ||
            operation == 'subtract' ||
            operation == 'multiply' ||
            operation == 'divide' 
            ){
                let result;

                if (operation == undefined || x == undefined || y == undefined ){
                    return res.status(406)
                }

                if (operation == 'addition' || 'add') result = x + y ;
                else if (operation == 'subtraction' || 'subtract') result = Math.round(x - y)
                else if (operation == 'multiplication' || 'multiply') result = Math.round(x * y)
                else if (operation == 'division' || 'divide') result = parseFloat(x / y).toFixed(2)

                res.status(200).json({
                    slackUsername: 'ucanthony',
                    result: result,
                    operation_type: operation
                })


            }else {
                let exec;

                let answer = await evaluate(operation.replace('x', x).replace('y', y))
                let first_number = parseInt(operation.replace('x', x).replace('y', y).replace(/\D/g,' z ').match(/\d+/g)?.[0])
                let second_number = parseInt(operation.replace('x', x).replace('y', y).replace(/\D/g,' z ').match(/\d+/g)?.[1])

                if(Math.round(first_number + second_number) == Math.round(answer)) exec = 'addition' || 'add'
            else if(Math.round(first_number - second_number) == Math.round(answer)) exec = 'subtraction' || 'subtract'
            else if(Math.round(second_number - first_number) == Math.round(answer)) exec = 'subtraction' || 'subtract'
            else if(Math.round(first_number * second_number) == Math.round(answer)) exec = 'multiplication' || 'multiply'
            else if(Math.round(first_number / second_number) == Math.round(answer)) exec = 'division' || 'divide'
            else if(Math.round(second_number / first_number) == Math.round(answer)) exec = 'division' || 'divide'
            else exec = operation

            res.status(200).json({
                slackUsername: 'ucanthony',
                result: parseFloat(answer),
                operation_type: exec

            })
            }
    }catch (err){
        console.log(err)
        res.status(500).send('unable to perform operation')

    }
})

app.listen(PORT, () => [
    console.log('server is listening on', PORT) 
])