# Project specifications
- Create an alias for a url
- POST
    - Implement a POST request endpoint (/url) that receives a URL through a parameter called "url".
    - Generate a random 10 character code that accepts both letters and numbers.
    - Persist the request url and associated random code but DO NOT USE A DATABASE.
- Protocol
    - Once the above data is created, return to the client but NOT THROUGH THE RESPONSE
    - Receive an acknowledgement from the client. 
    - If problems with the ack, ensure the result gets delivered to the client.
- GET
    - Call a detail route on the root view to return the associated url

# To test
- POST 
    - curl -X POST -H "Content-Type: application/json" -d '{"url":"https://classcalc.com"}' http://localhost:3000/url
- GET
    - curl http://localhost:3000/<code>