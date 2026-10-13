
import { test, expect } from './fixtures';

test('FLAKY-01 order confirmation', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await shop.openCart();

  await shop.checkout(
    'Mari Maasikas',
    'mari@example.com',
    'Tallinn 1'
  );

  // Wait until the confirmation appears
  await expect(shop.confirmation()).toContainText('Order #');
});
