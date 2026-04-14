# Spiritual AI 🌟

A full-stack RAG (Retrieval-Augmented Generation) application that provides spiritual guidance from sacred texts including the Bhagavad Gita, Quran, and Bible.

## ✨ Features

- **Multi-Religious Support**: Ask questions about Gita, Quran, and Bible
- **AI-Powered Answers**: Uses advanced language models for contextual responses
- **Source Citations**: Every answer includes relevant scripture references
- **Beautiful UI**: Modern, spiritual-themed interface

## 🚀 Quick Deploy

### 1. Backend (Railway) - FREE
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/hiuchitrajani-pixel/Spiritual-AI&envs=OPENROUTER_API_KEY&OPENROUTER_API_KEYDesc=Your%20OpenRouter%20API%20key&referralCode=spiritual-ai)

### 2. Frontend (Vercel) - FREE
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hiuchitrajani-pixel/Spiritual-AI&env=NEXT_PUBLIC_API_URL&envDescription=Your%20deployed%20backend%20URL&envLink=https://railway.app&project-name=spiritual-ai&repository-name=Spiritual-AI)

## 🛠️ Local Development

### Prerequisites
- Python 3.8+
- Node.js 18+
- OpenRouter API key ([get one here](https://openrouter.ai/))

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hiuchitrajani-pixel/Spiritual-AI.git
   cd Spiritual-AI
   ```

2. **Backend Setup:**
   ```bash
   cd BACKEND
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your OpenRouter API key
   python run.py
   ```

3. **Frontend Setup:**
   ```bash
   cd ../FRONTEND
   npm install
   cp .env.example .env.local
   # Edit .env.local with backend URL
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📁 Project Structure

```
Spiritual-AI/
├── BACKEND/              # FastAPI server
│   ├── app/             # Application code
│   ├── data/            # Sacred texts & vector stores
│   └── scripts/         # Data ingestion scripts
├── FRONTEND/            # Next.js application
│   ├── app/            # Next.js app router
│   └── components/     # React components
└── DEPLOYMENT.md       # Detailed deployment guide
```

## 🔧 Environment Variables

### Backend
```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL_NAME=openai/gpt-oss-20b:free
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
TOP_K=5
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Sacred texts from various religious traditions
- OpenRouter for AI model access
- Sentence Transformers for embeddings
- FAISS for vector search