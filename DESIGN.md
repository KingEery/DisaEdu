# DisaEdu Design System

DisaEdu is a learning-first product, not a generic admin or SaaS dashboard. The visual direction is calm, warm, friendly, accessible, human, modern, spacious, editorial, and lightly experimental.

## Core Rule

Before changing frontend UI, ask: does this feel like a learning experience or an admin dashboard?

Priority order:

1. Learning content
2. Primary action
3. AI assistance
4. Learning journey
5. Progress
6. Secondary information
7. Analytics

Do not default to sidebar, statistic cards, charts, tables, and dense grids. DisaEdu should feel like a guided learning space.

## Visual Direction

Use pi.dev only as inspiration for strong typography, editorial layout, confident whitespace, minimal UI chrome, large product visuals, and distinct sections. Do not copy its branding, color, layout, components, or copy.

DisaEdu identity comes from learning, accessibility, warmth, and AI companion behavior.

## Color Tokens

Primary: `#A3D3E1`
Primary hover: `#8FC5D5`
Primary light: `#E8F5F8`
Primary dark: `#6FAFBE`

Neutrals:

- Background: `#F8FAFB`
- Surface: `#FFFFFF`
- Surface secondary: `#F1F6F7`
- Text primary: `#26363B`
- Text secondary: `#66777C`
- Text muted: `#94A3A8`
- Border: `#DCE8EB`
- Disabled: `#C7D4D8`

Supporting:

- Success: `#7BC9A5`, light `#EAF8F1`
- Warning: `#F4D27A`, light `#FFF8E5`
- Accent: `#F3A69B`, light `#FFF0EE`
- AI: `#6FAFBE`, light `#E8F5F8`, border `#C5E3EA`

Use roughly 60% neutral, 30% primary blue shades, and 10% supporting colors. Do not make every card colored.

## Layout

Use editorial layouts, strong hierarchy, generous whitespace, subtle surfaces, and product storytelling. Avoid card nesting and overusing shadows. Learning content should dominate lesson and landing visuals.

## Product Patterns

Prefer product-specific components such as LearningCard, CourseCard, LessonStep, Activity, QuizOption, ProgressJourney, AIHelper, SimulationScene, VoiceButton, Recommendation, EmptyState, and LoadingState.

DisaAI is not a full-screen generic chatbot by default. It should sit inside the learning context with quick actions such as "Jelaskan lebih sederhana", "Beri contoh", and "Aku belum mengerti".

DisaTalk should feel like an interactive scene with one main prompt at a time, not a long chat history.

Progress should feel like a journey, not an evaluation dashboard.
