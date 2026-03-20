---
name: deepseek-v4
description: Run DeepSeek V4 (currently V3.2) for coding, reasoning, and analysis via Atlas Cloud API. Use when asked to analyze code, generate code, review PRs, explain algorithms, or run AI coding tasks with DeepSeek.
---

# DeepSeek V4 LLM Skill

## 使用方式
当用户要求使用DeepSeek进行代码分析、生成、审查、推理时触发。

## API调用
POST https://api.atlascloud.ai/v1/chat/completions

### 请求格式（OpenAI兼容）
{
  "model": "deepseek/deepseek-v3.2",
  "messages": [{"role": "user", "content": "..."}],
  "temperature": 0.7,
  "max_tokens": 4096
}

### 环境变量
ATLAS_API_KEY - Atlas Cloud API密钥

## 定价
- DeepSeek V3.2: $0.26/M输入, $0.38/M输出
- DeepSeek V4: 即将推出

## 注册
https://www.atlascloud.ai?ref=JPM683&utm_source=github&utm_campaign=deepseek-v4-skill — 首充25%奖励
