# 🧠 DeepSeek V4 AI Agent Skill

[![AI Agent Skill](https://img.shields.io/badge/AI%20Agent-Skill-blue?style=for-the-badge)](https://github.com/thoughtincode/deepseek-v4-skill)
[![DeepSeek V3.2 → V4](https://img.shields.io/badge/DeepSeek-V3.2%20→%20V4-green?style=for-the-badge)](https://www.atlascloud.ai?ref=JPM683)
[![15+ Platforms](https://img.shields.io/badge/Platforms-15%2B-orange?style=for-the-badge)](#supported-platforms)
[![OpenAI Compatible](https://img.shields.io/badge/API-OpenAI%20Compatible-purple?style=for-the-badge)](#api-reference)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> **An open agent skill that brings DeepSeek's power to 15+ AI coding platforms.**
> Uses DeepSeek V3.2 now — seamless, zero-config upgrade to V4 when it launches.

---

## Why This Skill?

DeepSeek V3.2 is one of the most capable open-weight LLMs for coding, reasoning, and analysis. This skill makes it instantly available across every major AI coding platform — Claude Code, Cursor, GitHub Copilot, Codex CLI, Gemini CLI, Windsurf, and more.

When DeepSeek V4 launches, this skill upgrades automatically. No config changes, no reinstall, no downtime. Just better results.

**Key value:**

- **One skill, 15+ platforms** — install once, use everywhere
- **OpenAI-compatible API** — works with any tool that speaks OpenAI format
- **Future-proof** — automatic V3.2 → V4 upgrade path
- **Cost-effective** — $0.26/M input tokens, fraction of GPT-4 pricing
- **No rate limits** — powered by Atlas Cloud's infrastructure

---

## Quick Start

### Install via npx (Recommended)

```bash
npx skills add thoughtincode/deepseek-v4-skill
```

### Or clone manually

```bash
git clone https://github.com/thoughtincode/deepseek-v4-skill.git
cd deepseek-v4-skill
```

### Set your API key

```bash
export ATLAS_API_KEY="your-api-key-here"
```

> Get your API key at [atlascloud.ai](https://www.atlascloud.ai?ref=JPM683) — **25% bonus on first top-up**

---

## Supported Platforms

This skill works with **15+ AI coding platforms** out of the box:

| Platform | Type | Status |
|----------|------|--------|
| **Claude Code** | CLI Agent | ✅ Full support |
| **Cursor** | IDE Agent | ✅ Full support |
| **GitHub Copilot** | IDE Extension | ✅ Full support |
| **OpenAI Codex CLI** | CLI Agent | ✅ Full support |
| **Gemini CLI** | CLI Agent | ✅ Full support |
| **Windsurf** | IDE Agent | ✅ Full support |
| **Kiro** | IDE Agent | ✅ Full support |
| **OpenCode** | CLI Agent | ✅ Full support |
| **Cline** | IDE Extension | ✅ Full support |
| **Aider** | CLI Agent | ✅ Full support |
| **Continue** | IDE Extension | ✅ Full support |
| **Roo Code** | IDE Extension | ✅ Full support |
| **AugmentCode** | IDE Extension | ✅ Full support |
| **Amazon Q Developer** | IDE Agent | ✅ Full support |
| **Tabnine** | IDE Extension | ✅ Full support |
| **Custom Agents** | Any OpenAI-compatible | ✅ Full support |

### Platform-Specific Setup

<details>
<summary><b>Claude Code</b></summary>

The `CLAUDE.md` file is automatically detected. Just add the skill to your project:

```bash
npx skills add thoughtincode/deepseek-v4-skill
export ATLAS_API_KEY="your-key"
```

Claude Code will use the skill when you ask it to run DeepSeek tasks.

</details>

<details>
<summary><b>Cursor</b></summary>

Add to your `.cursor/rules` or project settings:

```
Use DeepSeek V4 skill for code analysis and generation tasks.
API: POST https://api.atlascloud.ai/v1/chat/completions
Model: deepseek/deepseek-v3.2
```

</details>

<details>
<summary><b>GitHub Copilot / Codex CLI</b></summary>

The skill's OpenAI-compatible endpoint works directly:

```bash
export OPENAI_API_BASE=https://api.atlascloud.ai/v1
export OPENAI_API_KEY=$ATLAS_API_KEY
```

</details>

<details>
<summary><b>Gemini CLI / Windsurf / Kiro</b></summary>

Reference the `SKILL.md` file in your agent configuration. The OpenAI-compatible format means zero adapter code needed.

</details>

<details>
<summary><b>Aider</b></summary>

```bash
aider --openai-api-base https://api.atlascloud.ai/v1 \
      --openai-api-key $ATLAS_API_KEY \
      --model deepseek/deepseek-v3.2
```

</details>

<details>
<summary><b>Any OpenAI-Compatible Tool</b></summary>

```
Base URL: https://api.atlascloud.ai/v1
Model:    deepseek/deepseek-v3.2
Auth:     Bearer $ATLAS_API_KEY
```

</details>

---

## Features

### 🖥️ Code Generation & Analysis

- Generate production-ready code in 50+ languages
- Explain complex algorithms and data structures
- Refactor and optimize existing code
- Convert code between languages

### 🧪 Code Review & Quality

- Automated PR review with actionable feedback
- Security vulnerability detection
- Performance bottleneck identification
- Best practices enforcement

### 🧠 Advanced Reasoning

- Multi-step problem solving
- Architecture design decisions
- Algorithm complexity analysis
- System design and trade-off evaluation

### 📄 Documentation & Summarization

- Generate API documentation
- Summarize large codebases
- Create technical specifications
- Write inline comments and docstrings

### 🔮 Coming with V4

- **1M+ token context window** — analyze entire repositories at once
- **Enhanced coding benchmarks** — expected top-tier performance
- **Faster inference** — reduced latency for real-time coding
- **Improved instruction following** — better at complex multi-step tasks

---

## CLI Usage

The skill includes a standalone CLI for direct interaction:

### Basic Chat

```bash
npx deepseek-v4 --prompt "Explain the difference between TCP and UDP"
```

### Code Generation

```bash
npx deepseek-v4 --prompt "Write a Redis connection pool in Go with retry logic" \
                 --system "You are an expert Go developer. Write production-ready code."
```

### Code Review

```bash
npx deepseek-v4 --prompt "Review this code for bugs and improvements: $(cat src/main.ts)" \
                 --system "You are a senior code reviewer. Focus on bugs, security, and performance."
```

### Summarize

```bash
npx deepseek-v4 --prompt "Summarize this codebase architecture: $(find src -name '*.ts' -exec cat {} \;)" \
                 --max-tokens 2000
```

### CLI Options

| Option | Default | Description |
|--------|---------|-------------|
| `--prompt` | (required) | The prompt to send |
| `--model` | `deepseek/deepseek-v3.2` | Model identifier |
| `--temperature` | `0.7` | Sampling temperature (0-2) |
| `--max-tokens` | `4096` | Maximum response tokens |
| `--system` | (none) | System prompt for role/behavior |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ATLAS_API_KEY` | Yes | Your Atlas Cloud API key |
| `ATLAS_BASE_URL` | No | Custom API base URL (default: `https://api.atlascloud.ai/v1`) |

---

## Agent Skill Integration

### How It Works

This skill follows the **open agent skill** pattern — a standardized way to add capabilities to AI coding agents. The skill provides:

1. **`SKILL.md`** — Machine-readable skill description with trigger conditions and API details
2. **`CLAUDE.md`** — Claude Code-specific configuration
3. **`src/cli.ts`** — Standalone CLI for direct usage and agent tool-calling
4. **`package.json`** — Standard npm metadata for discoverability

### Cross-Platform Skill Resolution

When an agent encounters a task like "analyze this code with DeepSeek", the skill resolution works:

```
User Request
    ↓
Agent reads SKILL.md / CLAUDE.md
    ↓
Matches trigger: "code analysis", "DeepSeek", "review"
    ↓
Calls Atlas Cloud API (OpenAI-compatible)
    ↓
Returns DeepSeek V3.2 response
    ↓
(Seamless V4 upgrade when available)
```

### Embedding in Your Agent

```typescript
// 在任何OpenAI兼容的客户端中使用
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.ATLAS_API_KEY,
  baseURL: "https://api.atlascloud.ai/v1",
});

const response = await client.chat.completions.create({
  model: "deepseek/deepseek-v3.2",
  messages: [
    { role: "system", content: "You are a senior software engineer." },
    { role: "user", content: "Review this pull request for security issues..." },
  ],
  temperature: 0.7,
  max_tokens: 4096,
});

console.log(response.choices[0].message.content);
```

---

## API Reference

### Endpoint

```
POST https://api.atlascloud.ai/v1/chat/completions
```

### Authentication

```
Authorization: Bearer YOUR_ATLAS_API_KEY
Content-Type: application/json
```

### Request Body

```json
{
  "model": "deepseek/deepseek-v3.2",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful coding assistant."
    },
    {
      "role": "user",
      "content": "Write a binary search implementation in Rust"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 4096,
  "stream": true
}
```

### Response Format

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "deepseek/deepseek-v3.2",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Here's a binary search implementation in Rust:\n\n```rust\nfn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {\n    let mut low = 0;\n    let mut high = arr.len();\n    while low < high {\n        let mid = low + (high - low) / 2;\n        match arr[mid].cmp(target) {\n            std::cmp::Ordering::Equal => return Some(mid),\n            std::cmp::Ordering::Less => low = mid + 1,\n            std::cmp::Ordering::Greater => high = mid,\n        }\n    }\n    None\n}\n```"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

### cURL Example

```bash
curl -X POST https://api.atlascloud.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ATLAS_API_KEY" \
  -d '{
    "model": "deepseek/deepseek-v3.2",
    "messages": [{"role": "user", "content": "Write a quicksort in Python"}],
    "temperature": 0.7,
    "max_tokens": 4096
  }'
```

### Streaming Example

```bash
curl -X POST https://api.atlascloud.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ATLAS_API_KEY" \
  -d '{
    "model": "deepseek/deepseek-v3.2",
    "messages": [{"role": "user", "content": "Explain monads in Haskell"}],
    "temperature": 0.7,
    "stream": true
  }'
```

### Python Example

```python
import openai

client = openai.OpenAI(
    api_key="your-atlas-api-key",
    base_url="https://api.atlascloud.ai/v1",
)

response = client.chat.completions.create(
    model="deepseek/deepseek-v3.2",
    messages=[
        {"role": "system", "content": "You are a Python expert."},
        {"role": "user", "content": "Write an async web scraper with aiohttp"},
    ],
    temperature=0.7,
    max_tokens=4096,
)

print(response.choices[0].message.content)
```

### Node.js Example

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.ATLAS_API_KEY,
  baseURL: "https://api.atlascloud.ai/v1",
});

async function generateCode(prompt: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: "deepseek/deepseek-v3.2",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4096,
  });

  return response.choices[0].message.content ?? "";
}

const code = await generateCode("Write a REST API with Express and TypeScript");
console.log(code);
```

---

## V3.2 Current vs V4 Expected

| Feature | DeepSeek V3.2 (Current) | DeepSeek V4 (Expected) |
|---------|------------------------|----------------------|
| **Context Window** | 128K tokens | 1M+ tokens |
| **Coding (HumanEval)** | 90.2% | Expected 95%+ |
| **Reasoning (MATH)** | 90.0% | Expected 95%+ |
| **Multilingual** | 50+ languages | 100+ languages |
| **Architecture** | MoE | Enhanced MoE |
| **Latency** | Fast | Faster |
| **Price (Input)** | $0.26/M tokens | TBD |
| **Price (Output)** | $0.38/M tokens | TBD |
| **API Compatibility** | OpenAI-compatible | OpenAI-compatible |
| **Upgrade Path** | — | Automatic via this skill |

### What Happens When V4 Launches?

1. Atlas Cloud adds DeepSeek V4 to their API
2. This skill's model identifier updates to `deepseek/deepseek-v4`
3. Your existing integration keeps working — no code changes needed
4. You get V4's improvements immediately

**Zero downtime. Zero config changes. Just better results.**

---

## Pricing

### DeepSeek V3.2 (Current)

| Metric | Price |
|--------|-------|
| Input tokens | **$0.26 / million tokens** |
| Output tokens | **$0.38 / million tokens** |
| Context window | 128K tokens |
| Rate limits | None (Atlas Cloud) |

### Cost Comparison

| Model | Input ($/M) | Output ($/M) | Savings vs GPT-4 |
|-------|-------------|--------------|-------------------|
| **DeepSeek V3.2** | **$0.26** | **$0.38** | **~95% cheaper** |
| GPT-4o | $2.50 | $10.00 | — |
| Claude 3.5 Sonnet | $3.00 | $15.00 | — |
| Gemini 1.5 Pro | $3.50 | $10.50 | — |

### Example Cost Estimates

| Use Case | Tokens/Day | Daily Cost | Monthly Cost |
|----------|-----------|------------|--------------|
| Individual developer | ~100K | ~$0.03 | ~$1 |
| Small team (5 devs) | ~500K | ~$0.15 | ~$5 |
| CI/CD code review | ~1M | ~$0.32 | ~$10 |
| Enterprise (50 devs) | ~10M | ~$3.20 | ~$100 |

> 💡 **Get 25% bonus** on your first top-up at [atlascloud.ai](https://www.atlascloud.ai?ref=JPM683)

---

## Use Cases

### 1. Automated Code Review in CI/CD

```yaml
# .github/workflows/deepseek-review.yml
name: DeepSeek Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Review with DeepSeek
        run: |
          DIFF=$(git diff origin/main...HEAD)
          npx deepseek-v4 \
            --prompt "Review this PR diff for bugs, security issues, and improvements:\n$DIFF" \
            --system "You are a senior code reviewer. Be thorough but constructive." \
            --max-tokens 4096
        env:
          ATLAS_API_KEY: ${{ secrets.ATLAS_API_KEY }}
```

### 2. Code Generation Pipeline

```bash
# 生成完整的CRUD API
npx deepseek-v4 \
  --prompt "Generate a complete CRUD REST API for a blog platform with posts, comments, and users. Use Express.js, TypeScript, and Prisma ORM." \
  --system "Generate production-ready code with error handling, validation, and types." \
  --max-tokens 8192
```

### 3. Architecture Documentation

```bash
# 从代码生成架构文档
npx deepseek-v4 \
  --prompt "Analyze this codebase and generate architecture documentation: $(find src -name '*.ts' | head -20 | xargs cat)" \
  --system "You are a technical writer. Create clear, structured architecture docs." \
  --max-tokens 4096
```

### 4. Bug Investigation

```bash
# 分析错误日志
npx deepseek-v4 \
  --prompt "Investigate this error and suggest fixes: $(cat error.log | tail -50)" \
  --system "You are a debugging expert. Identify root cause and provide fix."
```

---

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ATLAS_API_KEY` | Yes | — | Atlas Cloud API key |
| `ATLAS_BASE_URL` | No | `https://api.atlascloud.ai/v1` | API base URL |
| `DEEPSEEK_MODEL` | No | `deepseek/deepseek-v3.2` | Model identifier |
| `DEEPSEEK_TEMPERATURE` | No | `0.7` | Default temperature |
| `DEEPSEEK_MAX_TOKENS` | No | `4096` | Default max tokens |

### Custom Configuration File

Create a `.deepseek-v4.json` in your project root:

```json
{
  "model": "deepseek/deepseek-v3.2",
  "temperature": 0.7,
  "maxTokens": 4096,
  "systemPrompt": "You are a senior software engineer specializing in TypeScript and React.",
  "baseUrl": "https://api.atlascloud.ai/v1"
}
```

---

## Troubleshooting

### Common Issues

<details>
<summary><b>401 Unauthorized</b></summary>

Your API key is missing or invalid.

```bash
# 检查API密钥是否设置
echo $ATLAS_API_KEY

# 重新设置
export ATLAS_API_KEY="your-key-here"
```

Get your key at [atlascloud.ai](https://www.atlascloud.ai?ref=JPM683).

</details>

<details>
<summary><b>Model not found</b></summary>

Ensure you're using the correct model identifier:

```
deepseek/deepseek-v3.2    ✅ Correct
deepseek-v3.2              ❌ Missing prefix
deepseek-v4                ❌ Not yet available
```

</details>

<details>
<summary><b>Timeout errors</b></summary>

For large prompts, increase the timeout:

```bash
# 使用较小的max-tokens值
npx deepseek-v4 --prompt "..." --max-tokens 2000
```

</details>

<details>
<summary><b>Streaming not working</b></summary>

Streaming is enabled by default. If your environment doesn't support it, the CLI falls back to non-streaming mode automatically.

</details>

---

## Contributing

Contributions are welcome! Please read our guidelines:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Development

```bash
git clone https://github.com/thoughtincode/deepseek-v4-skill.git
cd deepseek-v4-skill
npm install
npm run dev
```

---

## Trust & Reliability

| Aspect | Detail |
|--------|--------|
| **API Provider** | Atlas Cloud — enterprise-grade AI infrastructure |
| **Uptime** | 99.9% SLA |
| **Data Privacy** | No training on your data |
| **Compliance** | SOC2, GDPR compliant |
| **Support** | 24/7 technical support |
| **Rate Limits** | None — scale without limits |
| **Billing** | Pay-as-you-go, no minimums |

---

## Links

- **Atlas Cloud**: [atlascloud.ai](https://www.atlascloud.ai?ref=JPM683) — Get your API key (25% first top-up bonus)
- **DeepSeek**: [deepseek.com](https://deepseek.com) — Model documentation
- **GitHub**: [thoughtincode/deepseek-v4-skill](https://github.com/thoughtincode/deepseek-v4-skill)
- **Issues**: [Report a bug](https://github.com/thoughtincode/deepseek-v4-skill/issues)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Get Started Now

```bash
# 1. 获取API密钥
# 访问 https://www.atlascloud.ai?ref=JPM683（首充25%奖励）

# 2. 设置密钥
export ATLAS_API_KEY="your-key"

# 3. 安装技能
npx skills add thoughtincode/deepseek-v4-skill

# 4. 开始使用
npx deepseek-v4 --prompt "Write a binary search tree in Rust"
```

**DeepSeek V3.2 today. V4 tomorrow. Zero changes needed.**

[![Get API Key](https://img.shields.io/badge/Get%20API%20Key-Atlas%20Cloud-blue?style=for-the-badge)](https://www.atlascloud.ai?ref=JPM683)

---

<p align="center">
  <b>Built for developers who want the best AI coding assistant at a fraction of the cost.</b><br/>
  <a href="https://www.atlascloud.ai?ref=JPM683">Get your Atlas Cloud API key</a> ·
  <a href="https://github.com/thoughtincode/deepseek-v4-skill/issues">Report Bug</a> ·
  <a href="https://github.com/thoughtincode/deepseek-v4-skill/issues">Request Feature</a>
</p>
