![](Capture.PNG)
![](Capture1.PNG)
![](Capture2.PNG)
![](Capture3.PNG)
![](Capture4.PNG)

<br />
POST<br />
http://localhost:3000/signup<br />
raw , json  format<br />
{<br />
    "email":"shashank@gmail.com",<br />
    "password":"shashank"<br />
}<br />

Output<br />
{<br />
    "_id": "63672bf9bf142f2a2476d4a8",<br />
    "email": "shashank@gmail.com",<br />
    "password": "$2a$10$DC7pfYc1LzJB72Y503TP7eoHG4X9WsKBQOvjLDt830Xe0dAvRJ4Ve",<br />
    "createdAt": "2022-11-06T03:37:29.012Z",<br />
    "updatedAt": "2022-11-06T03:37:29.012Z",<br />
    "__v": 0<br />
}<br />

<br />
POST<br />
http://localhost:3000/login<br />
{<br />
    "email":"shashank@gmail.com", <br />
    "password":"shashank"<br />
}<br />
<br />
Output<br />
{<br />
    "status": "ok",<br />
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXNoYW5rQGdtYWlsLmNvbSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzA2Njg3fQ.mSpbxeLh3kdc0pFaDm6z0fmbfbPQilYNLWeWPq1Mz48"<br />
}<br />

<br />



GET (validity of token)<br />
http://localhost:3000/<br />
{<br />
    "cookie": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXNoYW5rQGdtYWlsLmNvbSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjY3NzA2Njg3fQ.mSpbxeLh3kdc0pFaDm6z0fmbfbPQilYNLWeWPq1Mz48"<br />
}
<br />
Output:<br />
"valid token"<br />

<br />
POST<br />
http://localhost:3000/createAgencyClient<br />

{<br />
    "agentid": "3",<br />
    "agentname":"shashancvgk21",<br />
    "agentaddress1":"indiafdg121",<br />
    "agentaddress2": "inddfgia121",<br />
    "agentstate": "delhfdgi121",<br />
    "agentcity":"delhi121",<br />
    "agentphonenumber":"898738324124",<br />
    "clientid":"3",<br />
    "clientname":"srivadfgstava12",<br />
    "clientemail":"shassdfgs121hank@gmail.com",<br />
    "clientphonenumber":"898fg738324412",<br />
    "clienttotalbill":"100134"<br />
}<br />

Output:<br />
"account created"<br />






PUT<br />
http://localhost:3000/client/1<br />
{<br />
    "ClientId":"1",<br />
    "Name":"name changed",<br />
    "Email":"email changed",<br />
    "PhoneNumber":"phone changed",<br />
    "TotalBill":"1000"<br />
}<br />

Output<br />
"the client has been updated"<br />
<br />
GET<br />
http://localhost:3000/maximum<br />
Output<br />
[<br />
    {<br />
        "_id": "6367670882e4b11138725ee9",<br />
        "ClientId": "2",<br />
        "AgencyId": "2",<br />
        "Name": "srivastava12",<br />
        "Email": "shas121hank@gmail.com",<br />
        "PhoneNumber": "898738324412",<br />
        "TotalBill": "100134",<br />
        "createdAt": "2022-11-06T07:49:28.538Z",<br />
        "updatedAt": "2022-11-06T07:49:28.538Z",<br />
        "__v": 0<br />
    },<br />
    {<br />
        "_id": "6367671d82e4b11138725eed",<br />
        "ClientId": "3",<br />
        "AgencyId": "3",<br />
        "Name": "srivadfgstava12",<br />
        "Email": "shassdfgs121hank@gmail.com",<br />
        "PhoneNumber": "898fg738324412",<br />
        "TotalBill": "100134",<br />
        "createdAt": "2022-11-06T07:49:49.893Z",<br />
        "updatedAt": "2022-11-06T07:49:49.893Z",<br />
        "__v": 0<br />
    }<br />
]<br />



