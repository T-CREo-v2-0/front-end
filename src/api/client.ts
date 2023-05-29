import axios, { AxiosInstance } from "axios";
import {
  Health,
  Credibility,
  TextCredibilityWeights,
  PlainText,
} from "./types";

export default class TCREoClient {
  client: AxiosInstance;

  constructor(baseUrl = "http://localhost:3000") {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  }

  async getHealth(): Promise<Health> {
    const response = await this.client.get("/health");
    return response.data;
  }

  async getPlainTextCredibility(
    weights: TextCredibilityWeights,
    text: PlainText
  ): Promise<Credibility> {
    const response = await this.client.get("/calculate/plain-text", {
      params: {
        ...weights,
        ...text,
      },
    });
    return response.data;
  }
}
