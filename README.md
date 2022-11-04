# HNG-CALCULATE-API-S2

* This is an API that takes an input, processes the payload and Send the data gotten.

* Backend is built with openAI and ExpressJs
* It takes an input
```json
{ 
    "operation_type": "addition",
    "x": 20, 
    "y": 42
}
```
or
```json
{ 
    "operation_type": "What is 20 + 42 please",
    "x": 0, 
    "y": 0
}
```
* **operation_type** can also be a text e.g *what's 20 + 42 ?*
* It sends response of status 200 as shown below
```json
{
    "slackUsername": "ucanthony",
    "result": 62,
    "operation_type": "addition"
}
```