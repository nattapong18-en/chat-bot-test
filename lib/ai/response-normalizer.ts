type ChatLanguage = "th" | "en";

type ChatRequestMessage = {
  role: "user" | "assistant";
  content: string;
};

type NormalizeAssistantResponseOptions = {
  language: ChatLanguage;
  messages: ChatRequestMessage[];
};

type NumberedRecommendation = {
  lineIndex: number;
  content: string;
  productKey: string;
};

const NUMBERED_RECOMMENDATION = /^(\d+)\.\s+(.+)$/u;
const INCOMPLETE_ENDING =
  /(?:\b(?:and|or|because|for)\b|(?:และ|หรือ|เพราะ|ที่|สำหรับ))\s*$/iu;
const INCOMPLETE_PUNCTUATION = /(?:—|:|\(|\*\*)\s*$/u;

export function normalizeAssistantResponse(
  response: string,
  options: NormalizeAssistantResponseOptions,
): string {
  const original = response.trim();
  if (!original) return fallbackResponse(options.language);

  const lines = original.split(/\r?\n/u);
  const recommendations = findNumberedRecommendations(lines);

  if (recommendations.length === 0) {
    return ensureCompleteResponse(original, options.language);
  }

  const requestedCount = requestedRecommendationCount(options.messages);
  const completeRecommendations =
    uniqueCompleteRecommendations(recommendations);
  const responseNeedsReduction =
    recommendations.length !== completeRecommendations.length ||
    completeRecommendations.length > requestedCount ||
    !isCompleteText(original);

  if (!responseNeedsReduction) {
    return original;
  }

  const normalizedLines: string[] = [];
  const firstRecommendation = recommendations[0];
  const introductorySentence = firstCompleteSentence(
    linesBefore(lines, firstRecommendation.lineIndex).join(" "),
  );

  if (introductorySentence) {
    normalizedLines.push(introductorySentence);
  }

  let keptCount = 0;
  for (const recommendation of completeRecommendations) {
    if (keptCount >= requestedCount) break;

    normalizedLines.push(
      `${keptCount + 1}. ${oneCompleteSentence(recommendation.content)}`,
    );
    keptCount += 1;
  }

  const lastRecommendation = recommendations[recommendations.length - 1];
  const followUps = completeFollowUps(
    linesAfter(lines, lastRecommendation.lineIndex),
  );
  for (const followUp of followUps) {
    normalizedLines.push(followUp);
  }

  const normalized = normalizedLines.join("\n\n");
  return normalized
    ? ensureCompleteResponse(normalized, options.language)
    : ensureCompleteResponse(original, options.language);
}

export function splitNormalizedResponse(text: string): string[] {
  const lineChunks = text.match(/.*(?:\n|$)/gu) ?? [];
  const chunks: string[] = [];

  for (const lineChunk of lineChunks) {
    if (!lineChunk) continue;

    const line = lineChunk.trim();
    if (!line) {
      if (chunks.length > 0) {
        chunks[chunks.length - 1] += "\n";
      }
      continue;
    }

    const sentences = completeSentences(line);
    if (sentences.length > 1) {
      for (const sentence of sentences) {
        chunks.push(`${sentence}\n`);
      }
    } else {
      chunks.push(`${line}\n`);
    }
  }

  if (chunks.length === 0) return [text];

  chunks[chunks.length - 1] = chunks[chunks.length - 1].trimEnd();
  return chunks;
}

function findNumberedRecommendations(
  lines: string[],
): NumberedRecommendation[] {
  const recommendations: NumberedRecommendation[] = [];

  for (const [lineIndex, line] of lines.entries()) {
    const match = line.trim().match(NUMBERED_RECOMMENDATION);
    if (!match) continue;

    const content = match[2].trim();
    recommendations.push({
      lineIndex,
      content,
      productKey: productKey(content),
    });
  }

  return recommendations;
}

function uniqueCompleteRecommendations(
  recommendations: NumberedRecommendation[],
): NumberedRecommendation[] {
  const uniqueRecommendations: NumberedRecommendation[] = [];
  const knownProducts = new Set<string>();

  for (const recommendation of recommendations) {
    if (!isCompleteText(recommendation.content)) continue;
    if (knownProducts.has(recommendation.productKey)) continue;

    knownProducts.add(recommendation.productKey);
    uniqueRecommendations.push(recommendation);
  }

  return uniqueRecommendations;
}

function productKey(content: string): string {
  const boldName = content.match(/^\*\*([^*]+)\*\*/u)?.[1];
  return (boldName ?? content).trim().toLocaleLowerCase();
}

function requestedRecommendationCount(messages: ChatRequestMessage[]): number {
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user")?.content;

  if (!latestUserMessage) return 3;

  const explicitlyRequestsFive =
    /\b(?:five)\s+(?:products?|models?|options?|recommendations?)\b/iu.test(
      latestUserMessage,
    ) || /(?:5|ห้า)/u.test(latestUserMessage);

  return explicitlyRequestsFive ? 5 : 3;
}

function completeFollowUps(lines: string[]): string[] {
  const followUps: string[] = [];

  for (const line of lines) {
    const followUp = firstCompleteSentence(line.trim());
    if (!followUp || followUps.length >= 2) continue;

    followUps.push(followUp);
  }

  return followUps;
}

function linesBefore(lines: string[], index: number): string[] {
  const result: string[] = [];

  for (const [lineIndex, line] of lines.entries()) {
    if (lineIndex >= index) break;
    result.push(line);
  }

  return result;
}

function linesAfter(lines: string[], index: number): string[] {
  const result: string[] = [];

  for (const [lineIndex, line] of lines.entries()) {
    if (lineIndex > index) result.push(line);
  }

  return result;
}

function oneCompleteSentence(text: string): string {
  return firstCompleteSentence(text) ?? text.trim();
}

function ensureCompleteResponse(text: string, language: ChatLanguage): string {
  if (isCompleteText(text)) return text;

  const completeBoundary = lastCompleteBoundary(text);
  return completeBoundary || fallbackResponse(language);
}

function lastCompleteBoundary(text: string): string {
  const completeLines: string[] = [];

  for (const line of text.split(/\r?\n/u)) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    if (!isCompleteText(trimmedLine)) break;

    completeLines.push(trimmedLine);
  }

  if (completeLines.length > 0) return completeLines.join("\n\n");

  return firstCompleteSentence(text) ?? "";
}

function firstCompleteSentence(text: string): string | undefined {
  const sentences = completeSentences(text.trim());
  if (sentences.length > 0) return sentences[0];

  return isCompleteText(text) ? text.trim() : undefined;
}

function completeSentences(text: string): string[] {
  const matches = text.match(/.+?[.!?…]+(?=\s|$)/gu) ?? [];
  const sentences: string[] = [];

  for (const match of matches) {
    const sentence = match.trim();
    if (sentence && isCompleteText(sentence)) {
      sentences.push(sentence);
    }
  }

  return sentences;
}

function isCompleteText(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (INCOMPLETE_ENDING.test(trimmed) || INCOMPLETE_PUNCTUATION.test(trimmed)) {
    return false;
  }
  if (/^\d+\.\s*$/u.test(trimmed)) return false;

  return boldMarkerCount(trimmed) % 2 === 0;
}

function boldMarkerCount(text: string): number {
  return text.match(/\*\*/gu)?.length ?? 0;
}

function fallbackResponse(language: ChatLanguage): string {
  return language === "th"
    ? "ขออภัย ระบบได้รับคำตอบไม่ครบถ้วน กรุณาลองอีกครั้งครับ"
    : "The response was incomplete. Please try again.";
}
