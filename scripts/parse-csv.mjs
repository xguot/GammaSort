import { parse } from "csv-parse/sync";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function readCsv(filename) {
  const raw = readFileSync(resolve(root, filename), "utf-8");
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });
}

function normalizeChinaRecord(row) {
  return {
    topic: row.topic,
    gamma: parseFloat(row.gamma),
    year: row.docCNYear,
    topicLabel: row.TopicLabel,
    title: row.Title,
    abstract: (row["Abstract...Key.Words"] || row.Abstract || "").trim(),
  };
}

function normalizeUSRecord(row) {
  return {
    topic: row.topic,
    gamma: parseFloat(row.gamma),
    year: row.docUSYear,
    topicLabel: row.TopicLabel,
    title: row.Title,
    abstract: (row.Abstract || "").trim(),
  };
}

function normalizeCombinedRecord(row) {
  return {
    topic: row.topic,
    gamma: parseFloat(row.gamma),
    year: row.Year,
    topicLabel: row.TopicLabel,
    title: row.Title,
    abstract: (row.Abstract || "").trim(),
    country: row.Country,
  };
}

function groupByTopic(records) {
  const map = new Map();
  for (const r of records) {
    const key = r.topicLabel;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(r);
  }
  // Sort articles within each topic by gamma descending
  for (const articles of map.values()) {
    articles.sort((a, b) => b.gamma - a.gamma);
  }
  // Sort topics alphabetically by label
  return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function topicMapToArray(topicMap) {
  return [...topicMap.entries()].map(([label, articles]) => ({
    topicLabel: label,
    articleCount: articles.length,
    articles,
  }));
}

// --- Main ---
const chinaRaw = readCsv("chinesecorpus.csv");
const usRaw = readCsv("uscorpus.csv");
const combinedRaw = readCsv("combinedcorpus.csv");

const chinaRecords = chinaRaw.map(normalizeChinaRecord);
const usRecords = usRaw.map(normalizeUSRecord);
const combinedRecords = combinedRaw.map(normalizeCombinedRecord);

const output = {
  categories: [
    {
      id: "only-us",
      label: "Only US",
      topics: topicMapToArray(groupByTopic(usRecords)),
    },
    {
      id: "only-china",
      label: "Only China",
      topics: topicMapToArray(groupByTopic(chinaRecords)),
    },
    {
      id: "both",
      label: "Both US & China",
      topics: topicMapToArray(groupByTopic(combinedRecords)),
    },
  ],
  meta: {
    generatedAt: new Date().toISOString(),
    sourceFiles: ["chinesecorpus.csv", "uscorpus.csv", "combinedcorpus.csv"],
    totalTopics:
      topicMapToArray(groupByTopic(usRecords)).length +
      topicMapToArray(groupByTopic(chinaRecords)).length +
      topicMapToArray(groupByTopic(combinedRecords)).length,
  },
};

const outDir = resolve(root, "src", "data");
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(resolve(outDir, "data.json"), JSON.stringify(output, null, 2), "utf-8");
console.log(
  `Generated data.json — ${output.meta.totalTopics} topics across 3 categories`
);
