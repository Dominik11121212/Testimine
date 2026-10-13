
import { test, expect } from './fixtures';

// UI-01: Products
test('UI-01 shows 6 products', async ({ shop }) => {
  await expect(shop.products()).toHaveCount(6);
});

// UI-02: Search
test('UI-02 search products', async ({ shop }) => {
  await shop.search('laptop');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products().first()).toContainText('Laptop Stand');
});

// UI-03: Add to basket
test('UI-03 add product', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('1');
});

// UI-04: Add same product twice
test('UI-04 add product twice', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('2');
});

// UI-05: Remove product
test('UI-05 remove product', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();
  await shop.remove('Laptop Stand');
  await expect(shop.cartRows()).toHaveCount(0);
});

// UI-06: Basket subtotal
test('UI-06 basket subtotal', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();
  await expect(shop.cartSubtotal()).toHaveText('29.90 €');
});

// UI-07: Empty basket
test('UI-07 empty basket', async ({ shop }) => {
  await shop.openCart();
  await expect(shop.cartRows()).toHaveCount(0);
});

// UI-08: Quantity
test('UI-08 quantity updates total', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();
  await shop.setQuantity('Laptop Stand', 3);
  await expect(shop.cartTotal()).toHaveText('89.70 €');
});

// UI-09: Invalid discount
test('UI-09 invalid discount code', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();
  await shop.applyDiscount('WRONG');
  await expect(shop.cartTotal()).toHaveText('29.90 €');
});

// UI-10: Checkout
test('UI-10 checkout confirmation', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();
  await shop.checkout(
    'Mari Maasikas',
    'mari@example.com',
    'Tallinn 1'
  );
  await expect(shop.confirmation()).toContainText('Order #');
});
