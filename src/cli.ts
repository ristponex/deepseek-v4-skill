#!/usr/bin/env npx ts-node

/**
 * DeepSeek V4 AI Agent Skill — CLI工具
 * 通过Atlas Cloud API调用DeepSeek V3.2（V4发布后自动升级）
 * 支持模式：chat / code / review / explain
 */

import * as https from "https";
import * as url from "url";

// ==================== 配置 ====================

/** 默认API基础地址 */
const DEFAULT_BASE_URL = "https://api.atlascloud.ai/v1";

/** 默认模型标识 */
const DEFAULT_MODEL = "deepseek/deepseek-v3.2";

/** 默认温度参数 */
const DEFAULT_TEMPERATURE = 0.7;

/** 默认最大输出token数 */
const DEFAULT_MAX_TOKENS = 4096;

/** 预定义的系统提示词，根据不同模式选择 */
const SYSTEM_PROMPTS: Record<string, string> = {
  chat: "You are a helpful AI assistant powered by DeepSeek. Provide clear, accurate, and concise answers.",
  code: "You are an expert software engineer. Write clean, production-ready, well-documented code. Include error handling and types.",
  review:
    "You are a senior code reviewer. Analyze the code for bugs, security vulnerabilities, performance issues, and suggest improvements. Be thorough but constructive.",
  explain:
    "You are a patient technical educator. Explain concepts clearly with examples. Break down complex topics into understandable parts.",
};

// ==================== 类型定义 ====================

/** CLI参数接口 */
interface CliArgs {
  /** 用户提示词 */
  prompt: string;
  /** 模型标识 */
  model: string;
  /** 温度参数 */
  temperature: number;
  /** 最大输出token数 */
  maxTokens: number;
  /** 系统提示词 */
  system: string | null;
  /** 使用模式 */
  mode: string | null;
}

/** API消息格式 */
interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** API响应格式 */
interface ChatCompletionChunk {
  choices: Array<{
    delta?: { content?: string };
    message?: { content?: string };
    finish_reason: string | null;
  }>;
}

// ==================== 参数解析 ====================

/**
 * 解析命令行参数
 * 支持 --prompt, --model, --temperature, --max-tokens, --system, --mode
 */
function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const parsed: CliArgs = {
    prompt: "",
    model: process.env.DEEPSEEK_MODEL || DEFAULT_MODEL,
    temperature: parseFloat(
      process.env.DEEPSEEK_TEMPERATURE || String(DEFAULT_TEMPERATURE)
    ),
    maxTokens: parseInt(
      process.env.DEEPSEEK_MAX_TOKENS || String(DEFAULT_MAX_TOKENS),
      10
    ),
    system: null,
    mode: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--prompt":
      case "-p":
        parsed.prompt = args[++i] || "";
        break;
      case "--model":
      case "-m":
        parsed.model = args[++i] || DEFAULT_MODEL;
        break;
      case "--temperature":
      case "-t":
        parsed.temperature = parseFloat(args[++i] || String(DEFAULT_TEMPERATURE));
        break;
      case "--max-tokens":
        parsed.maxTokens = parseInt(args[++i] || String(DEFAULT_MAX_TOKENS), 10);
        break;
      case "--system":
      case "-s":
        parsed.system = args[++i] || null;
        break;
      case "--mode":
        parsed.mode = args[++i] || null;
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
      default:
        // 如果没有指定--prompt，把第一个非标志参数当作prompt
        if (!args[i].startsWith("--") && !args[i].startsWith("-") && !parsed.prompt) {
          parsed.prompt = args[i];
        }
        break;
    }
  }

  return parsed;
}

/**
 * 打印帮助信息
 */
function printHelp(): void {
  console.log(`
🧠 DeepSeek V4 AI Agent Skill — CLI

用法:
  npx deepseek-v4 --prompt "你的问题"
  npx deepseek-v4 --mode code --prompt "用Go写一个HTTP服务器"

选项:
  --prompt, -p      用户提示词（必需）
  --model, -m       模型标识（默认：${DEFAULT_MODEL}）
  --temperature, -t 温度参数（默认：${DEFAULT_TEMPERATURE}）
  --max-tokens      最大输出token数（默认：${DEFAULT_MAX_TOKENS}）
  --system, -s      自定义系统提示词
  --mode            预设模式：chat / code / review / explain
  --help, -h        显示帮助信息

环境变量:
  ATLAS_API_KEY     Atlas Cloud API密钥（必需）
  ATLAS_BASE_URL    自定义API地址（默认：${DEFAULT_BASE_URL}）
  DEEPSEEK_MODEL    默认模型标识
  DEEPSEEK_TEMPERATURE  默认温度
  DEEPSEEK_MAX_TOKENS   默认最大token数

示例:
  # 基础对话
  npx deepseek-v4 --prompt "解释TCP三次握手"

  # 代码生成
  npx deepseek-v4 --mode code --prompt "用Rust写一个二叉搜索树"

  # 代码审查
  npx deepseek-v4 --mode review --prompt "$(cat src/main.ts)"

  # 算法解释
  npx deepseek-v4 --mode explain --prompt "解释Dijkstra算法"

注册获取API密钥:
  https://www.atlascloud.ai?ref=JPM683 — 首充25%奖励
`);
}

