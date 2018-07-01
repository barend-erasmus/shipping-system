# Shipping System

Shipping System written in Node.JS using CQRS

## Introduction

The goal of this project help others with commonly misundestood basics of software architecture.

## Where to start ?

The first step of the software development process is to write down a few user stories that are essential to your MVP (Minimum Viable Product).

For this project, the following is required:

* As a client, I want to be able to place an order.
* As a shippping agent, I want to be able to recieve a shipping order.
* As a shipping agent, I want to be able to approve a shipping order.
* As a shipping agent, I want to be able to decline a shipping order.
* As a client, I want to be able to receive a notification when a order has been approved.
* As a client, I want to be able to receive a notification when a order has been declined.

Next, draw a flow diagram to help visualize your idea better.

![flow-diagram](https://github.com/barend-erasmus/shipping-system/raw/master/images/flow-diagram.png)

## Let's start coding

With the user stories and flow diagram in place, we can start writing the acceptance criteria/tests. This project is more for developers than for the business team and therefor we'll jump straight to acceptance tests.

![postman-1](https://github.com/barend-erasmus/shipping-system/raw/master/images/postman-1.png)

To place an order, the following will be required from the client:

* Source
* Destination
* Weight
* Dimensions

## Red, Green, Refacor

"Red Green Refactor is the Agile engineering pattern which underpins Test Driven Development. Characterized by a “test-first” approach to design and implementation, it utilizes very short development cycles to minimize leap-of-faith assumptions." ~ [DZone](https://dzone.com/articles/pattern-of-the-month-red-green-refactor)

To demonstrate the "Red, Green, Refactor pattern" we'll write postman test which calls our endpoint and there after we'll write the minimum required code to get the tests passing. Once the tests are passing, we'll go back and refactor to keep the code clean.

**Two Failing Tests**

```javascript
pm.test("Status Code should be 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Body should have correct schema", function () { 
    const result = tv4.validateResult(JSON.parse(responseBody), schema);
 
    pm.expect(result.valid).to.be.true;
});
```

**Minimum Required Code**

```typescript
app.route('/api/orders/place').post((request: express.Request, response: express.Response) => {
    response.json({
        density: 40,
        destination: {
            id: 2,
            name: 'London, United Kingdom',
        },
        dimensions: {
            height: 30,
            length: 10,
            width: 20,
        },
        id: uuid.v4(),
        source: {
            id: 1,
            name: 'Cape Town, South Africa',
        },
        weight: 50,
    });
});
```

**Passing Tests**

![postman-2](https://github.com/barend-erasmus/shipping-system/raw/master/images/postman-2.png)

**Refactored Code**

```typescript
export class OrdersRouter {

    public static place(request: express.Request, response: express.Response): void {
        const orderDTO: OrderDTO = OrderDTO.fromRequestBody(request.body);

        orderDTO.id = uuid.v4();

        response.json(orderDTO);
    }

}

app.route('/api/orders/place').post(OrdersRouter.place);
```