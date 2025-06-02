-- Создание таблицы заказов
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Заполнение таблицы тестовыми данными
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- 1. Расчет общего объема продаж за март 2024
SELECT 
    SUM(amount) as total_march_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2. Поиск клиента с наибольшими тратами
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Расчет среднего значения заказа
SELECT 
    ROUND(AVG(amount), 2) as average_order_value,
    COUNT(*) as total_orders,
    ROUND(SUM(amount), 2) as total_amount
FROM orders;

-- 4. Бонусный анализ: детальная статистика по клиентам
SELECT 
    customer,
    COUNT(*) as number_of_orders,
    SUM(amount) as total_spent,
    ROUND(AVG(amount), 2) as average_order,
    MIN(amount) as min_order,
    MAX(amount) as max_order
FROM orders
GROUP BY customer
ORDER BY total_spent DESC;

-- 5. Анализ продаж по месяцам
SELECT 
    strftime('%Y-%m', order_date) as month,
    COUNT(*) as number_of_orders,
    SUM(amount) as total_sales,
    ROUND(AVG(amount), 2) as average_order
FROM orders
GROUP BY month
ORDER BY month; 