# Fake Store API Testing Suite

This project contains automated tests for validating the Fake Store API data quality and identifying potential defects in the product data.

## Setup

1. Make sure you have Node.js installed on your system
2. Install dependencies:
```bash
npm install
```

## Running Tests

To run all tests:
```bash
npm test
```

## Test Coverage

The test suite covers the following areas:

1. Server Response
   - Validates 200 status code
   - Confirms response contains array of products

2. Product Attributes
   - Verifies presence of required attributes
   - Validates product titles (non-empty)
   - Checks price values (non-negative)
   - Validates rating values (not exceeding 5)

3. Data Quality
   - Verifies numeric values for prices
   - Validates numeric values for ratings
   - Checks for non-empty categories

4. Defect Reporting
   - Generates a comprehensive report of all found defects
   - Groups defects by product
   - Provides detailed information about each defect

## Test Output

The test suite will output:
- Test results for each validation check
- Detailed information about any failed tests
- A comprehensive defect report listing all products with issues

## Example Defect Report

```
Defect Report:
==============

Product ID: 1
Title: Product Name
Defects found:
- Negative price
- Rating exceeds maximum (5)
``` 