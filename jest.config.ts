import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Thêm /src để trỏ đúng thư mục
    "^\\./globals\\.css$": "<rootDir>/src/app/globals.css", // Ánh xạ đường dẫn tương đối
    "^src/app/globals\\.css$": "identity-obj-proxy", // Ánh xạ đường dẫn đầy đủ
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Cho các tệp CSS khác
    // Khúc này là sự phiền hà của thằng Jest khi chạy kiểm thử mà dính tới tệp globals.css 
    "punycode": "<rootDir>/src/__mocks__/punycode.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["react-jsx"],
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};

export default config;