// ==================== API调用 ====================

/**
 * 构建消息数组，根据模式和参数组合系统提示词和用户提示词
 */
function buildMessages(args: CliArgs): ChatMessage[] {
  const messages: ChatMessage[] = [];

  // 确定系统提示词：优先使用--system参数，其次使用--mode预设
  const systemPrompt =
    args.system || (args.mode && SYSTEM_PROMPTS[args.mode]) || null;

  if (systemPrompt) {
    messages.push({ role: "system", content: systemPrompt });
  }

  messages.push({ role: "user", content: args.prompt });

  return messages;
}

/**
 * 调用Atlas Cloud API（流式传输）
 * 使用OpenAI兼容的chat/completions端点
 */
async function callApi(args: CliArgs): Promise<void> {
  const apiKey = process.env.ATLAS_API_KEY;

  // 检查API密钥是否存在
  if (!apiKey) {
    console.error("❌ 错误：未设置ATLAS_API_KEY环境变量");
    console.error("");
    console.error("请设置API密钥：");
    console.error('  export ATLAS_API_KEY="your-api-key"');
    console.error("");
    console.error("获取API密钥：");
    console.error("  https://www.atlascloud.ai?ref=JPM683（首充25%奖励）");
    process.exit(1);
  }

  const baseUrl = process.env.ATLAS_BASE_URL || DEFAULT_BASE_URL;
  const messages = buildMessages(args);

  // 构建请求体
  const requestBody = JSON.stringify({
    model: args.model,
    messages,
    temperature: args.temperature,
    max_tokens: args.maxTokens,
    stream: true,
  });

  // 解析URL
  const apiUrl = new url.URL(`${baseUrl}/chat/completions`);

  // 配置请求选项
  const options: https.RequestOptions = {
    hostname: apiUrl.hostname,
    port: apiUrl.port || 443,
    path: apiUrl.pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      // 处理HTTP错误状态
      if (res.statusCode && res.statusCode >= 400) {
        let errorBody = "";
        res.on("data", (chunk) => (errorBody += chunk));
        res.on("end", () => {
          console.error(`❌ API错误 (${res.statusCode})：${errorBody}`);

          if (res.statusCode === 401) {
            console.error("");
            console.error("API密钥无效，请检查ATLAS_API_KEY。");
            console.error("获取密钥：https://www.atlascloud.ai?ref=JPM683");
          } else if (res.statusCode === 404) {
            console.error("");
            console.error(`模型 "${args.model}" 未找到。`);
            console.error(`当前可用模型：${DEFAULT_MODEL}`);
          } else if (res.statusCode === 429) {
            console.error("");
            console.error("请求过于频繁，请稍后重试。");
          }

          process.exit(1);
        });
        return;
      }

      // 处理流式响应
      let buffer = "";

      res.on("data", (chunk: Buffer) => {
        buffer += chunk.toString();

        // 按行处理SSE数据
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // 保留不完整的最后一行

        for (const line of lines) {
          const trimmed = line.trim();

          // 跳过空行和注释
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6); // 去掉 "data: " 前缀

          // 流结束标记
          if (data === "[DONE]") {
            console.log(""); // 输出换行
            resolve();
            return;
          }

          try {
            const parsed: ChatCompletionChunk = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              process.stdout.write(content);
            }
          } catch {
            // 忽略JSON解析错误（可能是不完整的数据块）
          }
        }
      });

      res.on("end", () => {
        // 处理缓冲区中剩余的数据
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data: ") && trimmed.slice(6) !== "[DONE]") {
            try {
              const parsed: ChatCompletionChunk = JSON.parse(trimmed.slice(6));
              const content =
                parsed.choices?.[0]?.delta?.content ||
                parsed.choices?.[0]?.message?.content;
              if (content) {
                process.stdout.write(content);
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
        console.log(""); // 最终换行
        resolve();
      });

      res.on("error", (err) => {
        console.error(`❌ 响应错误：${err.message}`);
        reject(err);
      });
    });

    // 处理请求错误
    req.on("error", (err) => {
      console.error(`❌ 请求失败：${err.message}`);

      if (err.message.includes("ENOTFOUND")) {
        console.error("无法连接到API服务器，请检查网络连接。");
      } else if (err.message.includes("ETIMEDOUT")) {
        console.error("请求超时，请稍后重试。");
      }

      reject(err);
    });

    // 设置超时（30秒）
    req.setTimeout(30000, () => {
      console.error("❌ 请求超时（30秒）");
      req.destroy();
      reject(new Error("请求超时"));
    });

    // 发送请求
    req.write(requestBody);
    req.end();
  });
}

// ==================== 主入口 ====================

/**
 * 主函数：解析参数并调用API
 */
async function main(): Promise<void> {
  const args = parseArgs();

  // 检查是否提供了提示词
  if (!args.prompt) {
    console.error("❌ 错误：请提供提示词");
    console.error("");
    console.error("用法：npx deepseek-v4 --prompt \"你的问题\"");
    console.error("帮助：npx deepseek-v4 --help");
    process.exit(1);
  }

  try {
    await callApi(args);
  } catch (error) {
    // 全局错误处理
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ 未知错误：${message}`);
    process.exit(1);
  }
}

// 运行主函数
main();
