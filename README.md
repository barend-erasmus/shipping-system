# Shipping System

Shipping System written in Node.JS using CQRS

## Introduction

The goal of this project is to demonstrate software development processes and principles.

## What will be covered in this project?

* User Stories
* Flow Diagrams
* Acceptance Tests
* Test-Driven Development
* Domain-Driven Development (Domain Modeling)
* Design Patterns
* SOLID Principles
* DRY Principle
* Data Structures
* Algorithms

### User Stories

"Each user story is expected to yield, once implemented, a contribution to the value of the overall product, irrespective of the order of implementation; these and other assumptions as to the nature of user stories are captured by the INVEST formula." ~ Agile Alliance

* As a client, I want to be able to place an order.
* As a shippping agent, I want to be able to recieve a shipping order.
* As a shipping agent, I want to be able to approve a shipping order.
* As a shipping agent, I want to be able to decline a shipping order.
* As a client, I want to be able to receive a notification when a order has been approved.
* As a client, I want to be able to receive a notification when a order has been declined.

### Flow Diagram

![flow-diagram](https://github.com/barend-erasmus/shipping-system/raw/master/images/flow-diagram.png)

### Acceptance Tests

"An acceptance test is a formal description of the behavior of a software product, generally expressed as an example or a usage scenario." ~ Agile Alliance

In this project, we'have used Postman Tests for our acceptance tests.

Learn more about Postman Tests, [here](https://www.getpostman.com/docs/v6/postman/scripts/test_scripts).

### Test-Driven Development

**Red, Green, Refacor**

"Red Green Refactor is the Agile engineering pattern which underpins Test Driven Development. Characterized by a “test-first” approach to design and implementation, it utilizes very short development cycles to minimize leap-of-faith assumptions." ~ [DZone](https://dzone.com/articles/pattern-of-the-month-red-green-refactor)

**Failing Tests**

Writing a failing test is the first step in TDD.

```javascript
pm.test("Status Code should be 200", function () {
    pm.response.to.have.status(200);
});
```

**Minimum Required Code**

Once you have a failing test, you can write the minimum code required to get it passing.

```typescript
app.route('/api/orders/place').post((request: express.Request, response: express.Response) => {
    response.status(200).end();
});
```

**Passing Tests**

![postman-2](https://github.com/barend-erasmus/shipping-system/raw/master/images/postman-2.png)

**Refactored Code**

Now that you have a passing test, you can refactor and use the test to validate.

```typescript
export class OrdersRouter {

    public static place(request: express.Request, response: express.Response): void {
        // TODO: ...

        response.status(200).end();
    }

}

app.route('/api/orders/place').post(OrdersRouter.place);
```

### Domain-Driven Development (Domain Modeling)

"Domain Driven Design’s strategic design is a conscientious effort to create common understanding between business visionaries, domain experts and developers." ~ Rebecca


## Resources

[Agile Alliance - User Stories](https://www.agilealliance.org/glossary/user-stories/#q=~(filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'user*20stories))~searchTerm~'~sort~false~sortDirection~'asc~page~1))

[Agile Alliance - Acceptance Testing](https://www.agilealliance.org/glossary/acceptance/#q=~(filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'acceptance*20test))~searchTerm~'~sort~false~sortDirection~'asc~page~1))

[Postman - Test Scripts](https://www.getpostman.com/docs/v6/postman/scripts/test_scripts)

[Pattern of the Month: Red Green Refactor](https://dzone.com/articles/pattern-of-the-month-red-green-refactor)

[Why Domain Modeling?](http://wirfs-brock.com/blog/2013/02/27/why-domain-modeling/)

[Entities, Value Objects, Aggregates and Roots](https://lostechies.com/jimmybogard/2008/05/21/entities-value-objects-aggregates-and-roots/)