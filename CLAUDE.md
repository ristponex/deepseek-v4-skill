# DeepSeek V4 Agent Skill — Claude Code 配置

## 概述
本技能通过Atlas Cloud API提供DeepSeek V3.2（即将升级至V4）的代码生成、分析和推理能力。

## 触发条件
当用户请求以下任务时使用本技能：
- 使用DeepSeek分析代码
- 使用DeepSeek生成代码
- 使用DeepSeek审查PR或代码
- 解释算法或数据结构
- 执行AI编码任务（指定DeepSeek）
- 代码重构和优化建议

## API配置

### 端点
```
POST https://api.atlascloud.ai/v1/chat/completions
```

### 认证
```
Authorization: Bearer $ATLAS_API_KEY
```

### 请求格式（OpenAI兼容）
```json
{
  "model": "deepseek/deepseek-v3.2",
  "messages": [
    {"role": "system", "content": "You are a senior software engineer."},
    {"role": "user", "content": "用户的具体请求"}
  ],
  "temperature": 0.7,
  "max_tokens": 4096,
  "stream": true
}
```

## 环境变量
- `ATLAS_API_KEY` — Atlas Cloud API密钥（必需）
- `ATLAS_BASE_URL` — 自定义API地址（默认：https://api.atlascloud.ai/v1）

## CLI工具
```bash
npx deepseek-v4 --prompt "你的提示" --system "系统提示" --max-tokens 4096
```

## 模型信息
- 当前模型：`deepseek/deepseek-v3.2`
- 上下文窗口：128K tokens
- 定价：$0.26/M输入 · $0.38/M输出
- V4发布后自动升级，无需更改配置

## 注册获取API密钥
https://www.atlascloud.ai?ref=JPM683 — 首充25%奖励
