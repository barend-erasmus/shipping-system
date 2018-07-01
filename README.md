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