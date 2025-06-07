/** @jest-environment node */
import request from 'supertest';
import { createExpressApp } from '../index';
import { chat } from '../openaiHelper';

process.env.OPENAI_KEY = 'test';

jest.mock('../openaiHelper', () => ({ chat: jest.fn() }));

const mockedChat = chat as jest.MockedFunction<typeof chat>;

const app = createExpressApp();

test('GET /ping', async () => {
  const res = await request(app).get('/ping');
  expect(res.status).toBe(200);
});

test('POST /api/simulation/start', async () => {
  mockedChat.mockResolvedValue('{"pricing":[],"weekPlan":{"tasks":[]},"forecast":{}}');
  const res = await request(app).post('/api/simulation/start').send({ basics: { niche:'x', productType:'y', targetPriceRange:'$' } });
  expect(res.status).toBe(200);
  expect(res.body.simId).toBeDefined();
});

test('POST /api/pricing', async () => {
  mockedChat.mockResolvedValue('{"tiers":[{"label":"Basic","price":10}]}');
  const res = await request(app).post('/api/pricing').send({ niche: 'x', productType: 'y', targetPriceRange: '$' });
  expect(res.status).toBe(200);
  expect(res.body.tiers[0].label).toBe('Basic');
});

test('POST /api/marketing', async () => {
  mockedChat.mockResolvedValue('{"captions":["hi"],"hashtags":["#x"],"bestTimes":[]}');
  const res = await request(app)
    .post('/api/marketing')
    .send({ basics: { niche: 'x', productType: 'y', targetPriceRange: '$' }, pricing: { tiers: [] } });
  expect(res.status).toBe(200);
  expect(res.body.captions[0]).toBe('hi');
});
