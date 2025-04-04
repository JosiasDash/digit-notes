# digit-notes
An Rest API to add and manage notes

### Register : /register (POST)
This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response.

A successful POST request typically returns a `200 OK` or `201 Created` response code.
##### Example
``` json 
{
	"email": "hannieldegbelo@gmail.com",
    "password": "Hanniel2025;"
}
```

### Login : /login (POST)

This endpoint is used to authenticate a user and obtain an access token.

**Request Body**

- email (string, required): The email address of the user.
    
- password (string, required): The password of the user.
    

**Response**

- Status: 200
    
- Content-Type: application/json
    
- message (string): A message indicating the result of the login attempt.
    
- access_token (string): The access token to be used for subsequent authorized requests.
    

**Example Response**

``` json
{
    "message": "",
    "access_token": ""
}

 ```

### Get notes list: /notes (GET)

The endpoint retrieves a list of notes.

The response of this request can be documented as a JSON schema:

``` json
{
  "type": "object",
  "properties": {
    "notes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "content": {
            "type": "string"
          }
        }
      }
    }
  }
}

 ```

### Add note : /notes (POST)
This endpoint allows you to create a new note by sending an HTTP POST request to the specified URL. The request should include a JSON payload in the raw request body with the "title" and "content" fields to define the title and content of the note, respectively.

### Request Body

- `title`: (string) The title of the note.
    
- `content`: (string) The content of the note.
    

Upon successful execution, the endpoint will return a JSON response with a status code of 200 and a message indicating the success of the operation.

### Response

- Status: 200
    
- Content-Type: application/json
    
- `message`: (string) A message indicating the outcome of the request.