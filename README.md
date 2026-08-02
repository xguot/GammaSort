# GammaSort (γ-Sort)

[![Deploy to GitHub Pages](https://github.com/xguot/GammaSort/actions/workflows/deploy.yml/badge.svg)](https://github.com/xguot/GammaSort/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Astro](https://img.shields.io/badge/Framework-Astro-ff5d01.svg)](https://astro.build/)
[![Styling: TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8.svg)](https://tailwindcss.com/)

**GammaSort** is an interactive, open-access academic topic modeling explorer designed for statistical and bibliometric analysis of scientific research literature. It facilitates cross-national and comparative literature exploration across US and Chinese psychology and behavioral research corpora by visualizing document-topic probability distributions ($\gamma$).

🌐 **Live Explorer**: [https://xguot.github.io/GammaSort/](https://xguot.github.io/GammaSort/)

---

## 📑 Table of Contents

- [Overview & Motivation](#overview--motivation)
- [Methodology & The Gamma ($\gamma$) Score](#methodology--the-gamma--score)
- [Corpora Breakdown](#corpora-breakdown)
- [Key Features](#key-features)
- [Academic Fair Use & Copyright Statement](#academic-fair-use--copyright-statement)
- [Technology Stack](#technology-stack)
- [Local Development](#local-development)
- [Deployment via GitHub Actions](#deployment-via-github-actions)
- [Citation](#citation)
- [License](#license)

---

## Overview & Motivation

Topic modeling with **Latent Dirichlet Allocation (LDA)** provides an unsupervised probabilistic framework to uncover thematic clusters across thousands of academic publications. However, navigating and comparing high-dimensional topic assignments across different cultural and geographical research ecosystems (e.g., United States vs. China) is often hindered by static tables and dense matrix outputs.

**GammaSort** solves this by providing a clean, searchable, responsive visual dashboard where documents within each latent topic are systematically ranked by their topic probability weight ($\gamma$), allowing researchers to instantly examine representative literature, compare topic representations, and trace chronological shifts.

---

## Methodology & The Gamma ($\gamma$) Score

In Bayesian topic modeling (LDA), each document $d$ is modeled as a finite mixture over an underlying set of topics $K$:

$$\gamma_{d, k} = P(\text{Topic } k \mid \text{Document } d)$$

- **Document-Topic Distribution ($\gamma \in [0, 1]$)**: Represents the estimated posterior probability that document $d$ belongs to or discusses topic $k$.
- **Sorting Criterion**: Within each discovered topic, articles are sorted strictly in descending order of $\gamma$. Papers near the top ($\gamma \approx 1.0$) represent the prototypical core of that academic theme.
- **Visual Relevance Indicators**: Each article card features an interactive visual progress bar representing its exact $\gamma$ affinity.

---

## Corpora Breakdown

The dataset is partitioned into three distinct comparative categories:

1. **Only US Topics**: Thematic topics unique to or predominantly represented in the United States academic corpus.
2. **Only China Topics**: Thematic topics unique to or predominantly represented in the Chinese academic corpus.
3. **Both US & China Topics**: Cross-national convergent topics present in both research ecosystems.

---

## Key Features

- **⚡ Fast Live Search**: Instant multi-attribute search across topic labels, paper titles, publication years, countries, and abstract contents with keyboard shortcuts (`/` or `⌘K`, `Esc`).
- **🎯 Multi-Dimensional Quick Filters**: 1-click filtering by relevance threshold ($\gamma \ge 0.9$) or publication timeframe (`Recent 2020+`, `2015–2019`, `Pre-2015`).
- **📊 Visual $\gamma$ Progress Bars**: Intuitive micro-bar visualizations for rapid scanning of topic affinity.
- **📋 One-Click Bibliography & Citation Export**: Export whole-topic reading lists formatted in Markdown / bibliography style with single-click clipboard copy.
- **🔍 Direct Google Scholar Integration**: 1-click deep links to retrieve full papers, citations, and metrics on Google Scholar.
- **📱 Responsive & Accessible**: Full WCAG keyboard navigation, screen-reader support, collapsible accordions, and dark/light contrast compliance.

---

## Academic Fair Use & Copyright Statement

### Fair Use Notice (17 U.S.C. § 107)

This project and website are developed and maintained strictly for **non-commercial, non-profit academic research, computational text analysis, bibliometric exploration, and educational commentary**.

1. **Ownership**: All indexed publication metadata, titles, journal references, and abstracts remain the copyrighted intellectual property of their respective original authors and academic publishers, including the **American Psychological Association (APA)** and associated scholarly journals.
2. **Fair Use Purpose**: The reproduction of brief abstracts and metadata is transformative in nature, creating a computational topic modeling interface and bibliometric exploration system that does not serve as a market substitute for the original peer-reviewed articles.
3. **Full-Text Access**: This platform **does not host, distribute, or reproduce full-text articles**. Direct outbound links (via Google Scholar) are provided to direct researchers to legitimate publication venues, publisher platforms, and official repository copies.
4. **Takedown Requests**: If you are a copyright holder or publisher and have concerns regarding the inclusion of any metadata or abstract snippet, please open a GitHub issue or contact the repository maintainer for prompt review or removal.

---

## Technology Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation / Zero JS baseline)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Pipeline**: Custom Node.js streaming parser (`scripts/parse-csv.mjs`) transforming CSV corpora into structured, pre-indexed JSON
- **CI/CD**: GitHub Actions deploying automatically to GitHub Pages

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` (v9.0 or higher)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/xguot/GammaSort.git
   cd GammaSort
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Parse raw corpora data**:
   ```bash
   npm run data
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321/GammaSort](http://localhost:4321/GammaSort) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## Deployment via GitHub Actions

This repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

To deploy to GitHub Pages:
1. Push your code to the `main` branch.
2. In your GitHub repository, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. The deployment will run automatically and publish the site to `https://<username>.github.io/GammaSort/`.

---

## Citation

If you utilize GammaSort, its dataset structure, or its comparative topic modeling methodology in your academic work, please cite:

```bibtex
@misc{guo2026gammasort,
  author = {Guo, Xiyuan},
  title = {GammaSort: Interactive Topic Modeling Explorer for US and Chinese Academic Literature},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/xguot/GammaSort}}
}
```

---

## License

- **Software & Source Code**: Released under the [MIT License](LICENSE).
- **Academic Content & Abstracts**: Subject to original publisher copyright (e.g., APA) under Fair Use (17 U.S.C. § 107).
