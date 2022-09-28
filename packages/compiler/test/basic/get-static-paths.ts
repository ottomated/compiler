import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { transform } from '@astrojs/compiler';

test('getStaticPaths with braces on newline', async () => {
  const FIXTURE = `---
import A from './A.astro';
export async function getStaticPaths()
{
  return [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } }
  ];
}
---

<div></div>
`;
  const result = await transform(FIXTURE);
  assert.match(result.code, 'export async function getStaticPaths()\n{', 'Expected output to contain getStaticPaths output');
});

test('getStaticPaths as const without braces', async () => {
  const FIXTURE = `---
import A from './A.astro';
export const getStaticPaths = () => ([
  { params: { id: '1' } },
  { params: { id: '2' } },
  { params: { id: '3' } }
])
---

<div></div>
`;
  const result = await transform(FIXTURE);
  assert.match(result.code, 'export const getStaticPaths = () => ([', 'Expected output to contain getStaticPaths output');
});

test('getStaticPaths as const with braces on newline', async () => {
  const FIXTURE = `---
import A from './A.astro';
export const getStaticPaths = () =>
{
  return [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } }
  ];
}
---

<div></div>
`;
  const result = await transform(FIXTURE);
  assert.match(result.code, 'export const getStaticPaths = () =>\n{', 'Expected output to contain getStaticPaths output');
});

test.run();