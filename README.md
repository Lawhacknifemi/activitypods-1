[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

# ActivityPods

> ActivityPub + Solid PODS = ❤️

Check out [these slides](./proposal/proposal-english.pdf) ([french version](./proposal/proposal-french.pdf)) for more information about this project !


## Available applications

- [Contacts](packages/contacts/README.md)
- [Events](packages/events/README.md)
- [Messages](packages/messages/README.md)


## Getting started

```
yarn install
yarn run bootstrap
docker-compose up -d fuseki
cd boilerplate
yarn run dev
```


## Quick guide

### Create an actor with a POD

```
POST /auth/signup HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "name": "Alice",
    "username": "alice",
    "email": "alice@test.com",
    "password": "test"
}
```

This will create an ActivityPub actor on http://localhost:3000/alice (viewable by everyone) and a Solid POD on http://localhost:3000/alice/data. 

You will receive in return a JWT token to authenticate the newly-created user on subsequent requests. 

```json
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "webId": "http://localhost:3000/alice",
    "newUser": true
}
```

> If you need to login again with the same user, you can use the `/auth/login` endpoint with the username and password.

### Post a resource in a container

Upon actor creation, several LDP containers have been automatically created on the http://localhost:3000/alice/data POD: `/profiles`, `/events`, `/places`.

You can now post an event on the `/events` container, following the [LDP specification](https://www.w3.org/TR/ldp-primer/).

```
POST /alice/data/events HTTP/1.1
Host: localhost:3000
Content-Type: application/ld+json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

{
    "@context": "https://www.w3.org/ns/activitystreams",
    "type": "Event",
    "name": "Birthday party !"
}
```

The URL of the newly-created event will be returned in the `Location` header of the response.

```
Location: http://localhost:3000/alice/data/events/61a0f897e5b88b06f85b1190
Link: <http://www.w3.org/ns/ldp#Resource>; rel="type"
```

> By default, this event is only visible by yourself (you can do a `GET`  with the JWT token).

## Post an activity in the outbox

The created actor has everything needed to exchange with other ActivityPub actors.

You can announce the new event using the ActivityPub outbox:

```
POST /alice/outbox HTTP/1.1
Host: localhost:3000
Content-Type: application/ld+json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

{
    "@context": "https://www.w3.org/ns/activitystreams",
    "type": "Announce",
    "actor": "http://localhost:3000/alice",
    "object": "http://localhost:3000/alice/data/events/61a0f897e5b88b06f85b1190",
    "to": "https://www.w3.org/ns/activitystreams#Public"
}
```

Since this activity is public, anyone will be able to view it on the outbox. But you could of course have sent it only to selected users, in which case it will have been sent to their inboxes.

```
GET /alice/outbox HTTP/1.1
Host: localhost:3000
Accept: application/ld+json

{
    "@context": "http://localhost:3000/_system/context.json",
    "id": "http://localhost:3000/alice/outbox?page=1",
    "type": "OrderedCollectionPage",
    "partOf": "http://localhost:3000/alice/outbox",
    "orderedItems": [{
        "id": "http://localhost:3000/alice/data/activities/61b72a9cc7ff2f4bbb85606b",
        "type": "Announce",
        "actor": "http://localhost:3000/alice",
        "object": "http://localhost:3000/alice/data/events/61a0f897e5b88b06f85b1190",
        "published": "2021-12-13T11:12:28.943Z",
        "to": "as:Public"
    }],
    "totalItems": 1
}
```

## Deployment to production

Follow the guide [here](deploy/README.md).


## Tests

```
yarn install
yarn run bootstrap
docker-compose up -d fuseki_test
cd tests
yarn run test
```
