// src/setupTests.ts
// @testing-library/jest-dom の拡張マッチャーをインポート
import "@testing-library/jest-dom";

// Vitest で fetch をモックする場合 (APIテストに必要)
// global.fetch = vi.fn();

// もし特定の環境変数をテスト中にモックしたい場合など
// import.meta.env.VITE_OPEN_WEATHER_API_KEY = 'test_api_key';
