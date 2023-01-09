
export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: [
    "**/__tests__/integration/**/*.[jt]s?(x)"   
  ]
  // testMatch: ["**/**/**/*.spec.ts"], tudo que estiver com spec final e teste

};
