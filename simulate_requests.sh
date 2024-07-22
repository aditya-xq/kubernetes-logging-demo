#!/bin/bash

# Define the base URL for the application
BASE_URL="http://localhost:30001"

# Define an array of curl commands to simulate different scenarios
curl_commands=(
    # Successful login
    "curl -i -X POST $BASE_URL/login -H 'Content-Type: application/json' -d '{\"username\":\"john_doe\",\"password\":\"12345\"}'"
    
    # Failed login due to wrong password
    "curl -i -X POST $BASE_URL/login -H 'Content-Type: application/json' -d '{\"username\":\"john_doe\",\"password\":\"wrong_password\"}'"
    
    # Successful transaction
    "curl -i -X POST $BASE_URL/transaction -H 'Content-Type: application/json' -d '{\"username\":\"john_doe\",\"amount\":50}'"
    
    # Failed transaction because the user is not found
    "curl -i -X POST $BASE_URL/transaction -H 'Content-Type: application/json' -d '{\"username\":\"unknown_user\",\"amount\":50}'"
    
    # Successful payment
    "curl -i -X POST $BASE_URL/payment -H 'Content-Type: application/json' -d '{\"username\":\"jane_doe\",\"amount\":50}'"
    
    # Failed payment due to insufficient funds
    "curl -i -X POST $BASE_URL/payment -H 'Content-Type: application/json' -d '{\"username\":\"john_doe\",\"amount\":200}'"
    
    # Unauthorized access attempt
    "curl -i -X POST $BASE_URL/admin -H 'Content-Type: application/json' -d '{\"username\":\"admin\"}'"
)

# Infinite loop to continuously execute curl requests
while true; do
    # Select a random curl command from the array
    cmd=${curl_commands[$RANDOM % ${#curl_commands[@]}]}
    
    # Print the command being executed (for debugging/visibility)
    echo " Executing: $cmd"
    
    # Execute the selected curl command
    eval $cmd
    
    # This adds a delay of 1 second between requests
    sleep 1
done
