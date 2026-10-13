
import { test, expect } from './fixtures';

// UI-11: Sort from cheapest to most expensive
test('UI-11 sort price low to high', async ({ shop }) => {
  await shop.sortBy('Price: low to high');

  await expect(shop.products().first()).toContainText('Wireless Mouse');
  await expect(shop.prices().first()).toContainText('24.50');
});

// UI-12: Sort from most expensive to cheapest
test('UI-12 sort price high to low', async ({ shop }) => {
  await shop.sortBy('Price: high to low');

  await expect(shop.products().first()).toContainText('Monitor');
  await expect(shop.prices().first()).toContainText('249.00');
});

// UI-13: Quantity 3 updates the total
test('UI-13 quantity updates total', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();

  await shop.setQuantity('Laptop Stand', 3);

  await expect(shop.lineTotal('Laptop Stand')).toContainText('89.70');
  await expect(shop.cartTotal()).toContainText('89.70');
});

// UI-14: Quantity cannot be zero
test('UI-14 quantity zero is not allowed', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();

  await shop.setQuantity('Laptop Stand', 0);

  await expect(shop.cartTotal()).toContainText('29.90');
});

// UI-15: SAVE10 discount for one product
test('UI-15 SAVE10 one product', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();

  await shop.applyDiscount('SAVE10');

  await expect(shop.cartSubtotal()).toContainText('39.00');
  await expect(shop.cartDiscount()).toContainText('3.90');
  await expect(shop.cartTotal()).toContainText('35.10');
});

// UI-16: SAVE10 discount for two different products
test('UI-16 SAVE10 two products', async ({ shop }) => {
  await test.step('Add two products', async () => {
    await shop.add('USB-C Hub');
    await shop.add('Wireless Mouse');
    await shop.openCart();

    await expect(shop.cartSubtotal()).toContainText('63.50');
  });

  await test.step('Apply discount and check total', async () => {
    await shop.applyDiscount('SAVE10');

    await expect(shop.cartDiscount()).toContainText('6.35');
    await expect(shop.cartTotal()).toContainText('57.15');
  });
});

// UI-17: Invalid discount does not change total
test('UI-17 invalid discount code', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();

  await shop.applyDiscount('WRONGCODE');

  await expect(shop.discountMessage()).toContainText('Invalid code');
  await expect(shop.cartTotal()).toContainText('39.00');
});

// UI-18: Test invalid emails with different data
const invalidEmails = [
  'wrongemail',
  'test@',
  '@example.com',
  'test@example'
];

for (const email of invalidEmails) {
  test(`UI-18 invalid email: ${email}`, async ({ shop }) => {
    await shop.add('Laptop Stand');
    await shop.openCart();

    await shop.checkout('Mari Maasikas', email, 'Tallinn 1');

    await expect(shop.error('email')).toBeVisible();
  });
}
