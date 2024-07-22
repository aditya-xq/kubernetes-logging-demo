# Kubernetes Logging Demo

## Overview

This project is a demo microservice built using Node.js and Express. It simulates a basic user authentication system, transaction processing, payment processing, and security incident simulation. The service is designed to be deployed using Docker and Kubernetes, with scripts to simulate various request scenarios.

Once you run this demo, you can test and gain hands-on learning about different `kubectl` commands for monitoring logs in your pod as demonstrated in this Middleware's blog post: [Kubectl Logs Tail: A Guide to Tailing Kubernetes Logs](https://middleware.io/blog/kubectl-logs-tail/).

## Features

- **User Authentication**: Validates user credentials and provides login functionality.
- **Transaction Processing**: Allows users to perform transactions that update their account balance.
- **Payment Processing**: Processes payments, checking for sufficient funds before completing the transaction.
- **Security Simulation**: Simulates security incidents, such as unauthorized access attempts.

## Project Structure

```
.
├── app.js
├── Dockerfile
├── deployment.yaml
├── service.yaml
└── simulate_requests.sh
```

### app.js

The main application file containing the Express server setup and endpoint definitions:

- **/login**: Validates user credentials.
- **/transaction**: Processes user transactions.
- **/payment**: Handles payment processing.
- **/admin**: Simulates an unauthorized access attempt.

### Dockerfile

The Dockerfile for containerizing the application:

- **Base Image**: Uses Node.js base image.
- **Dependencies**: Installs project dependencies.
- **App Setup**: Copies application files and starts the server.

### deployment.yaml

Kubernetes deployment configuration:

- **Deployment**: Defines a deployment for the microservice.
- **Replicas**: Specifies the number of replicas.
- **Containers**: Configures the container image and port.

### service.yaml

Kubernetes service configuration:

- **Service**: Defines a service to expose the deployment.
- **Ports**: Specifies the port mappings.

### simulate_requests.sh

A script to simulate various request scenarios using curl:

- **Simulates Successful and Failed Logins**: Tests different login scenarios.
- **Transaction and Payment Requests**: Sends transaction and payment requests, both successful and failed.
- **Unauthorized Access**: Simulates an unauthorized access attempt.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Docker**: Install Docker for containerization.
- **Kubernetes**: Set up a Kubernetes cluster for deployment.

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/kubernetes-logging-demo.git
   cd kubernetes-logging-demo
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

### Running the Application

1. **Start the server**:
   ```sh
   node app.js
   ```

2. **Server will be running at**: `http://localhost:3000`

### Building and Running with Docker

1. **Build the Docker image**:
   ```sh
   docker build -t kubernetes-logging-demo .
   ```

2. **Run the Docker container**:
   ```sh
   docker run -p 3000:3000 kubernetes-logging-demo
   ```

### Deploying with Kubernetes

1. **Apply the deployment and service configurations**:
   ```sh
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

2. **Access the service**:
   The service will be exposed on the port specified in `service.yaml`.

### Simulating Requests

1. **Run the simulation script**:
   ```sh
   ./simulate_requests.sh
   ```

2. The script will continuously send various requests to the application, simulating different scenarios.
