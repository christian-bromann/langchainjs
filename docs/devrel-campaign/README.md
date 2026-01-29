# DeepAgentsJS DevRel Campaign
## 2-Week Content Strategy (January 29 - February 12, 2026)

This directory contains all content pieces for the DeepAgentsJS awareness campaign.

---

## Quick Stats

| Metric | Current | Target |
|--------|---------|--------|
| GitHub Stars | 596 | 1,000+ |
| Competitor (Claude SDK) | 4,396 | - |
| Campaign Duration | 2 weeks | - |
| Total Content Pieces | 14 tweets + 4 blog posts + 1 video | - |

---

## Directory Structure

```
devrel-campaign/
├── README.md                    # This file
├── tweets/
│   ├── week1/
│   │   ├── 01-launch-thread-jan29.md
│   │   ├── 02-code-snippet-jan30.md
│   │   ├── 03-comparison-thread-jan31.md
│   │   ├── 04-planning-tool-feb1.md
│   │   ├── 05-demo-video-feb2.md
│   │   ├── 06-model-agnostic-feb3.md
│   │   └── 07-subagent-feb4.md
│   └── week2/
│       ├── 08-middleware-feb5.md
│       ├── 09-openai-comparison-feb6.md
│       ├── 10-use-cases-feb7.md
│       ├── 11-prompting-patterns-feb8.md
│       ├── 12-hitl-feb10.md
│       ├── 13-sandbox-feb11.md
│       └── 14-learning-path-feb12.md
├── blog-posts/
│   ├── 01-from-shallow-to-deep.md      # Tutorial (Jan 30)
│   ├── 02-context-engineering.md       # Technical (Feb 3)
│   ├── 03-backends-deep-dive.md        # Technical (Feb 6)
│   └── 04-hitl-patterns.md             # Enterprise (Feb 10)
└── code-images/
    └── README.md                        # All code snippets for images
```

---

## Content Calendar

### Week 1: Foundation & Awareness (Jan 29 - Feb 4)

| Date | Content | File | Platform |
|------|---------|------|----------|
| Jan 29 | Launch Thread: 4 Pillars of Deep Agents | `tweets/week1/01-launch-thread-jan29.md` | Twitter, LinkedIn |
| Jan 30 | Code Snippet: 30-line Research Agent | `tweets/week1/02-code-snippet-jan30.md` | Twitter |
| Jan 30 | Blog: From Shallow to Deep Tutorial | `blog-posts/01-from-shallow-to-deep.md` | Dev.to, LangChain Blog |
| Jan 31 | Comparison: DeepAgentsJS vs Claude SDK | `tweets/week1/03-comparison-thread-jan31.md` | Twitter |
| Feb 1 | Feature: Planning Tool (write_todos) | `tweets/week1/04-planning-tool-feb1.md` | Twitter |
| Feb 2 | Demo Video: Agent in Action | `tweets/week1/05-demo-video-feb2.md` | Twitter (video) |
| Feb 3 | Thread: Model Agnostic Agents | `tweets/week1/06-model-agnostic-feb3.md` | Twitter |
| Feb 3 | Blog: Context Engineering | `blog-posts/02-context-engineering.md` | LangChain Blog |
| Feb 4 | Thread: Subagent Architecture | `tweets/week1/07-subagent-feb4.md` | Twitter |

### Week 2: Deep Dives & Community (Feb 5 - Feb 12)

| Date | Content | File | Platform |
|------|---------|------|----------|
| Feb 5 | Thread: Middleware Pattern | `tweets/week2/08-middleware-feb5.md` | Twitter |
| Feb 5 | YouTube Tutorial: Production Research Agent | (video script in tweet file) | YouTube |
| Feb 6 | Comparison: OpenAI SDK vs DeepAgentsJS | `tweets/week2/09-openai-comparison-feb6.md` | Twitter |
| Feb 6 | Blog: Understanding Backends | `blog-posts/03-backends-deep-dive.md` | LangChain Blog |
| Feb 7 | Thread: 5 Real-World Use Cases | `tweets/week2/10-use-cases-feb7.md` | Twitter |
| Feb 8 | Thread: 7 Prompting Patterns | `tweets/week2/11-prompting-patterns-feb8.md` | Twitter |
| Feb 10 | Thread: Human-in-the-Loop | `tweets/week2/12-hitl-feb10.md` | Twitter |
| Feb 10 | Blog: HITL Patterns | `blog-posts/04-hitl-patterns.md` | LangChain Blog |
| Feb 11 | Thread: Sandbox Execution | `tweets/week2/13-sandbox-feb11.md` | Twitter |
| Feb 12 | Thread: Learning Path (Wrap-up) | `tweets/week2/14-learning-path-feb12.md` | Twitter |

