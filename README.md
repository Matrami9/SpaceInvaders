
# 🛸 Space Invaders — DevOps Project

> Une implémentation moderne du classique **Space Invaders**, développée en TypeScript avec un pipeline DevSecOps complet.

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Nginx%20Alpine-2496ED?style=flat-square&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-Mocha%20%26%20Chai-8D6748?style=flat-square&logo=mocha&logoColor=white)
![Linter](https://img.shields.io/badge/Linter-ESLint%20Google-4B32C3?style=flat-square&logo=eslint&logoColor=white)

---

## 🚀 Démonstration

L'application est déployée automatiquement via GitHub Actions à chaque push sur la branche principale.

👉 **[Jouer au jeu ici](https://konradlinkowski.github.io/SpaceInvaders/)**

---

## 🛠️ Stack Technique

| Catégorie         | Technologie                     |
|-------------------|---------------------------------|
| Langage           | TypeScript                      |
| Bundler           | Parcel v1                       |
| Tests             | Mocha & Chai                    |
| Linter            | ESLint (Google Style Guide)     |
| CI/CD             | GitHub Actions                  |
| Conteneurisation  | Docker (Nginx Alpine)           |

---

## 🏗️ Pipeline CI/CD

Le workflow est divisé en **deux jobs principaux** pour garantir la stabilité du code.

### 1. 🔍 Quality & Tests

- **Linter** (Google Style Guide) — vérifie la cohérence et la qualité du code
- **Audit de sécurité NPM** — détecte les vulnérabilités dans les dépendances
- **Tests unitaires & fonctionnels** — valide le comportement de l'application

### 2. 🚢 Deploy

- **Build** de l'application via Parcel
- **Conteneurisation** — création d'une image Docker (Nginx Alpine)
- **Déploiement automatique** sur GitHub Pages

---

## 🐳 Docker

Un `Dockerfile` est fourni pour garantir que l'application fonctionne dans n'importe quel environnement.

### Build de l'image

```bash
docker build -t space-invaders:latest .
```

### Lancement du conteneur

```bash
docker run -d -p 8080:80 --name space-invaders space-invaders:latest
```

L'application sera alors accessible sur **`http://localhost:8080`**.

---

## 🧪 Tests

Pour lancer les tests localement :

```bash
npm test
```

---

## 💡 Points clés DevSecOps

- **Badge CI** — prouve en temps réel que le code est propre et les tests passent
- **Nginx Alpine** — image Docker ultra-légère pour des raisons de sécurité et de performance
- **`npm audit`** — pratique *Shift Left* : les failles sont détectées avant la mise en production, pas après

---

## 📁 Structure du projet

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline CI/CD
├── src/                    # Code source TypeScript
├── tests/                  # Tests unitaires & fonctionnels
├── Dockerfile              # Image Docker Nginx Alpine
├── package.json
└── README.md
```