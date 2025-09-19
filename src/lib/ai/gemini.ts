import { GoogleGenerativeAI } from "@google/generative-ai";

let _model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

export function getGemini(modelName = "gemini-1.5-pro") {
  if (process.env.REPORTS_MOCK === "1") {
    return null; // мок-режим — без реального клиента
  }
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("GOOGLE_API_KEY is required when REPORTS_MOCK!=1");
  const genai = new GoogleGenerativeAI(key);
  _model = _model || genai.getGenerativeModel({ model: modelName });
  return _model;
}
