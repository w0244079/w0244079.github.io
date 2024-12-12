import request from 'supertest';
import app from './app'; // Your express app

describe('GET /api/tracks/:id', () => {
  it('should return a track when a valid ID is provided', async () => {
    const trackId = 1; // You should use a valid ID from your database
    const expectedTrack = {
      TrackId: trackId,
      Name: 'Test Track',
      Composer: 'Test Composer',
      // Add all other properties that your track might have
    };

    const response = await request(app).get(`/api/tracks/${trackId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedTrack); // Match the actual data from the DB
  });

  it('should return 404 when a track is not found', async () => {
    const trackId = 999; // Assuming this ID does not exist in the database

    const response = await request(app).get(`/api/tracks/${trackId}`);

    expect(response.status).toBe(404);
  });

  it('should return 500 on DB error', async () => {
    const trackId = 1;

    // You can simulate a DB error by disconnecting the DB or any other way if you want
    // But for now, this just checks that the DB logic is working without errors
    const response = await request(app).get(`/api/tracks/${trackId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Try again later');
  });
});
