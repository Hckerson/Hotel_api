import { Room } from "@prisma/client";
import { createClient, RedisClientType } from "redis";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";

@Injectable()
export class Redis implements OnModuleInit, OnModuleDestroy {
  /**
   * Redis instance for fast memory cache
   *
   */
  private client: RedisClientType;
  constructor() {}
  async onModuleInit() {
    if (!this.client) {
      this.client = createClient({
        username: "default",
        password: "SDWudDkXjwnHzDSAQUcbHkeZj52hZ6as",
        socket: {
          host: "redis-19665.c62.us-east-1-4.ec2.redns.redis-cloud.com",
          port: 19665,
          reconnectStrategy: (retries) => {
            // Generate a random jitter between 0 – 100 ms:
            const jitter = Math.floor(Math.random() * 100);

            // Delay is an exponential backoff, (2^retries) * 50 ms, with a
            // maximum value of 3000 ms:
            const delay = Math.min(Math.pow(2, retries) * 50, 3000);

            return delay + jitter;
          },
        },
      });
    }
    this.client.on("error", (err) => console.log("Redis Client Error", err));

    await this.client.connect();
    console.log(`Redis connected `);
  }
  async onModuleDestroy() {
    await this.client.quit();
    console.log(`Redis terminated`);
  }
  async setString(key: string, value: string) {
    await this.client.set(key, value);
  }
  async getString(key: string) {
    return await this.client.get(key);
  }
  async setObject(key: string, value: Room) {
    await this.client.set(key, JSON.stringify(value));
  }
  async getObject(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }
}
