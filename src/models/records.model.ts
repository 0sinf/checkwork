import { RecordCreateRequest, RecordRepository } from "records";
import { Pool } from "pg";
import pool from "./pool";

class RecordRepositoryImpl implements RecordRepository {
  private readonly pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async save(recordCreateRequest: RecordCreateRequest): Promise<void> {
    const { day, startTime, endTime } = recordCreateRequest;

    const client = await this.pool.connect();
    const query = `
      INSERT INTO records(day, start_time, end_time)
        VALUES ($1, $2, $3)
    `;
    const result = await client.query(query, [day, startTime, endTime]);
    client.release();
  }
}

const recordRepository = new RecordRepositoryImpl();

export default recordRepository;
