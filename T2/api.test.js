const axios = require('axios');

const API_URL = 'https://fakestoreapi.com/products';

describe('Fake Store API Tests', () => {
    let products;
    let response;

    // Fetch data once before all tests
    beforeAll(async () => {
        response = await axios.get(API_URL);
        products = response.data;
    });

    // Test server response
    describe('Server Response', () => {
        test('should return 200 status code', () => {
            expect(response.status).toBe(200);
        });

        test('should return an array of products', () => {
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBeGreaterThan(0);
        });
    });

    // Test product attributes
    describe('Product Attributes', () => {
        test('all products should have required attributes', () => {
            const requiredAttributes = ['id', 'title', 'price', 'description', 'category', 'rating'];
            
            products.forEach(product => {
                requiredAttributes.forEach(attr => {
                    expect(product).toHaveProperty(attr);
                });
            });
        });

        test('product titles should not be empty', () => {
            const productsWithEmptyTitles = products.filter(product => 
                !product.title || product.title.trim() === ''
            );

            if (productsWithEmptyTitles.length > 0) {
                console.log('Products with empty titles:', productsWithEmptyTitles);
            }

            expect(productsWithEmptyTitles).toHaveLength(0);
        });

        test('product prices should not be negative', () => {
            const productsWithNegativePrices = products.filter(product => 
                product.price < 0
            );

            if (productsWithNegativePrices.length > 0) {
                console.log('Products with negative prices:', productsWithNegativePrices);
            }

            expect(productsWithNegativePrices).toHaveLength(0);
        });

        test('product ratings should not exceed 5', () => {
            const productsWithInvalidRatings = products.filter(product => 
                product.rating && product.rating.rate > 5
            );

            if (productsWithInvalidRatings.length > 0) {
                console.log('Products with invalid ratings:', productsWithInvalidRatings);
            }

            expect(productsWithInvalidRatings).toHaveLength(0);
        });
    });

    // Additional data quality tests
    describe('Data Quality Checks', () => {
        test('prices should be numeric', () => {
            const productsWithNonNumericPrices = products.filter(product => 
                typeof product.price !== 'number' || isNaN(product.price)
            );

            if (productsWithNonNumericPrices.length > 0) {
                console.log('Products with non-numeric prices:', productsWithNonNumericPrices);
            }

            expect(productsWithNonNumericPrices).toHaveLength(0);
        });

        test('ratings should be numeric', () => {
            const productsWithNonNumericRatings = products.filter(product => 
                typeof product.rating.rate !== 'number' || isNaN(product.rating.rate)
            );

            if (productsWithNonNumericRatings.length > 0) {
                console.log('Products with non-numeric ratings:', productsWithNonNumericRatings);
            }

            expect(productsWithNonNumericRatings).toHaveLength(0);
        });

        test('categories should not be empty', () => {
            const productsWithEmptyCategories = products.filter(product => 
                !product.category || product.category.trim() === ''
            );

            if (productsWithEmptyCategories.length > 0) {
                console.log('Products with empty categories:', productsWithEmptyCategories);
            }

            expect(productsWithEmptyCategories).toHaveLength(0);
        });
    });

    // Generate report of all defects
    describe('Defect Report', () => {
        test('generate defect report', () => {
            const defects = [];

            products.forEach(product => {
                const productDefects = [];

                // Check title
                if (!product.title || product.title.trim() === '') {
                    productDefects.push('Empty title');
                }

                // Check price
                if (typeof product.price !== 'number' || isNaN(product.price)) {
                    productDefects.push('Invalid price format');
                } else if (product.price < 0) {
                    productDefects.push('Negative price');
                }

                // Check rating
                if (!product.rating || typeof product.rating.rate !== 'number' || isNaN(product.rating.rate)) {
                    productDefects.push('Invalid rating format');
                } else if (product.rating.rate > 5) {
                    productDefects.push('Rating exceeds maximum (5)');
                }

                // Check category
                if (!product.category || product.category.trim() === '') {
                    productDefects.push('Empty category');
                }

                if (productDefects.length > 0) {
                    defects.push({
                        id: product.id,
                        title: product.title,
                        defects: productDefects
                    });
                }
            });

            // Output defect report
            if (defects.length > 0) {
                console.log('\nDefect Report:');
                console.log('==============');
                defects.forEach(item => {
                    console.log(`\nProduct ID: ${item.id}`);
                    console.log(`Title: ${item.title}`);
                    console.log('Defects found:');
                    item.defects.forEach(defect => console.log(`- ${defect}`));
                });
            }

            // This test will always pass - it's just for reporting
            expect(true).toBe(true);
        });
    });
}); 