---

## Key Messages

Every piece of content should reinforce these themes:

1. **"Deep agents, not shallow ones"** - The 4 pillars make the difference
2. **"Model-agnostic for production"** - No vendor lock-in
3. **"Built on LangGraph"** - Enterprise-tested foundation
4. **"TypeScript-first"** - First-class DX for JS developers
5. **"The patterns behind Claude Code"** - Validated architecture

---

## Competitive Positioning

### DeepAgentsJS vs Claude Agent SDK
- **Use DeepAgentsJS when**: You need model flexibility, TypeScript, or deep customization
- **Use Claude SDK when**: You want Claude Code's exact behavior quickly

### DeepAgentsJS vs OpenAI Agents SDK
- **Use DeepAgentsJS when**: You need planning tools, filesystem, context engineering
- **Use OpenAI SDK when**: You need lightweight handoff-based orchestration

### Common Objections

| Objection | Response |
|-----------|----------|
| "Why not just use Claude?" | Model flexibility, customization, LangGraph ecosystem |
| "Is it production ready?" | Built on LangGraph (enterprise-proven) |
| "Why TypeScript?" | JS ecosystem dominance, type safety, better DX |

---

## Tweet Optimization Guidelines

All tweets have been optimized for:

1. **280 characters maximum** - Each tweet uses the full character limit
2. **AI developer appeal** - Technical depth, real code, practical insights
3. **Code as images** - Complex code attached as images to save characters
4. **Clear CTAs** - Links to repo, docs, or continued threads

### Image Requirements

See `code-images/README.md` for all code snippets that need to be converted to images.

**Recommended tools**:
- [Carbon](https://carbon.now.sh) - Quick and beautiful
- [Ray.so](https://ray.so) - Modern look
- [Snappify](https://snappify.com) - More control

**Settings**:
- Dark theme (One Dark Pro, GitHub Dark, or Dracula)
- JetBrains Mono or Fira Code font
- 1200x675px or 1200x800px dimensions

---

## Success Metrics

### Awareness Metrics
| Metric | Current | Week 1 Target | Week 2 Target |
|--------|---------|---------------|---------------|
| GitHub Stars | 596 | 750 | 1,000 |
| npm Weekly Downloads | TBD | +50% | +100% |
| Twitter Impressions | - | 50K | 100K |

### Engagement Metrics
- Thread engagement rate > 3%
- Blog average time on page > 3 min
- GitHub issues/discussions (organic interest indicator)

### Conversion Metrics
- npm installs tracked
- GitHub clones/forks
- Community projects built

---

## Production Checklist

### For Each Tweet
- [ ] Draft reviewed for 280 char limit
- [ ] Code image created (if needed)
- [ ] Alt text written for accessibility
- [ ] Scheduled at optimal time (9am PT weekdays)
- [ ] Reply with links prepared
- [ ] LinkedIn adaptation created (for major threads)

### For Each Blog Post
- [ ] Full draft completed
- [ ] Code examples tested
- [ ] Screenshots/diagrams created
- [ ] SEO optimized (title, meta, headers)
- [ ] Cross-promotion tweets drafted

### For Video Content
- [ ] Script finalized
- [ ] Screen recording completed
- [ ] Captions added
- [ ] Thumbnail created
- [ ] Description with links written

---

## Team Notes

- Original campaign plan: `../devrel-campaign-deepagentsjs.md`
- All content is ready to publish with minimal editing
- Code images need to be generated before publishing
- Consider A/B testing different tweet times

---

*Campaign prepared: January 29, 2026*
